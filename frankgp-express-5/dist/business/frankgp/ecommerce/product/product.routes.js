"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new product_controller_1.ProductController();
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/findSlug/:slug", (0, asyncHandler_1.asyncHandler)(controller.findSlug.bind(controller)));
router.patch("/update/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=product.routes.js.map