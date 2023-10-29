import requests
from requests.auth import HTTPBasicAuth
import json
import os
import os.path

url_set = "https://api.pokemontcg.io/v2/sets/"
url_cards = "https://api.pokemontcg.io/v2/cards"
headers = {'Accept': 'application/json'}
auth = HTTPBasicAuth('apikey', '653e109f8c7a6ff2115193ae42617519')

collectionsFileName = "collections.json"
cardsBaseFileName = "-cards.json"
fieldsSelected = "id,name,images"

pageSize = 250


def getAllCollections():
    f = open(collectionsFileName,"w")
    f.write(str(requests.get(url_set, headers=headers, auth=auth).json()))
    f.close()
    

def getAllCards():
    with open(collectionsFileName) as collections_file:
        collections = json.load(collections_file)
        for collection in collections["data"]:
            print(collection["id"])
            if os.path.isfile(collection["id"]+cardsBaseFileName):
                os.remove(collection["id"]+cardsBaseFileName)
            f = open(collection["id"]+cardsBaseFileName,"a")
            pageCount = 1
            request = requests.get(url_cards + "?q=set.id:" + collection["id"] + "&page=" + str(pageCount) + "&select=" + fieldsSelected).json()
            finalData = request["data"]
            while(request["count"]+(pageSize*(pageCount-1))<request["totalCount"]):
                pageCount+=1
                request = requests.get(url_cards + "?q=set.id:" + collection["id"] + "&page=" + str(pageCount) + "&select=" + fieldsSelected).json()
                finalData += request["data"]
            init_string = json.loads('{"data":' + json.dumps(finalData) + "}")
            f.write(json.dumps(init_string, indent=4))
            f.close()
    
# getAllCollections()
getAllCards()