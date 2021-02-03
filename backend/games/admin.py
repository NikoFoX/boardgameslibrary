from django.contrib import admin

# Register your models here.
from games.models import Game, OriginalGame, Match


@admin.register(OriginalGame)
class GameAdmin(admin.ModelAdmin):
    fields = ['created', 'modified', 'name', 'get_user_games_count']

    def get_user_games_count(self, obj):
        return obj.games.count()
    get_user_games_count.short_description = 'User games'


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    fields = ['created', 'modified', 'user']

    def get_matches_count(self, obj):
        return obj.matches.count()
    get_matches_count.short_description = 'Matches'


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    fields = ['created', 'modified', 'game', 'user']
