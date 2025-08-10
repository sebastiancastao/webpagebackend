import dotenv from "dotenv";
import { ENV_WHATSAPP } from "../../config/envs";
dotenv.config();

export class SenderService {
  private readonly baseUrl = ENV_WHATSAPP.API_BASE_URL;
  private readonly phoneNumberId = ENV_WHATSAPP.PHONE_NUMBER_ID;
  private readonly token = ENV_WHATSAPP.TOKEN;

  async sendTextMessage(to: string, body: string) {
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
