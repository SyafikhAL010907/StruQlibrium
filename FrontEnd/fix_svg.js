const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const levels = ['easy', 'medium', 'hard'];
const basePath = path.join(__dirname, 'src/app/battlefield/(level)');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');

  // Regex replacement for SVG attributes: find attributes like x={val}, cx={val}, rx={val}, etc.
  // And wrap in ?? 0
  
  // Actually, let's just use string replace for Action 2
  // We'll let the previous fix (isMounted) handle the bulk, and apply ?? 0 to the explicit example provided and highly prone elements as best effort, or we can use Babel if installed.
}

levels.forEach(level => {
  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(basePath, level, i.toString(), 'page.tsx');
    fixFile(filePath);
  }
});
