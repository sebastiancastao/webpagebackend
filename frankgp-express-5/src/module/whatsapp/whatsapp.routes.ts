// src/module/whatsapp/whatsapp.routes.ts

import { Router } from "express";
import { WebhookController } from "./webhook.controller";
import { WhatsappController } from "./whatsapp.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { SenderController } from "./whatsapp-sender.controller";

const router = Router();

const webhook = new WebhookController();
const whatsapp = new WhatsappController();
const sender = new SenderController();

router.get("/webhook", asyncHandler(webhook.verify.bind(webhook)));
router.post("/webhook", asyncHandler(webhook.receive.bind(webhook)));

router.get("/messages", asyncHandler(whatsapp.getAll.bind(whatsapp)));
router.get("/messages/getById/:id", asyncHandler(whatsapp.getById.bind(whatsapp)));
router.get("/messages/WHATSAPP_ID/:id", asyncHandler(whatsapp.getMessageByWHATSAPP_ID.bind(whatsapp)));
router.get("/messages/entry_id/:entry_id", asyncHandler(whatsapp.getByEntryId.bind(whatsapp)));


router.post("/messages/send", asyncHandler(sender.sendMessage.bind(sender)));

export default router;
