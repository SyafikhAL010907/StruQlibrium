const fs = require('fs');
const file = './src/app/UjiKompetensi/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    return `className="${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}"`;
});
content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    return `className={\`${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}\`}`;
});
content = content.replace(/className=\{'([^']+)'\}/g, (match, p1) => {
    return `className={'${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}'}`;
});

fs.writeFileSync(file, content, 'utf8');
console.log('done');
