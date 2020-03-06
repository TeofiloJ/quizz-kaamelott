
import json

def allKeysArePresent(quote):
    keysArePresent = True
    if 'citation' not in quote:
        keysArePresent = False
    if 'acteur' not in quote['infos']:
        keysArePresent = False
    if 'personnage' not in quote['infos']:
        keysArePresent = False
    if 'auteur' not in quote['infos']:
        keysArePresent = False
    if 'saison' not in quote['infos']:
        keysArePresent = False
    if 'episode' not in quote['infos']:
        keysArePresent = False
    return keysArePresent

with open('kaamelott.json', 'r') as INPUT:
    data = {"quotes": []}
    quotes = json.load(INPUT)
    for id in quotes:
        if allKeysArePresent(quotes[id]):
            data['quotes'].append({
                'id': id,
                'text': quotes[id]['citation'],
                'actor': quotes[id]['infos']['acteur'],
                'author': quotes[id]['infos']['auteur'],
                'season': quotes[id]['infos']['saison'],
                'episode': quotes[id]['infos']['episode'],
                'character': quotes[id]['infos']['personnage']
            })
            
with open('kaamelott-refactor.json', 'w') as output:
    json.dump(data, output)