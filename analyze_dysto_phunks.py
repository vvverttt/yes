from PIL import Image
import os

def analyze_image_collection(folder_path, collection_name):
    total_pixels_used = 0
    all_colors = set()
    image_count = 0
    print(f"\nAnalyzing {collection_name}...")
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    for filename in image_files:
        filepath = os.path.join(folder_path, filename)
        try:
            img = Image.open(filepath).convert('RGBA')
            pixels = img.getdata()
            image_pixels_used = 0
            image_colors = set()
            for pixel in pixels:
                r, g, b, a = pixel
                if a > 0:
                    image_pixels_used += 1
                    color = (r, g, b)
                    image_colors.add(color)
                    all_colors.add(color)
            total_pixels_used += image_pixels_used
            image_count += 1
            if image_count <= 5:
                print(f"  {filename}: {image_pixels_used} pixels, {len(image_colors)} colors")
        except Exception as e:
            print(f"  Error processing {filename}: {e}")
    print(f"\n{collection_name} Results:")
    print(f"  Total Images: {image_count}")
    print(f"  Total Pixels Used: {total_pixels_used:,}")
    print(f"  Total Unique Colors: {len(all_colors):,}")
    return total_pixels_used, len(all_colors)

# Analyze DystoPhunks Images
folder = "images/dystophunks"
dysto_pixels, dysto_colors = analyze_image_collection(folder, "DystoPhunks Images")
print(f"\nDystoPhunks Images:")
print(f"  Pixels Used: {dysto_pixels:,}")
print(f"  Colors Used: {dysto_colors:,}")
