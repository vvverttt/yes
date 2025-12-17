from PIL import Image
import os
import random
import json

# Load DystoPhunkz data (10251-10319) 
with open('images/dysto-phunks.json', 'r') as f:
    dysto_data = json.load(f)

# Get 16 random DystoPhunkz (fill 16 spots with random DystoPhunkz, duplicating if needed)
dysto_items = dysto_data['collection_items']
random_dysto = []

# Fill 16 spots by randomly selecting DystoPhunkz (allow duplicates)
for i in range(16):
    random_dysto.append(random.choice(dysto_items))

base_path_dysto = r'C:\Users\alber\dystolabzv69\DystoLabzV69\images\DystoPhunkz'

cols = 8
scaled_size = 160
gap = 8
margin = 25

composite_width = cols * scaled_size + (cols - 1) * gap + 2 * margin
composite_height = 2 * scaled_size + gap + 2 * margin
composite = Image.new('RGB', (composite_width, composite_height), (195, 255, 0))

for i, char in enumerate(random_dysto):
    char_id = char['index']
    filename = f'{char_id}_DystoPhunk_{char_id}.png'
    filepath = os.path.join(base_path_dysto, filename)
    
    if os.path.exists(filepath):
        img = Image.open(filepath).convert('RGBA').resize((scaled_size, scaled_size), Image.NEAREST)
        x = margin + (i % cols) * (scaled_size + gap)
        y = margin + (i // cols) * (scaled_size + gap)
        composite.paste(img, (x, y), img)
        print(f'Added {char_id}: {filename}')
    else:
        print(f'NOT FOUND: {char_id} - {filename}')

# Save as DystoPhunkz_grid.png for main DystoPhunkz.html page
composite.save('public/images/DystoPhunkz_grid.png')
print(f'Done! Image size: {composite.size}')
print(f'Selected DystoPhunkz: {[c["index"] for c in random_dysto]}')
