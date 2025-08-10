import { static as expressStatic, Express } from "express";
import path from "path";
import fs from "fs";

export function setupFrontendFallback(app: Express, clientBuildPath: string) {
  if (!fs.existsSync(clientBuildPath)) {
    console.warn(`[setupFrontendFallback] WARNING: Build path not found: ${clientBuildPath}`);
    return;
  }

  // Servir archivos estáticos
  app.use(expressStatic(clientBuildPath));

  // Fallback para rutas del frontend que no coincidan con una API
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}
