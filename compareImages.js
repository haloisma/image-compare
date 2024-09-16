import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const img1Path = "../image-compare-1/image1.png"; // Path to your first image
const img2Path = "../image-compare-1/image2.png"; // Path to your second image
const diffPath = "../image-compare-1/diff.png"; // Path to save the diff image

// Read the two images
const img1 = PNG.sync.read(fs.readFileSync(img1Path));
const img2 = PNG.sync.read(fs.readFileSync(img2Path));

// Create an empty image for the diff output
const { width, height } = img1;
const diff = new PNG({ width, height });

// Compare the images
const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {
  threshold: 0.7, // Adjust sensitivity
});

// Write the diff image to disk
fs.writeFileSync(diffPath, PNG.sync.write(diff));

console.log(`Number of differing pixels: ${pixelDiff}`);
