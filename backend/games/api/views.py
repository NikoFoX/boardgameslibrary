from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from games.utils import get_games_from_source_by_title
from games.api.serializers import GameSerializer, MatchSerializer
from games.models import Game, OriginalGame


class GameViewSet(ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        external_id = data.get('external_id')

        if not external_id:
            return Response(data="No external_id provided", status=status.HTTP_400_BAD_REQUEST)

        try:
            original_game = OriginalGame.objects.get(external_id=external_id)
        except OriginalGame.DoesNotExist:
            original_game = OriginalGame.create_game_from_game_json(external_id=external_id)

        game_data = {
            'original_game_id': original_game.id,
            'user_id': request.user.id,
        }

        serializer = self.get_serializer(data=game_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)

    @action(["GET"], detail=False)
    def find_game(self, request, **kwargs):
        title = request.query_params.get("title")
        if not title:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Please provide game title")
        games_list = get_games_from_source_by_title(title)
        if games_list:
            return Response(status=status.HTTP_200_OK, data=games_list)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class MatchViewSet(ModelViewSet):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user)
