const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function convertAllPosts() {
    const exportsDir = 'C:\\Users\\chad9\\Documents\\006.PAULA\\LIVRAISON_CLIENT\\exports';
    const imagesDir = 'C:\\Users\\chad9\\Documents\\006.PAULA\\LIVRAISON_CLIENT\\images';
    
    // Créer le dossier images s'il n'existe pas
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Lister tous les fichiers HTML
    const files = fs.readdirSync(exportsDir).filter(f => f.endsWith('.html'));
    
    console.log(`🔄 Conversion de ${files.length} fichiers HTML en PNG...\n`);
    
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1080, height: 1080 },
        deviceScaleFactor: 1
    });
    
    for (const file of files) {
        const htmlPath = path.join(exportsDir, file);
        const pngName = file.replace('.html', '.png');
        const pngPath = path.join(imagesDir, pngName);
        
        try {
            const page = await context.newPage();
            await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`);
            await page.waitForTimeout(500); // Attendre le chargement des fonts
            
            // Screenshot de l'élément principal (1080x1080)
            const element = await page.$('body > div');
            if (element) {
                await element.screenshot({ path: pngPath });
                console.log(`✅ ${pngName}`);
            } else {
                await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
                console.log(`✅ ${pngName} (full page)`);
            }
            
            await page.close();
        } catch (error) {
            console.log(`❌ ${file}: ${error.message}`);
        }
    }
    
    await browser.close();
    console.log(`\n🎉 Conversion terminée ! ${files.length} images dans ${imagesDir}`);
}

convertAllPosts();
