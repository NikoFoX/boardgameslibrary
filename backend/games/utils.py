import requests
import xmltodict
from rest_framework import status


def get_games_from_source_by_title(title):
    url = "https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query="
    url += title

    response = requests.get(url)

    games_list = []
    if response.status_code == status.HTTP_200_OK:
        converted_xml = xmltodict.parse(response.content)
        games_dicts = converted_xml["items"].get("item")

        if games_dicts:
            for game_dict in games_dicts:
                games_list.append({"id": game_dict["@id"], "title": game_dict["name"]["@value"]})

    return games_list
