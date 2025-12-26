const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load the HTML file
    await page.goto(`file://${path.resolve('exports/logo_white_gen.html')}`);

    // Wait for image to load
    await page.waitForLoadState('networkidle');

    // Select the image element
    const element = await page.$('img');

    // Screenshot only the element with transparent background
    await element.screenshot({
        path: 'img/logo_white.png',
        omitBackground: true
    });

    await browser.close();
    console.log('White logo generated: img/logo_white.png');
})();
