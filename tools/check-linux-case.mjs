import fs from 'node:fs';
import path from 'node:path';

let errors = 0;

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        checkDir(full);
      }
    } else if (/\.(tsx?|mjs|jsx?|html|css)$/.test(file)) {
      const content = fs.readFileSync(full, 'utf8');
      const importRegex = /(?:from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"])/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const imp = match[1] || match[2];
        if (imp && imp.startsWith('.')) {
          const resolvedDir = path.dirname(full);
          const candidateBase = path.resolve(resolvedDir, imp);
          const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.json'];
          let found = false;
          let exactMatch = false;
          for (const ext of extensions) {
            const target = candidateBase + ext;
            if (fs.existsSync(target)) {
              found = true;
              const parentDir = path.dirname(target);
              const targetName = path.basename(target);
              const actualFiles = fs.readdirSync(parentDir);
              if (actualFiles.includes(targetName)) {
                exactMatch = true;
              } else {
                console.error(`CASE MISMATCH in ${full}: "${imp}" -> looked for "${targetName}", actual: ${actualFiles.filter(f => f.toLowerCase() === targetName.toLowerCase())}`);
                errors++;
              }
              break;
            }
          }
          if (!found) {
            console.error(`UNRESOLVED IMPORT in ${full}: "${imp}"`);
            errors++;
          }
        }
      }
    }
  }
}

checkDir(process.cwd());
if (errors === 0) {
  console.log('✓ All relative imports match exact case on filesystem (Linux safe)!');
} else {
  console.error(`Found ${errors} case or resolution errors!`);
  process.exit(1);
}
