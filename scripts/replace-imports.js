const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(e => {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(fp);
    } else if (fp.endsWith('.ts') || fp.endsWith('.tsx')) {
      const content = fs.readFileSync(fp, 'utf8');
      const updated = content.replace(/@\/features\//g, '@/modules/');
      if (content !== updated) {
        fs.writeFileSync(fp, updated, 'utf8');
        console.log('Updated: ' + fp);
      }
    }
  });
}

walk('src');
console.log('Done!');
