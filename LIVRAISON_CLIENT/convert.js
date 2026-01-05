const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Dimensions réseaux sociaux
const FORMATS = {
    'instagram': { width: 1080, height: 1080 },
    'linkedin': { width: 1080, height: 1080 },
    'facebook': { width: 1200, height: 630 },
    'story': { width: 1080, height: 1920 },
    'carousel': { width: 1080, height: 1350 }
};

async function htmlToImage(htmlPath, outputPath, format = 'instagram') {
    const dimensions = FORMATS[format] || FORMATS['instagram'];

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: {
            width: dimensions.width,
            height: dimensions.height
        },
        deviceScaleFactor: 2 // Retina quality
    });

    const page = await context.newPage();

    // Load HTML file
    const absolutePath = path.resolve(htmlPath);
    await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle' });

    // IMPORTANT: Wait for Tailwind CSS to compile and apply styles
    await page.waitForTimeout(2000);
    
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Screenshot
    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: {
            x: 0,
            y: 0,
            width: dimensions.width,
            height: dimensions.height
        }
    });

    await browser.close();
    console.log(`✅ ${path.basename(outputPath)} (${dimensions.width}x${dimensions.height})`);
}

async function convertAll(inputDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.html'));
    
    console.log(`\n🚀 Converting ${files.length} files...\n`);
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.html', '.png'));
        await htmlToImage(inputPath, outputPath, 'instagram');
    }
    
    console.log(`\n✨ Done! Images saved in: ${outputDir}\n`);
}

// CLI usage
const args = process.argv.slice(2);

if (args[0] === '--all') {
    // Convert all HTML files in exports folder
    const exportsDir = path.join(__dirname, 'exports');
    const imagesDir = path.join(__dirname, 'images');
    convertAll(exportsDir, imagesDir);
} else if (args.length >= 2) {
    // Single file conversion
    const [input, output, format] = args;
    htmlToImage(input, output, format || 'instagram');
} else {
    console.log(`
Usage:
  node convert.js --all                          Convert all HTML in exports/ folder
  node convert.js <input.html> <output.png>      Convert single file

Formats: instagram, linkedin, facebook, story, carousel
    `);
}
