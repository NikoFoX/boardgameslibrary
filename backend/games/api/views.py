from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from games.api.serializers import GameSerializer, MatchSerializer
from games.models import Game, OriginalGame


class GameViewSet(ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        external_id = data.get('external_id')
        title = data.get('title')

        game_data = {
            'user': request.user.id,
            'title': title,
        }

        if not external_id:
            return Response(data="No external_id provided", status=status.HTTP_400_BAD_REQUEST)

        try:
            original_game_instance = OriginalGame.objects.get(external_id=external_id)
            game_data['game'] = original_game_instance.id
        except OriginalGame.DoesNotExist:
            # get original game data from bgg, create OriginalGame and assign it to instance
            game_data['game'] = OriginalGame.create_game_from_game_json(title, external_id).id

        serializer = self.get_serializer(data=game_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)


class MatchViewSet(ModelViewSet):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)