import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

// Path to the file where the counter will be stored
const counterFilePath = "./counter.txt";

function readCounter() {
  if (fs.existsSync(counterFilePath)) {
    const counter = parseInt(fs.readFileSync(counterFilePath, "utf8"), 10);
    return isNaN(counter) ? 1 : counter;
  } else {
    return 1; // If the file doesn't exist, start from 1
  }
}

// Function to save the updated counter back to the file
function saveCounter(counter) {
  fs.writeFileSync(counterFilePath, counter.toString(), "utf8");
}

// Get the current counter value
let diffCounter = readCounter();

// Function to generate a unique file name with an incremental counter
function generateFileNameWithCounter(basePath, extension) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Replace : and . to avoid issues in filenames
  return `${basePath}_${timestamp}_${diffCounter}${extension}`;
}

const img1Path = "../image-compare-1/images_input_pixelmatch/image1.png"; // Path to your first image
const img2Path = "../image-compare-1/images_input_pixelmatch/image2.png"; // Path to your second image
const diffPath = generateFileNameWithCounter(
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

// Increment the counter and save it to the file
diffCounter++;
saveCounter(diffCounter);

console.log(`Number of differing pixels: ${pixelDiff}`);
console.log(`Diff file saved as: ${diffPath}`);
