from pprint import pprint

import xmltodict
import requests
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.db import models
from uuid import uuid4

from common.constants import SHORT_STRING, LONG_STRING, MATCH_RESULTS


class LogModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    uuid = models.UUIDField(default=uuid4, unique=True, verbose_name="UUID")

    class Meta:
        abstract = True


class OriginalGame(LogModel):
    title = models.CharField(max_length=SHORT_STRING)
    rating = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    thumbnail = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    external_id = models.CharField(max_length=SHORT_STRING)

    class Meta:
        ordering = ('title', 'id')

    def __str__(self):
        return f'{self.title}'

    @staticmethod
    def get_game_data_from_source(external_id):

        url = settings.BOARD_GAME_GEEK_GAME_DATA_URL.format(external_id=external_id)
        response = requests.get(url)
        game_data= xmltodict.parse(response.content)
        game_data = game_data['items']['item']

        return game_data

    @staticmethod
    def create_original_game_from_external_id(external_id):
        # get original game data from bgg and create new OriginalGame

        game_json = OriginalGame.get_game_data_from_source(external_id)

        game = OriginalGame.objects.create(
            title=game_json.get('name')[0]['@value'],
            external_id=external_id,
            image=game_json.get('image'),
            thumbnail=game_json.get('thumbnail')
        )

        return game


class Game(LogModel):
    original_game = models.ForeignKey(OriginalGame, on_delete=models.CASCADE, related_name='games')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='games')

    class Meta:
        ordering = ('original_game__title', 'id')

    def __str__(self):
        return f"{self.original_game.title} user game"

    @property
    def title(self):
        return self.original_game.title

    @property
    def image(self):
        return self.original_game.image

    @property
    def thumbnail(self):
        return self.original_game.thumbnail

    @property
    def external_id(self):
        return self.original_game.external_id


class Match(LogModel):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='matches')
    result = models.PositiveSmallIntegerField(choices=MATCH_RESULTS)
    team = ArrayField(models.CharField(max_length=SHORT_STRING), null=True, blank=True)
    opponents = ArrayField(models.CharField(max_length=SHORT_STRING), null=True, blank=True)
    scenario = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    points = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name_plural = "matches"

    def __str__(self):
        return f'{self.get_result_display()} - {self.game.title}'

    @property
    def user(self):
        return self.user
