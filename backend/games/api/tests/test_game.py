import json
import os
from pathlib import Path
from unittest.mock import patch, Mock

import responses
from django.conf import settings
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from common.factories import UserFactory, OriginalGameFactory, GameFactory
from common.utils import get_data_from_file
from games.models import OriginalGame, Game


class GameTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory(username="test_user")
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        this_dir = Path(__file__).parent
        with open(os.path.join(this_dir, f'test_data/bgg_response_terraforming_mars.xml'), 'r',
                  encoding="utf-8") as xml_file:
            self.get_game_terraforming_mars_content = xml_file.read()

    def test_create_new_game_no_external_id(self):
        """
        Tests if creating new game without external_id passed fails.
        """
        self.assertEqual(0, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

        response = self.client.post(reverse('api_games:games-list'),
                                    content_type='application/json')

        self.assertEqual(400, response.status_code)

        self.assertEqual(0, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

    def test_create_new_game(self):
        original_game = OriginalGameFactory()

        new_game_data = {
            'original_game': original_game.id,
            'user': self.user.id,
        }

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

        response = self.client.post(reverse('api_games:games-list'), data=json.dumps(new_game_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(1, Game.objects.count())

        user_game = Game.objects.get(id=response.json()["id"])
        self.assertEqual(user_game.original_game, original_game)
        self.assertEqual(user_game.user, self.user)

        game_json = response.json()

        self.assertEqual(
            game_json,
            {
                "id": user_game.id,
                "original_game": original_game.id,
                "user": self.user.id,
                "title": user_game.title,
                "image": user_game.image,
                "thumbnail": user_game.thumbnail,
            }
        )

    def test_remove_game(self):
        """
        Tests removing game from user.
        OriginalGame will not be removed.
        """
        original_game = OriginalGameFactory()
        user_game = GameFactory(original_game=original_game, user=self.user)

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(1, Game.objects.count())

        #

        response = self.client.delete(reverse('api_games:games-detail', kwargs={'pk': user_game.id}))
        self.assertEqual(204, response.status_code)

        self.assertEqual(1, OriginalGame.objects.count())
        self.assertEqual(0, Game.objects.count())

    @responses.activate
    def test_find_games_by_title(self):
        """
        Tests returning games list found by given title
        """

        dir = Path(__file__).parent.joinpath("test_data")
        games_list_xml = get_data_from_file(dir, "bgg_response_search_boardgame_terraform.xml")

        title = "Terraform"

        responses.add(
            method="GET",
            url=settings.BOARD_GAME_GEEK_GAMES_LIST_URL.format(title=title),
            body=games_list_xml,
            status=status.HTTP_200_OK,
            content_type="text/xml",
        )

        #

        response = self.client.get(reverse("api_games:games-find-games"),
           data={
               "title": title,
           }
        )

        self.assertEqual(status.HTTP_200_OK, response.status_code)

        games_list = response.data

        self.assertEqual(29, len(games_list))
