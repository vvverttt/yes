import json
from collections import defaultdict, Counter

def analyze_collection_stats():
    # Load Missing Phunks data
    with open('images/missing-phunks.json', 'r') as f:
        missing_data = json.load(f)
    
    # Load DystoPhunkz data  
    with open('images/dysto-phunks.json', 'r') as f:
        dysto_data = json.load(f)
    
    print("=== MISSING PHUNKS STATS ===")
    analyze_single_collection(missing_data, "Missing Phunks")
    
    print("\n=== DystoPhunkz STATS ===")
    analyze_single_collection(dysto_data, "DystoPhunkz")
    
    print("\n=== COMBINED STATS ===")
    # Combine both collections for overall stats
    combined_items = missing_data['collection_items'] + dysto_data['collection_items']
    missing_count = len(missing_data['collection_items'])
    dysto_count = len(dysto_data['collection_items'])
    total_count = missing_count + dysto_count
    
    # Analyze combined data
    trait_types = set()
    trait_values = set()
    trait_combinations = []
    
    for item in combined_items:
        combination = []
        for attr in item['attributes']:
            trait_type = attr['trait_type']
            trait_value = attr['value']
            trait_types.add(trait_type)
            trait_values.add(f"{trait_type}: {trait_value}")
            combination.append(f"{trait_type}:{trait_value}")
        trait_combinations.append(tuple(sorted(combination)))
    
    # Count one-of-ones (unique trait combinations)
    combination_counts = Counter(trait_combinations)
    one_of_ones = sum(1 for count in combination_counts.values() if count == 1)
    
    print(f"Total Characters: {total_count} ({missing_count} Missing + {dysto_count} Dysto)")
    print(f"Unique Trait Types: {len(trait_types)}")
    print(f"Unique Trait Values: {len(trait_values)}")
    print(f"Total One of Ones: {one_of_ones}")
    print(f"Missing Phunks: {missing_count} characters")
    print(f"DystoPhunkz: {dysto_count} characters")

def analyze_single_collection(data, name):
    items = data['collection_items']
    trait_types = set()
    trait_values = set()
    trait_combinations = []
    
    for item in items:
        combination = []
        for attr in item['attributes']:
            trait_type = attr['trait_type']
            trait_value = attr['value']
            trait_types.add(trait_type)
            trait_values.add(f"{trait_type}: {trait_value}")
            combination.append(f"{trait_type}:{trait_value}")
        trait_combinations.append(tuple(sorted(combination)))
    
    # Count one-of-ones
    combination_counts = Counter(trait_combinations)
    one_of_ones = sum(1 for count in combination_counts.values() if count == 1)
    
    print(f"{name}:")
    print(f"  Total Characters: {len(items)}")
    print(f"  Unique Trait Types: {len(trait_types)}")  
    print(f"  Unique Trait Values: {len(trait_values)}")
    print(f"  Total One of Ones: {one_of_ones}")
    
    # Show trait types
    print(f"  Trait Types: {sorted(list(trait_types))}")

if __name__ == "__main__":
    analyze_collection_stats()
