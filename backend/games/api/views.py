from rest_framework.viewsets import ModelViewSet

from games.api.serializers import GameSerializer, MatchSerializer
from games.models import Game


class GameViewSet(ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)


class MatchViewSet(ModelViewSet):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)