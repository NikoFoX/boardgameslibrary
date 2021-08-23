import json
import os
from pathlib import Path
from unittest.mock import patch, Mock

from django.http import HttpResponse
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from common.factories import UserFactory, OriginalGameFactory, GameFactory
from games.models import OriginalGame, Game


class MockedResponse(object):
    def __init__(self, content, status_code):
        self.content = content
        self.status_code = status_code


class GameTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        this_dir = Path(__file__).parent
        with open(os.path.join(this_dir, f'test_data/bgg_response_terraforming_mars.xml'), 'r',
                  encoding="utf-8") as xml_file:
            self.xml_data = xml_file.read()

    def test_create_new_game_new_original_game(self, mock_get):
        """
        Tests creating new game for user when game of same external ID doesn't exist in db (OriginalGame).
        Creates OriginalGame from received bgg data and Game for user.
        """
        mock_get.return_value = HttpResponse(status=200, content=self.xml_data)

        new_game_data = {
            'title': 'Terraforming Mars',
            'external_id': '167791'
        }

        self.assertEqual(0, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

        response = self.client.post(reverse('api_games:games-list'), data=json.dumps(new_game_data),
                                    content_type='application/json')
        self.assertEqual(201, response.status_code)
        # Request for game data to bgg was made
        mock_get.assert_called_once()

        self.assertEqual(1, OriginalGame.objects.count())
        original_game = OriginalGame.objects.first()
        self.assertEqual(1, Game.objects.count())
        user_game = Game.objects.first()
        self.assertEqual(original_game, user_game.game)
        self.assertEqual('Terraforming Mars', user_game.title)
        self.assertEqual('167791', user_game.external_id)
        self.assertEqual(self.user, user_game.user)

        self.assertEqual('https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__thumb/img/BTxqxgYay5tHJfVoJ2NF5g43_gA=/fit-in/200x150/filters:strip_icc()/pic3536616.jpg',
                         original_game.thumbnail)
        self.assertEqual('https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__original/img/thIqWDnH9utKuoKVEUqveDixprI=/0x0/filters:format(jpeg)/pic3536616.jpg',
                         original_game.image)

    @patch('games.models.requests.get')
    def test_create_new_game_existing_original_game(self, mock_get):
        """
        Tests creating new game for user when game of same external ID already exist in db (OriginalGame).
        Creates only Game for user with existing OriginalGame.
        """
        original_game = OriginalGameFactory(title="Terraforming Mars", external_id=167791)

        new_game_data = {
            'title': 'Terraforming Mars',
            'external_id': '167791'
        }

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

        response = self.client.post(reverse('api_games:games-list'), data=json.dumps(new_game_data),
                                    content_type='application/json')
        self.assertEqual(201, response.status_code)
        # Did not request for game data from bgg
        mock_get.assert_not_called()

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(1, Game.objects.count())
        user_game = Game.objects.first()
        self.assertEqual(original_game, user_game.game)
        self.assertEqual('Terraforming Mars', user_game.title)
        self.assertEqual('167791', user_game.external_id)
        self.assertEqual(self.user, user_game.user)

    def test_remove_game(self):
        """
        Tests removing game from user.
        OriginalGame will not be removed.
        """
        self.game = OriginalGameFactory(title="Terraforming Mars")
        self.user_game = GameFactory(original_game=self.game, user=self.user)

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(1, Game.objects.count())

        response = self.client.delete(reverse('api_games:games-detail', kwargs={'pk': self.user_game.id}))
        self.assertEqual(204, response.status_code)

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())
        self.assertEqual(0, self.user.games.count())

    def test_find_game(self):
        """
        Tests returning games list found by given title
        """

        this_dir = Path(__file__).parent
        with open(os.path.join(this_dir, f'test_data/bgg_response_search_boardgame_terraform.xml'), 'r',
                  encoding="utf-8") as xml_file:
            search_terraform_response_content = xml_file.read()

        search_terraform_response = MockedResponse(
            content=search_terraform_response_content,
            status_code=status.HTTP_200_OK
        )

        with patch("games.utils.requests.get", Mock(return_value=search_terraform_response)):
            response = self.client.get(reverse("api_games:games-find-game") + "?title={'Terraform'}")

        self.assertEqual(status.HTTP_200_OK, response.status_code)

        games_list = response.data

        self.assertEqual(29, len(games_list))
