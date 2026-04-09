const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract translations
    const match = content.match(/const translations = (\{[\s\S]*?\});\s*let currentLang/);
    if (!match) {
        console.log('No translations found in ' + file);
        continue;
    }
    const translationsObj = match[1];
    
    // Find the start of the bottom script
    const scriptStart = content.lastIndexOf('<script>');
    const scriptEnd = content.lastIndexOf('</script>') + 9;
    
    // Replace the bottom script with window.pageTranslations
    const newScript = `<script>\n        window.pageTranslations = ${translationsObj};\n    </script>`;
    content = content.substring(0, scriptStart) + newScript + content.substring(scriptEnd);
    
    // Add app.js to head if not there
    if (!content.includes('app.js')) {
        content = content.replace('</head>', '    <script src="app.js" defer></script>\n</head>');
    }
    
    fs.writeFileSync(file, content);
    console.log('Refactored ' + file);
}
