const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf8');
const oorOns = fs.readFileSync('oor-ons.html', 'utf8');

const getScript = (html) => {
    const start = html.lastIndexOf('<script>');
    const end = html.lastIndexOf('</script>');
    return html.substring(start, end);
};

const script1 = getScript(index);
const script2 = getScript(oorOns);

const cleanScript = (script) => {
    return script.replace(/const translations = \{[\s\S]*?\};\s*let currentLang/, 'let currentLang');
};

fs.writeFileSync('script1.txt', cleanScript(script1));
fs.writeFileSync('script2.txt', cleanScript(script2));
