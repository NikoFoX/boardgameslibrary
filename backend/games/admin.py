from django.contrib import admin

# Register your models here.
from games.models import Game, OriginalGame, Match


@admin.register(OriginalGame)
class OriginalGameAdmin(admin.ModelAdmin):
    list_display = ['title', 'get_user_games_count']
    readonly_fields = ['created_at', 'modified_at']
    search_fields = ['title']

    def get_user_games_count(self, obj):
        return obj.games.count()
    get_user_games_count.short_description = 'Users with this game'


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['title', 'original_game', 'user']
    readonly_fields = ['created_at', 'modified_at']
    search_fields = ['original_game__title', 'user__name']
    raw_id_fields = ['original_game', 'user']

    def get_matches_count(self, obj):
        return obj.matches.count()
    get_matches_count.short_description = 'Matches'


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['game', 'user']
    readonly_fields = ['created_at', 'modified_at']
    search_fields = ['game__title', 'user__name']
