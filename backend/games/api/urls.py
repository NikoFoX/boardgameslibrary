from django.urls import path
from rest_framework.routers import DefaultRouter

from games.api.views import GameViewSet, MatchViewSet

router = DefaultRouter()
router.register('game/', GameViewSet, basename='games')
router.register('match/', MatchViewSet, basename='matches')

urlpatterns = router.get_urls()