from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from common.constants import LONG_STRING
from games.models import Game, Match, OriginalGame


class OriginalGameSerializer(ModelSerializer):
    rating = serializers.DecimalField(max_digits=4, decimal_places=2, required=False)
    image = serializers.CharField(max_length=LONG_STRING, required=False)
    thumbnail = serializers.CharField(max_length=LONG_STRING, required=False)

    class Meta:
        model = OriginalGame
        fields = '__all__'


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'