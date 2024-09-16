const fs = require("fs");
const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

// Paths to the images you want to compare
const img1Path = "image1.png"; // Replace with your image paths
const img2Path = "image2.png";
const diffPath = "diff.png"; // Path where the diff will be saved

// Read images
const img1 = PNG.sync.read(fs.readFileSync(img1Path));
const img2 = PNG.sync.read(fs.readFileSync(img2Path));

// Create an empty image for the diff
const { width, height } = img1;
const diff = new PNG({ width, height });

// Compare the images
const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {
  threshold: 0.1, // Sensitivity threshold
});

// Save the diff image
fs.writeFileSync(diffPath, PNG.sync.write(diff));

console.log(`Number of differing pixels: ${pixelDiff}`);
