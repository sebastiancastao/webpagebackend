const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, ".."); // /restaurant-express
const distPath = path.resolve(rootPath, "../frankgp-dist"); // fuera del proyecto

const distSrcPath = path.join(distPath, "dist");

// 1. Eliminar carpeta dist dentro de frankgp-dist
if (fs.existsSync(distSrcPath)) {
  fs.rmSync(distSrcPath, { recursive: true, force: true });
  console.info("🧹 'frankgp-dist/dist' folder removed.");
} else {
  console.info("ℹ️ No 'dist' folder to remove in frankgp-dist/");
}

// 2. Eliminar archivos package.json y .gitignore si existen
const filesToDelete = ["package.json", ".gitignore"];
for (const file of filesToDelete) {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
    console.info(`🗑️ Removed '${file}' from frankgp-dist/`);
  }
}

// 3. Asegurar que dist folder existe para la compilación
fs.mkdirSync(distSrcPath, { recursive: true });

// 4. Copiar .gitignore
const gitignoreSrc = path.join(rootPath, ".gitignore");
const gitignoreDest = path.join(distPath, ".gitignore");

if (fs.existsSync(gitignoreSrc)) {
  fs.copyFileSync(gitignoreSrc, gitignoreDest);
  console.info("📄 .gitignore copied to frankgp-dist/");
} else {
  console.warn("⚠️ .gitignore not found in root.");
}

// 5. Copiar package.json sin devDependencies
const pkgSrc = path.join(rootPath, "package.json");
const pkgDest = path.join(distPath, "package.json");

if (fs.existsSync(pkgSrc)) {
  const pkg = JSON.parse(fs.readFileSync(pkgSrc, "utf8"));
  delete pkg.devDependencies;

  fs.writeFileSync(pkgDest, JSON.stringify(pkg, null, 2));
  console.info("📦 package.json copied to frankgp-dist/ (without devDependencies)");
} else {
  console.warn("⚠️ package.json not found in root.");
}

console.info("✅ Done.");
