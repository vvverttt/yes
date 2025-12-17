from PIL import Image
import os
import random
import json

# Load Missing Phunks data (10000-10250)
with open('images/missing-phunks.json', 'r') as f:
    missing_data = json.load(f)

# Filter by character types: Ape, Alien, Zombie, and others (Female, Male)
missing_items = missing_data['collection_items']
target_types = ['Ape', 'Alien', 'Zombie', 'Female', 'Male']

# Filter characters by their "Sex" trait
filtered_characters = []
for item in missing_items:
    for attr in item['attributes']:
        if attr['trait_type'] == 'Sex' and attr['value'] in target_types:
            filtered_characters.append(item)
            break

# Get 16 random characters from the filtered list
if len(filtered_characters) >= 16:
    random_missing = random.sample(filtered_characters, 16)
else:
    # If not enough filtered characters, fall back to random selection from all
    random_missing = random.sample(missing_items, 16)

base_path_missing = r'C:\Users\alber\dystolabzv69\DystoLabzV69\images\missing_phunks_transparent'

cols = 8
scaled_size = 160
gap = 8
margin = 25

composite_width = cols * scaled_size + (cols - 1) * gap + 2 * margin
composite_height = 2 * scaled_size + gap + 2 * margin
composite = Image.new('RGB', (composite_width, composite_height), (195, 255, 0))

for i, char in enumerate(random_missing):
    char_id = char['index']
    filename = f'{char_id}_Missing_Phunk_{char_id}.png'
    filepath = os.path.join(base_path_missing, filename)
    
    if os.path.exists(filepath):
        img = Image.open(filepath).convert('RGBA').resize((scaled_size, scaled_size), Image.NEAREST)
        x = margin + (i % cols) * (scaled_size + gap)
        y = margin + (i // cols) * (scaled_size + gap)
        composite.paste(img, (x, y), img)
        print(f'Added {char_id}: {filename}')
    else:
        print(f'NOT FOUND: {char_id} - {filename}')

composite.save('public/images/missingphunks_banner_3.png')
print(f'Done! Image size: {composite.size}')

# Show what character types were selected
selected_chars_with_types = []
for char in random_missing:
    char_id = char['index']
    char_type = 'Unknown'
    for attr in char['attributes']:
        if attr['trait_type'] == 'Sex':
            char_type = attr['value']
            break
    selected_chars_with_types.append(f"{char_id} ({char_type})")

print(f'Selected Missing Phunks: {[c["index"] for c in random_missing]}')
print(f'Character types: {", ".join(selected_chars_with_types)}')