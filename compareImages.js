import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

// Get the pageName from the command-line arguments
const pageName = process.argv[2];

if (!pageName) {
  console.error("Please provide a page name as an argument.");
  process.exit(1);
}

// Helper function to get a formatted timestamp
function getFormattedTimestamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct the URL based on the page name
  const url = "https://www." + pageName;

  // Generate the timestamped file name (timestamp first)
  const timestamp = getFormattedTimestamp();
  const screenshotPath = `screens/${pageName}/${timestamp}_screenshot.png`;

  // Navigate to the web page
  await page.goto(url);

  // Set the viewport to a specific resolution
  await page.setViewport({
    width: 1920, // Customize this to the desired width
    height: 1080, // Customize this to the desired height
    deviceScaleFactor: 1, // Ensures the image is captured at the same resolution
  });

  // Ensure the directory exists
  await ensureDirectoryExists(screenshotPath);

  // Capture the screenshot with the timestamp at the beginning of the file name
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved as ${screenshotPath}`);

  // Close the browser
  await browser.close();
})();

// Helper function to ensure directory exists
async function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
}
