import json

# Load collection JSON
with open('cryptophunks-v67-merged (1) (1).json', 'r', encoding='utf-8') as f:
    collection = json.load(f)

# Build new image list
images = []
for item in collection['collection_items']:
    idx = item['index']
    name = item['name']
    # Use the same filename logic as your current image-list.json
    if 'Missing' in name:
        filename = f"QuantumMissingPhunk {idx}.png"
    elif 'DystoPhunk' in name:
        filename = f"QuantumDystoPhunk {idx}.png"
    elif 'EthsRock' in name:
        filename = f"QuantumEthsRock {idx}.png"
    elif 'InfinityStone' in name:
        filename = f"QuantumInfinityStone {idx}.png"
    else:
        filename = f"QuantumPhunk {idx}.png"
    images.append({"num": idx, "filename": filename})

# Write new image-list.json
with open('public/json/image-list.json', 'w', encoding='utf-8') as f:
    json.dump({"images": images, "total": len(images)}, f, indent=2)

print(f"Wrote {len(images)} images to public/json/image-list.json")
