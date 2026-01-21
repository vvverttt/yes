import json

with open('cryptophunks-v67-merged (1) (1).json', 'r') as f:
    data = json.load(f)

# Find all items with Afterburn attribute
afterburn_count = 0
afterburn_items = []

for item in data.get('collection_items', []):
    for attr in item.get('attributes', []):
        if attr.get('value') == 'Afterburn':
            afterburn_count += 1
            afterburn_items.append(item.get('index'))
            break

print(f"Afterburn count: {afterburn_count}")
print(f"Items with Afterburn: {afterburn_items}")

# Check specifically for 6996
for item in data.get('collection_items', []):
    if item.get('index') == 6996:
        has_afterburn = False
        for attr in item.get('attributes', []):
            if attr.get('value') == 'Afterburn':
                has_afterburn = True
                print(f"\n6996 has Afterburn: {has_afterburn}")
                print(f"6996 Afterburn trait_type: {attr.get('trait_type')}")
        if not has_afterburn:
            print(f"\n6996 does NOT have Afterburn")
        break
