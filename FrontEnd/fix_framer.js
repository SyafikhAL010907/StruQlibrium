const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src/app/battlefield/(level)');
const files = [
  'hard/1/page.tsx',
  'hard/2/page.tsx',
  'hard/3/page.tsx',
  'hard/4/page.tsx',
  'hard/5/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace:
  // initial={false}
  // animate={{ ... }}
  // WITH
  // initial={{ ... }}
  // animate={{ ... }}
  
  let newContent = content.replace(/initial=\{false\}\s+animate=(\{\{.*?\}\})/g, 'initial=$1\n            animate=$1');
  
  // For hard/3 where I changed motion.text:
  newContent = newContent.replace(/initial=\{false\}\s+animate=(\{\{ y: colH \/ 2 \}\})/g, 'initial=$1\n            animate=$1');
  
  fs.writeFileSync(filePath, newContent, 'utf-8');
});

console.log("Fixed initial prop in Framer Motion");
