const fs = require("fs");
const path = require("path");

// Función para limpiar HTML
function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

// Función para generar slug
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Rutas
const inputPath = path.join(__dirname, "original.json");
const outputDir = path.join(__dirname, "categories");

// Asegurar que la carpeta 'categories/' exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Leer JSON original
const raw = fs.readFileSync(inputPath, "utf8");
const input = JSON.parse(raw);

// Agrupar por categoría
const grouped = {};

input.forEach((item) => {
  const category = item.category_label || "Uncategorized";
  if (!grouped[category]) {
    grouped[category] = {
      name: category,
      slug: slugify(category),
      menus: [],
    };
  }

  grouped[category].menus.push({
    name: item.label,
    slug: slugify(item.label),
    price: parseFloat(item.price),
    description: stripHtml(item.description || ""),
    images: item.image ? Object.values(item.image) : [],
  });
});

// Escribir cada categoría en su propio archivo dentro de /categories
for (const category of Object.values(grouped)) {
  const fileName = `${category.slug}.json`;
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, JSON.stringify(category, null, 2), "utf8");
  console.info(`✅ Archivo creado: categories/${fileName}`);
}
