const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Get current UTC timestamp in YYYYMMDDHHMMSS format
const now = new Date();
const year = now.getUTCFullYear();
const month = String(now.getUTCMonth() + 1).padStart(2, '0');
const day = String(now.getUTCDate()).padStart(2, '0');
const hours = String(now.getUTCHours()).padStart(2, '0');
const minutes = String(now.getUTCMinutes()).padStart(2, '0');
const seconds = String(now.getUTCSeconds()).padStart(2, '0');

const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

// Generate version string
const version = `1.1.${timestamp}`;

console.log(`Building with version: ${version}`);

// Copy and process index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/Version [^<]+/, `Version ${version}`);
fs.writeFileSync(path.join(distDir, 'index.html'), indexContent);

// Copy styles.css
fs.copyFileSync(
    path.join(__dirname, 'styles.css'),
    path.join(distDir, 'styles.css')
);

// Copy script.js
fs.copyFileSync(
    path.join(__dirname, 'script.js'),
    path.join(distDir, 'script.js')
);

console.log('Build complete! Files copied to dist/');
console.log(`Version: ${version} (UTC)`);
