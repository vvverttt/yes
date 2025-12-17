#!/usr/bin/env python3
import json
import os

def generate_full_comparison():
    # Read the JSON file
    with open('cryptophunks-v69-merged (1) (1).json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Extract collection items
    items = data['collection_items']
    
    # Start building HTML
    html_start = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete QuantumPhunks Comparison - CryptoPhunksV69</title>
    <link rel="stylesheet" href="../public/components/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../public/components/bootstrap/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">
    <link rel="stylesheet" href="../public/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../public/stylesheets/mainf500.css?v=13" charset="utf-8" >
    <link rel="stylesheet" type="text/css" href="../public/stylesheets/stylesf500.css?v=13" charset="utf-8" >
</head>
<body>

<header class="container main_header">
    <div class="row">
        <div class="col-lg-3 col-xs-2">
            <a href="../index.html" class="logo ">
            <svg viewBox="0 0 16 26" y="0" x="0"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-logo"></use></svg>
            <span class="hidden-xs hidden-sm">DystoLabz</span>
            </a>
        </div>
        <div class="col-lg-9 col-xs-10">
            <nav class="main_navigation">
                <ul class="list main_nav_list">
                    <li class="jsNavShow"><a class="active" href="../projectlist.html">Projects</a></li>
<li class="jsNavShow"><a class="" href="../bloglist.html">Writing</a></li>
<li class="jsNavShow"><a class="" href="../about.html">About</a></li>
<li class="jsNavShow"><a href="https://x.com/DystoLabz"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<div class="container" style="margin-top: 30px;">
    <div class="row">
        <div class="col-md-11 col-xs-12">
            <div class="breadcrumb-box">
                <a href="cryptophunks.html" class="breadcrumb-link">CryptoPhunksV69</a>
                <span class="breadcrumb-separator"> / </span>
                <span class="breadcrumb-current">Complete QuantumPhunks Comparison (4,445 Total)</span>
            </div>
            <h1 class="main-title">Complete QuantumPhunks vs Original Comparison</h1>
            <p class="lead">All 4,445 QuantumPhunks with enhanced traits compared to their original CryptoPunk counterparts</p>
        </div>
    </div>
</div>

<div class="container">
    <div class="section-divider"></div>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h3 class="section-title">Complete Collection Comparison</h3>
            <table class="attr-table">
                <thead>
                    <tr>
                        <th>QuantumPhunk</th>
                        <th>OG Traits</th>
                        <th>OG Punk</th>
                        <th>Additional Traits</th>
                        <th>Enhancement</th>
                        <th>Examples</th>
                    </tr>
                </thead>
                <tbody>
'''
    
    html_rows = ""
    
    # Define OG traits that exist in original CryptoPunks
    og_trait_values = {
        'Male', 'Female', 'Zombie', 'Ape', 'Alien',
        'Earring', 'Luxurious Beard', 'Mustache', 'Goatee', 'Normal Beard', 'Normal Beard Black',
        'Shadow Beard', 'Muttonchops', 'Chinstrap',
        'Big Shades', 'Classic Shades', 'Eye Mask', 'Regular Shades', 'Small Shades', 'VR',
        '3D Glasses', 'Eye Patch', 'Nerd Glasses',
        'Big Beard', 'Cigarette', 'Pipe', 'Buck Teeth', 'Hot Lipstick', 'Purple Lipstick',
        'Black Lipstick', 'Medical Mask', 'Frown', 'Smile',
        'Bandana', 'Beanie', 'Cap', 'Cap Forward', 'Crazy Hair', 'Do-rag', 'Fedora',
        'Frumpy Hair', 'Half Shaved', 'Headband', 'Hoodie', 'Knitted Cap', 'Messy Hair',
        'Mohawk', 'Mohawk Dark', 'Mohawk Thin', 'Orange Side', 'Peak Spike', 'Pigtails',
        'Police Cap', 'Purple Hair', 'Red Mohawk', 'Shaved Head', 'Straight Hair',
        'Straight Hair Blonde', 'Straight Hair Dark', 'Stringy Hair', 'Tassle Hat',
        'Wild Blonde', 'Wild Hair', 'Wild White Hair', 'Clown Hair Green', 'Vampire Hair',
        'Top Hat', 'Pilot Helmet', 'Tiara', 'Orange Side', 'Blonde Bob', 'Pink With Hat',
        'Wild Blonde', 'Clown Eyes Blue', 'Clown Eyes Green', 'Green Eye Shadow',
        'Blue Eye Shadow', 'Purple Eye Shadow'
    }
    
    # Generate rows for each QuantumPhunk
    for item in items:
        index = item['index']
        name = item['name']
        attributes = item['attributes']
        
        # Separate OG traits from additional traits
        og_traits = []
        additional_traits = []
        
        for attr in attributes:
            trait_value = attr['value']
            if trait_value in og_trait_values:
                og_traits.append(trait_value)
            else:
                additional_traits.append(trait_value)
        
        # Format OG traits
        og_tags = " ".join([f'<span class="trait-tag" style="background: #f5f5f5; color: #666;">{trait}</span>' 
                           for trait in og_traits[:6]])  # Limit to 6 for space
        
        # Format additional traits
        additional_tags = " ".join([f'<span class="trait-tag" style="background: #c8e6c9; color: #2e7d32;">{trait}</span>' 
                                   for trait in additional_traits[:8]])  # Limit to 8 for space
        
        # Enhancement badge
        enhancement = f"{len(og_traits)} OG + {len(additional_traits)} new"
        
        # Pad index for CryptoPunk image filename
        punk_index = f"{index:04d}"
        
        # Build the row
        row = f'''                    <tr>
                        <td class="attr-name">{name}</td>
                        <td>{og_tags}</td>
                        <td class="examples-cell">
                            <a href="#" class="phunk-box">
                                <img src="../public/images/cryptopunks/punk{punk_index}.png" alt="CryptoPunk {index}" onerror="this.style.display='none'">
                            </a>
                        </td>
                        <td>{additional_tags}</td>
                        <td><span class="enhancement-badge" style="background: #4caf50;">{enhancement}</span></td>
                        <td class="examples-cell">
                            <a href="#" class="phunk-box">
                                <img src="../public/images/final4276/phunk_{index}.png" alt="QuantumPhunk {index}" onerror="this.style.display='none'">
                            </a>
                        </td>
                    </tr>
'''
        html_rows += row
    
    html_end = '''                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .breadcrumb-box {
        background: #f8f9fa;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #007bff;
    }
    .breadcrumb-link {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
    }
    .breadcrumb-link:hover {
        color: #0056b3;
        text-decoration: underline;
    }
    .breadcrumb-separator {
        color: #6c757d;
        margin: 0 8px;
    }
    .breadcrumb-current {
        color: #495057;
        font-weight: 600;
    }
    .main-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 45px;
        font-weight: 700;
        color: #333;
        margin-bottom: 20px;
        line-height: 1.2;
    }
    .section-divider {
        height: 2px;
        background: linear-gradient(to right, #007bff, transparent);
        margin: 30px 0;
    }
    .section-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 28px;
        font-weight: 600;
        color: #333;
        margin-bottom: 20px;
    }
    .attr-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .attr-table th {
        background: #f8f9fa;
        color: #495057;
        font-weight: 600;
        padding: 15px 12px;
        text-align: left;
        border-bottom: 2px solid #dee2e6;
        font-family: 'Montserrat', sans-serif;
    }
    .attr-table td {
        padding: 12px;
        border-bottom: 1px solid #dee2e6;
        vertical-align: top;
    }
    .attr-table tr:hover {
        background: #f8f9fa;
    }
    .attr-name {
        font-weight: 600;
        color: #007bff;
        white-space: nowrap;
        min-width: 140px;
    }
    .attr-count {
        color: #333;
        font-weight: 400;
    }
    .phunk-box {
        display: inline-block;
        width: 64px;
        height: 64px;
        background-color: #c3ff00;
        margin: 0 2px 0 0;
        padding: 0;
        vertical-align: middle;
        text-decoration: none;
    }
    .phunk-box img {
        width: 64px;
        height: 64px;
        image-rendering: pixelated;
        display: block;
    }
    .phunk-box:hover {
        opacity: 0.8;
    }
    .examples-cell {
        white-space: nowrap;
        font-size: 0;
    }
    .similarity-badge {
        background: #007bff;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }
    .enhancement-badge {
        background: #28a745;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }
    .innovation-badge {
        background: #ffc107;
        color: #333;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }
    .trait-tag {
        background: #f8f9fa;
        color: #495057;
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 11px;
        margin: 1px;
        display: inline-block;
    }
    .lead {
        font-size: 18px;
        color: #6c757d;
        margin-bottom: 30px;
    }
</style>

<footer class="main_footer" style="margin-top: 50px;">
    <div class="container">
        <div class="col-md-6 col-sm-6 col-xs-12 pull-right">
            <ul class="list footer_nav_list">
                <li class="jsNavShow"><a class="active" href="../projectlist.html">Projects</a></li>
<li class="jsNavShow"><a class="" href="../bloglist.html">Writing</a></li>
<li class="jsNavShow"><a class="" href="../about.html">About</a></li>
<li class="jsNavShow"><a href="http://twitter.com/larvalabs"><i class="fa fa-twitter"></i></a></li>
            </ul>
        </div>
    </div>
</footer>

<svg hidden>
    <defs>
        <g id="icon-logo">
            <path d="M0,3.5 C0,1.56700338 1.57093664,0 3.5,0 C5.43299662,0 7,1.57093664 7,3.5 C7,5.43299662 5.42906336,7 3.5,7 C1.56700338,7 0,5.42906336 0,3.5 Z M0,13.5 C0,11.5670034 1.57093664,10 3.5,10 C5.43299662,10 7,11.5709366 7,13.5 C7,15.4329966 5.42906336,17 3.5,17 C1.56700338,17 0,15.4290634 0,13.5 Z M0,22.5 C0,20.5670034 1.57093664,19 3.5,19 C5.43299662,19 7,20.5709366 7,22.5 C7,24.4329966 5.42906336,26 3.5,26 C1.56700338,26 0,24.4290634 0,22.5 Z M12,4 C12,2.8954305 12.8877296,2 14,2 C15.1045695,2 16,2.88772964 16,4 C16,5.1045695 15.1122704,6 14,6 C12.8954305,6 12,5.11227036 12,4 Z M12,14 C12,12.8954305 12.8877296,12 14,12 C15.1045695,12 16,12.8877296 16,14 C16,15.1045695 15.1122704,16 14,16 C12.8954305,16 12,15.1122704 12,14 Z M12,23 C12,21.8954305 12.8877296,21 14,21 C15.1045695,21 16,21.8877296 16,23 C16,24.1045695 15.1122704,25 14,25 C12.8954305,25 12,24.1122704 12,23 Z" id="logo"></path>
        </g>
    </defs>
</svg>

</body>
</html>'''
    
    # Combine all parts
    full_html = html_start + html_rows + html_end
    
    # Write to file
    with open('project/cryptophunks-complete.html', 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"Generated complete comparison with {len(items)} QuantumPhunks!")
    print("File saved as: project/cryptophunks-complete.html")

if __name__ == "__main__":
    generate_full_comparison()