const fs = require('fs');
const path = require('path');

const levels = ['easy', 'medium', 'hard'];
const basePath = path.join(__dirname, 'src/app/battlefield/(level)');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let hasChanges = false;

  // Action 1: Add useState and isMounted logic
  if (!content.includes('const [isMounted')) {
    // Add useState to react import
    content = content.replace(/import React, {([^}]*?)}(.*?)'react';/, (match, p1, p2) => {
      if (p1.includes('useState')) return match;
      return `import React, { ${p1.trim()}, useState }${p2}'react';`;
    });

    // If it only has `import React from 'react';`, fix that
    if (!content.includes('useState')) {
        content = content.replace(/import React from 'react';/, "import React, { useState } from 'react';");
    }

    // Inject isMounted into component body
    const compRegex = /export default function Mission[A-Z0-9]+\(\) \{/;
    content = content.replace(compRegex, match => {
      return `${match}
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);`;
    });
    hasChanges = true;
  }

  // Action 3: Wrap portal with isMounted
  const portalRegex = /\{typeof document !== 'undefined'/g;
  if (content.match(portalRegex) && !content.includes('{isMounted && typeof document')) {
    content = content.replace(portalRegex, "{isMounted && typeof document !== 'undefined'");
    hasChanges = true;
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${filePath}`);
  }
}

levels.forEach(level => {
  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(basePath, level, i.toString(), 'page.tsx');
    fixFile(filePath);
  }
});

console.log('All files processed.');
