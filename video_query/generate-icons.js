const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Simple function to create a basic icon without external dependencies
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#646cff';
  ctx.fillRect(0, 0, size, size);
  
  // Rounded corners
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.125);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  
  // Video icon
  ctx.fillStyle = 'white';
  const margin = size * 0.2;
  const iconSize = size - 2 * margin;
  
  // Play button triangle
  ctx.beginPath();
  ctx.moveTo(margin + iconSize * 0.3, margin + iconSize * 0.25);
  ctx.lineTo(margin + iconSize * 0.7, margin + iconSize * 0.5);
  ctx.lineTo(margin + iconSize * 0.3, margin + iconSize * 0.75);
  ctx.closePath();
  ctx.fill();
  
  return canvas.toBuffer('image/png');
}

// Generate icons for different sizes
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
  const iconBuffer = createIcon(size);
  fs.writeFileSync(`icon${size}.png`, iconBuffer);
  console.log(`Generated icon${size}.png`);
}); 