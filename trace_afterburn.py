import json

with open('cryptophunks-v67-merged (1) (1).json', 'r') as f:
    data = json.load(f)

items = data.get('collection_items', [])

# Simulate what the JavaScript does
traitsByCategory = {}

for item in items:
    for attr in item.get('attributes', []):
        traitType = attr.get('trait_type')
        value = attr.get('value')
        
        if traitType not in traitsByCategory:
            traitsByCategory[traitType] = {}
        
        if value not in traitsByCategory[traitType]:
            traitsByCategory[traitType][value] = {'count': 0, 'examples': []}
        
        traitsByCategory[traitType][value]['count'] += 1
        if len(traitsByCategory[traitType][value]['examples']) < 8:
            traitsByCategory[traitType][value]['examples'].append(item.get('index'))

# Check Character -> Afterburn
if 'Character' in traitsByCategory and 'Afterburn' in traitsByCategory['Character']:
    data = traitsByCategory['Character']['Afterburn']
    print(f"Afterburn examples: {data['examples']}")
    print(f"Afterburn count: {data['count']}")
    print(f"6996 in examples: {6996 in data['examples']}")
else:
    print("Afterburn not found in Character trait type")
