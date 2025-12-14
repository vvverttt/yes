let phunksData = [];

async function init() {
    try {
        // Get character number from URL
        const params = new URLSearchParams(window.location.search);
        const characterNum = parseInt(params.get('num')) || 0;

        // Load JSON data
        const response = await fetch('../public/json/cryptophunks-v69-merged (1) (1).json');
        phunksData = await response.json();

        displayCharacter(characterNum);
    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('.detail-container').innerHTML = '<p>Error loading character data</p>';
    }
}

function displayCharacter(id) {
    const character = phunksData[id];
    
    // Set character ID
    document.getElementById('character-id').textContent = `#${id}`;
    
    // Set image (placeholder - you'll need to generate or link actual images)
    const imgElement = document.getElementById('character-img');
    imgElement.src = `../public/images/characters/${id}.png`;
    imgElement.onerror = () => {
        imgElement.src = '../public/images/placeholder.png';
    };
    
    // Display traits
    const traitsContainer = document.getElementById('traits-container');
    traitsContainer.innerHTML = '';
    
    if (character.attributes && Array.isArray(character.attributes)) {
        character.attributes.forEach(attr => {
            const traitDiv = document.createElement('div');
            traitDiv.className = 'trait';
            traitDiv.innerHTML = `
                <div class="trait-type">${attr.trait_type || 'Unknown'}</div>
                <div class="trait-value">${attr.value || 'N/A'}</div>
            `;
            traitsContainer.appendChild(traitDiv);
        });
    } else if (typeof character === 'object') {
        // Handle flat object structure
        Object.entries(character).forEach(([key, value]) => {
            if (key !== 'name' && key !== 'description' && key !== 'image') {
                const traitDiv = document.createElement('div');
                traitDiv.className = 'trait';
                traitDiv.innerHTML = `
                    <div class="trait-type">${key}</div>
                    <div class="trait-value">${value}</div>
                `;
                traitsContainer.appendChild(traitDiv);
            }
        });
    }
}

// Initialize on page load
window.addEventListener('load', init);

