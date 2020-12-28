from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class CreateGameTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='user')
        print(self.user.auth_token)
        self.client = APIClient()
        self.client.credentials(AUTHORIZATION=f'Token {self.user.auth_token}')

    def test_add_new_game(self):
        """
        Tests adding new game to user.
        """
        new_game_data = {
            'title': 'Game 1',
            'external_id': 'bgg_id_1'
        }

        response = self.client.post(reverse('api_games:games-list'), data=new_game_data)
        print(response.status)
        print(response.content)
