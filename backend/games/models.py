from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
from common.constants import SHORT_STRING, LONG_STRING, MATCH_RESULTS


class LogModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        abstract = True


class Game(LogModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=SHORT_STRING)
    rating = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    thumbnail = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    external_id = models.CharField(max_length=SHORT_STRING)


class Match(LogModel):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='matches')
    result = models.PositiveSmallIntegerField(choices=MATCH_RESULTS)
    team = ArrayField(models.CharField(max_length=SHORT_STRING), null=True, blank=True)
    opponents = ArrayField(models.CharField(max_length=SHORT_STRING), null=True, blank=True)
    scenario = models.CharField(max_length=LONG_STRING, null=True, blank=True)
    points = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)