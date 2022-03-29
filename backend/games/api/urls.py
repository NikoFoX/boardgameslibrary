from django.urls import path
from rest_framework.routers import DefaultRouter

from games.api.views import GameViewSet, MatchViewSet, OriginalGameViewSet

app_name = 'api_games'

router = DefaultRouter()
router.register('original-game', OriginalGameViewSet, basename='original-game')
router.register('game', GameViewSet, basename='games')
router.register('match', MatchViewSet, basename='matches')

urlpatterns = router.get_urls()
