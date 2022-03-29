import json
from pathlib import Path

import responses
from django.conf import settings
from django.test.testcases import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIClient

from common.factories import UserFactory, OriginalGameFactory
from common.utils import get_data_from_file
from games.models import OriginalGame


class OriginalGameTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory(username="test_user")
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_original_game(self):
        original_game = OriginalGameFactory()

        #

        response = self.client.get(
            reverse('api_games:original-game-detail', kwargs={"external_id": original_game.external_id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        original_game_json = response.json()

        self.assertEqual(
            original_game_json,
            {
                "id": original_game.id,
                "title": original_game.title,
                "rating": original_game.rating,
                "image": original_game.image,
                "thumbnail": original_game.thumbnail,
                "external_id": original_game.external_id,
            }
        )

    @responses.activate
    def test_create_new_original_game(self):
        dir = Path(__file__).parent.joinpath("test_data")
        game_xml_data = get_data_from_file(dir, "bgg_response_terraforming_mars.xml")

        external_id = '167791'

        responses.add(
            method="GET",
            url=settings.BOARD_GAME_GEEK_GAME_DATA_URL.format(external_id=external_id),
            body=game_xml_data,
            status=status.HTTP_200_OK,
            content_type="text/xml",
        )

        self.assertEqual(0, OriginalGame.objects.count())

        #

        new_game_data = {
            'external_id': external_id
        }

        response = self.client.post(reverse('api_games:original-game-list'), data=json.dumps(new_game_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(OriginalGame.objects.count(), 1)

        original_game = OriginalGame.objects.first()
        self.assertEqual(original_game.title, 'Terraforming Mars')
        self.assertEqual(original_game.external_id, external_id)
        self.assertEqual(
            original_game.thumbnail,
            'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__thumb/img/BTxqxgYay5tHJfVoJ2NF5g43_gA=/fit-in/200x150/filters:strip_icc()/pic3536616.jpg',
        )
        self.assertEqual(
            original_game.image,
            'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__original/img/thIqWDnH9utKuoKVEUqveDixprI=/0x0/filters:format(jpeg)/pic3536616.jpg',
        )
