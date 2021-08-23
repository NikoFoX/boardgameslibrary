from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from common.constants import LONG_STRING
from games.models import Game, Match, OriginalGame


class GameSerializer(ModelSerializer):
    name = serializers.CharField(read_only=True, source="original_game.name")
    image = serializers.CharField(read_only=True, max_length=LONG_STRING, source="original_game.image")
    thumbnail = serializers.CharField(read_only=True, max_length=LONG_STRING, source="original_game.thumbnail")
    original_game_id = serializers.IntegerField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Game
        fields = [
            'id', 'name', 'image', 'thumbnail', 'original_game_id', 'user_id'
        ]


class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'
