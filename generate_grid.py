from PIL import Image
import os

numbers = [256, 8611, 10107, 32, 10289, 1321, 483, 9403, 1136, 35, 45, 1207, 266, 619, 402, 77]
base_path = r'C:\Users\alber\dystolabzv69\DystoLabzV69\images\images_24x24'

# Map numbers to filenames
filename_map = {
    256: 'QuantumPhunk 256.png',
    8611: 'QuantumPhunk 8611.png',
    10107: 'QuantumMissingPhunk 10107.png',
    32: 'QuantumPhunk 32.png',
    10289: 'QuantumDystoPhunk 10289.png',
    1321: 'QuantumPhunk 1321.png',
    483: 'QuantumPhunk 483.png',
    9403: 'QuantumPhunk 9403.png',
    1136: 'QuantumPhunk 1136.png',
    35: 'QuantumPhunk 35.png',
    45: 'QuantumPhunk 45.png',
    1207: 'QuantumPhunk 1207.png',
    266: 'QuantumPhunk 266.png',
    619: 'QuantumPhunk 619.png',
    402: 'QuantumPhunk 402.png',
    77: 'QuantumPhunk 77.png'
}

cols = 8
scaled_size = 160
gap = 8
margin = 25

composite_width = cols * scaled_size + (cols - 1) * gap + 2 * margin
composite_height = 2 * scaled_size + gap + 2 * margin
composite = Image.new('RGB', (composite_width, composite_height), (195, 255, 0))

for i, num in enumerate(numbers):
    filename = filename_map[num]
    filepath = os.path.join(base_path, filename)
    if os.path.exists(filepath):
        img = Image.open(filepath).convert('RGBA').resize((scaled_size, scaled_size), Image.NEAREST)
        x = margin + (i % cols) * (scaled_size + gap)
        y = margin + (i // cols) * (scaled_size + gap)
        composite.paste(img, (x, y), img)
        print(f'Added {num}: {filename}')
    else:
        print(f'NOT FOUND: {num} - {filename}')

composite.save('public/images/characters_grid.png')
print(f'Done! Image size: {composite.size}')

