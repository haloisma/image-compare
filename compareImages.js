import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

// Function to generate a unique file name with a timestamp
function generateFileName(basePath, extension) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Replace : and . to avoid issues in filenames
  return `${basePath}_${timestamp}${extension}`;
}

const img1Path = "../image-compare-1/images_input_pixelmatch/image1.png"; // Path to your first image
const img2Path = "../image-compare-1/images_input_pixelmatch/image2.png"; // Path to your second image
const diffPath = generateFileName(
  "../image-compare-1/pixelmatch_results/diff",
  ".png"
); // Path to save the diff image

// Read the two images
const img1 = PNG.sync.read(fs.readFileSync(img1Path));
const img2 = PNG.sync.read(fs.readFileSync(img2Path));

// Create an empty image for the diff output
const { width, height } = img1;
const diff = new PNG({ width, height });

// Compare the images
const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {
  threshold: 0.1, // Adjust sensitivity
});

// Write the diff image to disk
fs.writeFileSync(diffPath, PNG.sync.write(diff));

console.log(`Number of differing pixels: ${pixelDiff}`);
console.log(`Diff file saved as: ${diffPath}`);
