// Minimal esbuild-based TypeScript transpile without type-checking
// Compiles all .ts files under src/ to dist/ preserving folder structure

const { build } = require('esbuild');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const outDir = path.join(projectRoot, 'dist');

/**
 * Recursively collect .ts files, excluding .d.ts
 */
function collectTypeScriptFiles(directory) {
  /** @type {string[]} */
  const result = [];
  const stack = [directory];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        if (fullPath.endsWith('.ts') && !fullPath.endsWith('.d.ts')) {
          result.push(fullPath);
        }
      }
    }
  }
  return result;
}

async function main() {
  const entryPoints = collectTypeScriptFiles(srcDir);
  if (entryPoints.length === 0) {
    console.error('No TypeScript files found under src/.');
    process.exit(1);
  }

  await build({
    entryPoints,
    outdir: outDir,
    outbase: srcDir,
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    target: ['node22'],
    tsconfig: path.join(projectRoot, 'tsconfig.json'),
    logLevel: 'info',
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


