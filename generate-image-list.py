import os
import json
import re

# Get all image files from the folder
images_dir = os.path.join(os.getcwd(), 'images', 'images_24x24')
print(f'Looking for images in: {images_dir}')

if not os.path.exists(images_dir):
    print(f'ERROR: Directory does not exist: {images_dir}')
    exit(1)

files = os.listdir(images_dir)
print(f'Found {len(files)} files')

# Extract numbers and filenames
images = []
for file in files:
    if file.endswith('.png'):
        match = re.search(r'(\d+)', file)
        if match:
            num = int(match.group(1))
            images.append({'num': num, 'filename': file})

# Sort by number
images.sort(key=lambda x: x['num'])

# Save to JSON
output_dir = os.path.join(os.getcwd(), 'public', 'json')
os.makedirs(output_dir, exist_ok=True)
output_file = os.path.join(output_dir, 'image-list.json')

output = {
    'images': images,
    'total': len(images)
}

with open(output_file, 'w') as f:
    json.dump(output, f, indent=2)

print(f'Generated image list with {len(images)} images')
print(f'Saved to: {output_file}')
if images:
    print(f'Range: {images[0]["num"]} to {images[-1]["num"]}')

