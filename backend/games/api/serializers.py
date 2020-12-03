from rest_framework.serializers import ModelSerializer

from games.models import Game, Match


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game


class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match