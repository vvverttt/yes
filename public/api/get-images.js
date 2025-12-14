const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    try {
        const imagesDir = path.join(__dirname, '../../images/images_24x24');
        const files = fs.readdirSync(imagesDir);
        
        // Extract numbers from filenames and sort
        const numbers = files
            .map(file => {
                // Extract number from filename (e.g., "QuantumPhunk 123.png" -> 123)
                const match = file.match(/(\d+)/);
                return match ? parseInt(match[1]) : null;
            })
            .filter(num => num !== null)
            .sort((a, b) => a - b);
        
        res.json({ numbers });
    } catch (error) {
        console.error('Error reading images:', error);
        res.status(500).json({ error: 'Failed to read images' });
    }
};

