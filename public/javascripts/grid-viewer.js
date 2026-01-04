console.log('grid-viewer.js loaded');

var characterImages = [];
var canvas, ctx;
var characterSize = 24;
var gridSpacing = 2;
var cols = 100;
var isFullScreen = false;

// Pan and zoom state
var panX = 0;
var panY = 0;
var zoom = 2.35;
var isDragging = false;
var dragStartX = 0;
var dragStartY = 0;
var dragStartPanX = 0;
var dragStartPanY = 0;
var dragDistance = 0;

// Grid dimensions
var gridWidth = 0;
var gridHeight = 0;

// Minimum zoom to allow clicking
var MIN_ZOOM_FOR_CLICK = 8;

// Load all images
function loadImages(callback) {
    console.log('loadImages called');

    fetch('/public/json/image-list.json')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            console.log('JSON loaded:', data.images.length, 'images');

            var loadedCount = 0;
            var totalImages = data.images.length;

            data.images.forEach(function(imageData) {
                var img = new Image();
                var specialGifIds = [5865, 6850, 8913, 6922];
                if (specialGifIds.includes(imageData.num)) {
                    img.src = '/images/images_24x24/' + imageData.num + '.gif';
                } else {
                    img.src = '/images/images_24x24/' + imageData.num + '.png';
                }

                img.onload = function() {
                    loadedCount++;
                    if (loadedCount % 500 === 0) {
                        console.log('Loaded ' + loadedCount + '/' + totalImages);
                        drawGrid();
                    }
                    if (loadedCount === totalImages) {
                        console.log('All images loaded!');
                        drawGrid();
                    }
                };

                img.onerror = function() {
                    loadedCount++;
                };

                characterImages.push({
                    num: imageData.num,
                    img: img
                });
            });

            console.log('Started loading', characterImages.length, 'images');
            if (callback) callback();
        })
        .catch(function(error) {
            console.error('Error loading JSON:', error);
        });
}

// Clamp pan to prevent panning past borders
function clampPan() {
    const gridDisplayWidth = gridWidth * zoom;
    const gridDisplayHeight = gridHeight * zoom;

    // Never show outside the grid - grid must always fill screen
    // Top-left: can't pan past 0
    panX = Math.min(0, panX);
    panY = Math.min(0, panY);

    // Bottom-right: grid must fill entire canvas
    panX = Math.max(canvas.width - gridDisplayWidth, panX);
    panY = Math.max(canvas.height - gridDisplayHeight, panY);
}

// Load data and initialize
function init() {
    console.log('init() called');

    canvas = document.getElementById('grid-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    ctx = canvas.getContext('2d');
    console.log('Got canvas context');

    // Set canvas size (both internal buffer AND CSS display size)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    console.log('Canvas size:', canvas.width, 'x', canvas.height);

    // Fill with yellow immediately
    ctx.fillStyle = '#c3ff00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('Filled canvas with yellow');

    // Load images
    loadImages(function() {
        console.log('Images array has', characterImages.length, 'entries');

        // Calculate grid dimensions
        var rows = Math.ceil(characterImages.length / cols);
        gridWidth = cols * (characterSize + gridSpacing);
        gridHeight = rows * (characterSize + gridSpacing);
        console.log('Grid dimensions:', gridWidth, 'x', gridHeight);

        // Position the grid initially - start at top-left to show character #1
        panX = 0;
        panY = 0;

        clampPan();

        // Draw initial grid
        drawGrid();

        // Setup event listeners
        setupEventListeners();
    });
}

function setupEventListeners() {

        // Mouse wheel zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Zoom towards mouse position
            panX = mouseX - (mouseX - panX) * zoomFactor;
            panY = mouseY - (mouseY - panY) * zoomFactor;
            zoom *= zoomFactor;

            // Clamp zoom - minimum zoom must fit grid in canvas
            const minZoom = Math.max(
                canvas.width / gridWidth,
                canvas.height / gridHeight
            );
            zoom = Math.max(minZoom, Math.min(50, zoom));

            clampPan();
            drawGrid();
        });

        // Mouse down - start dragging
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            dragStartPanX = panX;
            dragStartPanY = panY;
            dragDistance = 0;
        });

        // Mouse move - pan
        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - dragStartX;
                const dy = e.clientY - dragStartY;
                dragDistance = Math.sqrt(dx * dx + dy * dy);

                panX = dragStartPanX + dx;
                panY = dragStartPanY + dy;
                clampPan();
                drawGrid();
            }
        });

        // Mouse up - stop dragging
        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Click detection
        canvas.addEventListener('click', handleCanvasClick);

        // Draw initial grid
        drawGrid();
        
        // Auto-redraw as images load
        console.log('Setting up image load watchers...');
        const checkInterval = setInterval(() => {
            let allLoaded = true;
            for (const charData of characterImages) {
                if (!charData.img || !charData.img.complete) {
                    allLoaded = false;
                    break;
                }
            }
            drawGrid(); // Continuously redraw as images load
            if (allLoaded) {
                clearInterval(checkInterval);
                console.log('All images loaded, stopping auto-redraw');
            }
        }, 100);

        // Wire up control buttons
        const btnZoomIn = document.getElementById('btn-zoom-in');
        const btnZoomOut = document.getElementById('btn-zoom-out');
        const btnFullscreen = document.getElementById('btn-fullscreen');
        const btnReset = document.getElementById('btn-reset');

        if (btnZoomIn) btnZoomIn.addEventListener('click', zoomIn);
        if (btnZoomOut) btnZoomOut.addEventListener('click', zoomOut);
        if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullScreen);
        if (btnReset) btnReset.addEventListener('click', resetView);

        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            drawGrid();
        });

    console.log('Grid viewer initialized successfully');
}

function drawGrid() {
    if (!ctx) return;

    // Fill with yellow background
    ctx.fillStyle = '#c3ff00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (characterImages.length === 0) return;

    // Disable image smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;

    // Save and transform
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    // Draw images
    for (var i = 0; i < characterImages.length; i++) {
        var row = Math.floor(i / cols);
        var col = i % cols;
        var x = col * (characterSize + gridSpacing);
        var y = row * (characterSize + gridSpacing);

        var charData = characterImages[i];

        if (charData.img && charData.img.complete && charData.img.naturalHeight > 0) {
            ctx.drawImage(charData.img, x, y, characterSize, characterSize);
        }
    }

    ctx.restore();
}

function handleCanvasClick(e) {
    // Only allow clicks if zoomed in enough and didn't drag
    if (!isDragging && dragDistance < 5 && zoom >= MIN_ZOOM_FOR_CLICK) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Convert screen coords to canvas coords
        const canvasX = (x - panX) / zoom;
        const canvasY = (y - panY) / zoom;

        // Find which character was clicked
        const col = Math.floor(canvasX / (characterSize + gridSpacing));
        const row = Math.floor(canvasY / (characterSize + gridSpacing));
        const characterIndex = row * cols + col;

        if (characterIndex >= 0 && characterIndex < characterImages.length) {
            const characterNum = characterImages[characterIndex].num;
            // Force navigation to break out of iframe
            try {
                window.top.location.replace(`./cryptophunks-details.html?id=${characterNum}`);
            } catch (e) {
                // Fallback if top window is restricted
                window.location.href = `./cryptophunks-details.html?id=${characterNum}`;
            }
        }
    }
}

function zoomIn() {
    zoom *= 1.2;
    zoom = Math.min(50, zoom);
    clampPan();
    drawGrid();
}

function zoomOut() {
    zoom /= 1.2;
    const minZoom = Math.max(
        canvas.width / gridWidth,
        canvas.height / gridHeight
    );
    zoom = Math.max(minZoom, zoom);
    clampPan();
    drawGrid();
}

function resetView() {
    panX = 0;
    panY = 0;
    zoom = 1;
    clampPan();
    drawGrid();
}

function toggleFullScreen() {
    isFullScreen = !isFullScreen;
    const infoDiv = document.getElementById('fullscreen-info');

    if (isFullScreen) {
        // Send message to parent to expand iframe
        window.parent.postMessage('toggleFullscreen', '*');

        // Show fullscreen info
        if (infoDiv) {
            infoDiv.classList.add('show');
        }

        // Wait for iframe to expand, then resize canvas
        setTimeout(() => {
            // Use the full viewport dimensions
            canvas.width = window.innerWidth || document.documentElement.clientWidth;
            canvas.height = window.innerHeight || document.documentElement.clientHeight;

            // Start at 2x zoom in fullscreen, centered
            zoom = 2;
            panX = (canvas.width - gridWidth * zoom) / 2;
            panY = (canvas.height - gridHeight * zoom) / 2;

            clampPan();
            drawGrid();
        }, 150);
    } else {
        // Send message to parent to collapse iframe
        window.parent.postMessage('toggleFullscreen', '*');

        // Reset canvas to original size
        canvas.width = 1024;
        canvas.height = 320;

        // Reset zoom to 2x and center
        zoom = 2;
        panX = (canvas.width - gridWidth * zoom) / 2;
        panY = (canvas.height - gridHeight * zoom) / 2;

        // Hide fullscreen info
        if (infoDiv) {
            infoDiv.classList.remove('show');
        }

        clampPan();
        drawGrid();
    }
}

// Handle ESC key to exit fullscreen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullScreen) {
        toggleFullScreen();
    }
});

// Initialize on page load
window.addEventListener('load', init);

