import random
import factory
from factory import django
from faker import Faker

from games.models import Game, Match, OriginalGame
from users.models import User

faker = Faker()

def fake_game_name():
    words = faker.words(nb=2)
    return " ".join(words).capitalize()


class UserFactory(django.DjangoModelFactory):
    name = factory.Faker('name')

    class Meta:
        model = User


class OriginalGameFactory(django.DjangoModelFactory):
    title = fake_game_name()
    external_id = random.randint(1, 10000)

    class Meta:
        model = OriginalGame


class GameFactory(django.DjangoModelFactory):
    class Meta:
        model = Game


class MatchFactory(django.DjangoModelFactory):
    class Meta:
        model = Match