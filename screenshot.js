import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

// Get the pageName from the command-line arguments
const pageName = process.argv[2];

if (!pageName) {
  console.error('Please provide a page name as an argument.');
  process.exit(1);
}

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct the URL and file path based on the page name
  const url = 'https://www.' + pageName;
  const screenshotPath = `screens/${pageName}/screenshot.png`;

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

  // Capture the screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log("Screenshot saved as screenshot.png in the folder "+ screenshotPath );

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