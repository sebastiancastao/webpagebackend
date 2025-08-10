// src/module/whatsapp/webhook.controller.ts

import { Request, Response } from "express";
import { WhatsappService } from "./whatsapp.service";
import { verifySignature } from "../../utils/verifySignature";
import { ENV_WHATSAPP } from "../../config/envs";
// import { WHATSAPP_VERIFY_TOKEN } from "../../config/envs";
export class WebhookController {
  private service = new WhatsappService();

  // Verifica el webhook de WhatsApp
  async verify(req: Request, res: Response) {
    const VERIFY_TOKEN = ENV_WHATSAPP.VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  // Recibe los mensajes de WhatsApp y los almacena
  async receive(req: Request, res: Response) {
    const signature = req.headers["x-hub-signature-256"] as string;
    const rawBody = (req as any).rawBody;
    const appSecret = process.env.WHATSAPP_APP_SECRET || "";

    // console.info({ signature, rawBody, appSecret });

    const isDev = process.env.DEV_MODE === "true";
    if (!isDev && !verifySignature(appSecret, rawBody, signature)) {
      console.warn("❌ Firma inválida. Posible intento de spoof.");
      return res.sendStatus(403);
    }

    const body = req.body;

    console.info("Incoming_webhook_payload =", JSON.stringify(body, null, 2));

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        const entryId = entry.id;

        for (const change of entry.changes) {
          const value = change.value;

          // 1. Procesar mensajes entrantes
          const message = value?.messages?.[0];
          const contact = value?.contacts?.[0];

          if (message && contact) {
            const whatsappId = contact.wa_id || value?.statuses?.[0]?.recipient_id;

            if (message.type === "reaction") {
              // Si es una reacción, actualizamos el mensaje existente
              const data = {
                entry_id: entryId,
                WHATSAPP_ID: whatsappId, // Asignamos el WHATSAPP_ID
                contacts_wa_id: contact.wa_id,
                contacts_name: contact.profile?.name || null,
                messages_from: message.from,
                messages_id: message.id,
                messages_timestamp: message.timestamp,
                messages_type: "reaction",
                reaction_emoji: message.reaction?.emoji || null,
              };

              await this.service.saveOrUpdateMessage(data);
            } else {
              // Procesamos un mensaje normal
              const data = {
                entry_id: entryId,
                WHATSAPP_ID: whatsappId, // Asignamos el WHATSAPP_ID
                contacts_wa_id: contact.wa_id,
                contacts_name: contact.profile?.name || null,
                messages_from: message.from,
                messages_id: message.id,
                messages_timestamp: message.timestamp,
                messages_body: message.text?.body || null,
                messages_type: message.type,
              };

              await this.service.saveOrUpdateMessage(data);
            }
          }

          // 2. Procesar actualizaciones de estado
          const statuses = value?.statuses;
          if (statuses && statuses.length > 0) {
            for (const status of statuses) {
              const data = {
                entry_id: entryId,
                WHATSAPP_ID: status.recipient_id || null, // Usamos recipient_id para el estado
                statuses_id: status.id,
                statuses_status: status.status,
                statuses_timestamp: status.timestamp,
                statuses_recipient_id: status.recipient_id || null,
                expiration_timestamp: status.conversation?.expiration_timestamp || null,
                pricing_billable: status.pricing?.billable?.toString() || null,
                pricing_category: status.pricing?.category || null,
              };

              await this.service.updateStatusByMessageId(status.id, data);
            }
          }
        }
      }
    }

    res.sendStatus(200);
  }
}
