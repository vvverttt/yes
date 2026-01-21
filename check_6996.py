import json

with open('cryptophunks-v67-merged (1) (1).json', 'r') as f:
    data = json.load(f)

# Find item 6996 and check attributes
for item in data.get('collection_items', []):
    if item.get('index') == 6996:
        print(f'Item 6996 attributes:')
        for attr in item.get('attributes', []):
            print(f'  {attr.get("trait_type")}: {attr.get("value")}')
        break
