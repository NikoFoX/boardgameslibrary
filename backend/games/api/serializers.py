from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from common.constants import LONG_STRING, SHORT_STRING
from games.models import Game, Match, OriginalGame


class OriginalGameSerializer(ModelSerializer):
    title = serializers.CharField(max_length=SHORT_STRING, required=False)
    rating = serializers.DecimalField(max_digits=4, decimal_places=2, required=False)
    image = serializers.CharField(max_length=LONG_STRING, required=False)
    thumbnail = serializers.CharField(max_length=LONG_STRING, required=False)
    external_id = serializers.CharField(max_length=SHORT_STRING)

    class Meta:
        model = OriginalGame
        fields = [
            'id', 'title', 'rating', 'image', 'thumbnail', 'external_id',
        ]


class GameSerializer(ModelSerializer):
    title = serializers.CharField(read_only=True, source="original_game.title")
    image = serializers.CharField(read_only=True, max_length=LONG_STRING, source="original_game.image")
    thumbnail = serializers.CharField(read_only=True, max_length=LONG_STRING, source="original_game.thumbnail")

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'image', 'thumbnail', 'original_game', 'user'
        ]


class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'
