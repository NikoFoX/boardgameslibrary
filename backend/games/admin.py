from django.contrib import admin

# Register your models here.
from games.models import Game


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    fields = ['created', 'modified', 'name', 'user', 'get_matches_count']
    list_filter = ['user']

    def get_matches_count(self, obj):
        return obj.matches.count()
    get_matches_count.short_description = 'Matches'