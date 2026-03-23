const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    try {
        const list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = path.join(dir, file);
            try {
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) { 
                    results = results.concat(walk(file));
                } else { 
                    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
                        results.push(file);
                    }
                }
            } catch (e) {}
        });
    } catch (e) {}
    return results;
}

const files = walk('./src/app');
let modifiedCount = 0;
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        
        // Handle className="..."
        // Replace words ending with ! inside className
        content = content.replace(/className="([^"]+)"/g, (match, p1) => {
            return `className="${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}"`;
        });
        // Handle className={`...`}
        content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
            return `className={\`${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}\`}`;
        });
        // Handle className={'...'}
        content = content.replace(/className=\{'([^']+)'\}/g, (match, p1) => {
            return `className={'${p1.replace(/([a-zA-Z0-9_-\[\]:/]+)!/g, '$1')}'}`;
        });

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            modifiedCount++;
            console.log(`Cleaned: ${file}`);
        }
    } catch (e) {}
});
console.log(`Modified ${modifiedCount} files.`);
