import json
from collections import defaultdict

# Path to the JSON file
json_path = "cryptophunks-v67-merged (1) (1).json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Count unique trait values and types
trait_types = set()
trait_values = set()

for item in data["collection_items"]:
    for attr in item.get("attributes", []):
        trait_types.add(attr["trait_type"])
        trait_values.add((attr["trait_type"], attr["value"]))

print(f"Total unique trait types: {len(trait_types)}")
print(f"Total unique trait values: {len(trait_values)}")
print(f"Total items: {len(data['collection_items'])}")
print(f"Total supply (from metadata): {data.get('total_supply')}")
