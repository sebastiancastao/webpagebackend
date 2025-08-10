// src/app.ts
import "reflect-metadata";

// 🌐 Core imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import passport from "passport";

// 🛠️ Middleware y utilidades
import { morganLogger } from "./utils/morganLogger";
import { asyncHandler } from "./utils/asyncHandler";
import { errorHandler } from "./middleware/error.middleware";
import { countVisitMiddleware } from "./middleware/visit.middleware";
import { setupFrontendFallback } from "./utils/setupFrontendFallback";
import { ENABLE_FRONTEND } from "./config/envs";

// 📦 Rutas: Core funcionalidad
import { ShortenerController } from "./module/shortener/shortener.controller";
import academyRoutes from "./business/frankgp/academy/academy.index.routes";
import AuthRoutes from "./auth/_index.routes";
import EmailRoutes from "./module/mail/email.routes";
import infoRoutes from "./module/info/info.routes";
import optionsRoutes from "./module/options/options.routes";
import productRoutes from "./business/frankgp/ecommerce/product/product.routes";
import projectRoutes from "./business/frankgp/project/index.routes";
import shortenerRoutes from "./module/shortener/index.routes";
import StatRoutes from "./module/stat/index.routes";
import visitRoutes from "./module/visit/visit.routes";
import whatsappRoutes from "./module/whatsapp/whatsapp.routes";

// 🧪 Otros (DB, Seed)
import databaseRoutes from "./module/database/database.routes";
import mongooseRoutes from "./module/database/mongoose/mongoose.routes";

// 👗 IvanaApps
import IvanaAppsRoutes from "./business/ivanaapps/_ivanaapps.routes";

// 🍽️ Restaurant
import RestaurantRoutes from "./business/systered/food/_restautant.routes";

// 👨‍💻 Systered
import ContributionRoutes from "./business/systered/contributions/_contributions.routes";

// 🚀 Inicialización de app
const app = express();

// 🧾 Logging y CORS
app.use(morganLogger);
app.use(cors());

// ⚠️ Webhook con raw body parser
app.use(
  "/api/whatsapp/webhook",
  bodyParser.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

// 🧠 Sesiones y JSON parser
app.use(
  session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(countVisitMiddleware);

// 📂 Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 🔐 Passport
app.use(passport.initialize());
app.use(passport.session());

// 🚏 Rutas API Modules
app.use("/api", AuthRoutes);
app.use("/api", IvanaAppsRoutes);
app.use("/api", RestaurantRoutes);
app.use("/api", ContributionRoutes);

// 🚏 Rutas API
app.use("/api/email", EmailRoutes);
app.use("/api/shortener", shortenerRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/options", optionsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stat", StatRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/product", productRoutes);
app.use("/api/academy", academyRoutes);

// 🧪 Base de datos y seed
app.use("/api/db", databaseRoutes);
app.use("/api/mongoose", mongooseRoutes);

// 🔁 Redirección pública
app.get("/:code", asyncHandler(new ShortenerController().redirect));

// 🌐 Frontend fallback (SPA)
if (ENABLE_FRONTEND) {
  const clientBuildPath = path.join(__dirname, "../../frankgp-dist/frontend");
  setupFrontendFallback(app, clientBuildPath);
}

// ❌ Manejo global de errores
app.use(errorHandler);

export default app;
