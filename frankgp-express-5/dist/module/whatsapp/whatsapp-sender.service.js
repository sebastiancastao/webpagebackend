"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envs_1 = require("../../config/envs");
dotenv_1.default.config();
class SenderService {
    baseUrl = envs_1.ENV_WHATSAPP.API_BASE_URL;
    phoneNumberId = envs_1.ENV_WHATSAPP.PHONE_NUMBER_ID;
    token = envs_1.ENV_WHATSAPP.TOKEN;
    async sendTextMessage(to, body) {
        if (!this.baseUrl || !this.phoneNumberId || !this.token) {
            throw new Error("Faltan variables de entorno para WhatsApp API");
        }
        const url = `${this.baseUrl}/${this.phoneNumberId}/messages`;
        const payload = {
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body },
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error ${response.status}: ${errorBody}`);
        }
        return await response.json();
    }
}
exports.SenderService = SenderService;
//# sourceMappingURL=whatsapp-sender.service.js.map