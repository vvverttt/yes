from PIL import Image
import os

def analyze_image_collection(folder_path, collection_name):
    """Analyze a collection of images to count pixels used and unique colors"""
    
    total_pixels_used = 0
    all_colors = set()
    image_count = 0
    
    print(f"\nAnalyzing {collection_name}...")
    
    # Get all PNG files in the folder
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    
    # Exclude specific file if requested
    exclude_files = ['10197_Missing_Phunk_10197.png', 'Missing-Phunk#10197_transparent.png']
    image_files = [f for f in image_files if f not in exclude_files]
    
    for filename in image_files:
        filepath = os.path.join(folder_path, filename)
        
        try:
            # Open image and convert to RGBA
            img = Image.open(filepath).convert('RGBA')
            width, height = img.size
            
            # Get pixel data
            pixels = img.getdata()
            
            image_pixels_used = 0
            image_colors = set()
            
            for pixel in pixels:
                r, g, b, a = pixel
                
                # Count non-transparent pixels
                if a > 0:  # Alpha > 0 means not fully transparent
                    image_pixels_used += 1
                    # Store color as RGB tuple (ignoring alpha for color counting)
                    color = (r, g, b)
                    image_colors.add(color)
                    all_colors.add(color)
            
            total_pixels_used += image_pixels_used
            image_count += 1
            
            if image_count <= 5:  # Show first 5 for verification
                print(f"  {filename}: {image_pixels_used} pixels, {len(image_colors)} colors")
        
        except Exception as e:
            print(f"  Error processing {filename}: {e}")
    
    print(f"\n{collection_name} Results:")
    print(f"  Total Images: {image_count}")
    print(f"  Total Pixels Used: {total_pixels_used:,}")
    print(f"  Total Unique Colors: {len(all_colors):,}")
    
    return total_pixels_used, len(all_colors)


# Analyze CryptoPhunks Images
cryptophunks_folder = "images/images_24x24"
cryptophunks_pixels, cryptophunks_colors = analyze_image_collection(cryptophunks_folder, "CryptoPhunks Images")

# Analyze Missing Phunks Images
missing_phunks_folder = "images/missing_phunks_transparent"
missing_phunks_pixels, missing_phunks_colors = analyze_image_collection(missing_phunks_folder, "Missing Phunks Images")

print(f"\n{'='*50}")
print("SUMMARY:")
print(f"{'='*50}")
print(f"CryptoPhunks Images:")
print(f"  Pixels Used: {cryptophunks_pixels:,}")
print(f"  Colors Used: {cryptophunks_colors:,}")
print(f"Missing Phunks Images:")
print(f"  Pixels Used: {missing_phunks_pixels:,}")
print(f"  Colors Used: {missing_phunks_colors:,}")
