const puppeteer = require("puppeteer");

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the web page
  await page.goto("https://www.google.com.uy/");

  // Set the viewport to a specific resolution
  await page.setViewport({
    width: 1920, // Customize this to the desired width
    height: 1080, // Customize this to the desired height
    deviceScaleFactor: 1, // Ensures the image is captured at the same resolution
  });

  // Capture the screenshot
  await page.screenshot({ path: "webpage.png", fullPage: true });

  console.log("Screenshot saved as webpage.png");

  // Close the browser
  await browser.close();
})();
