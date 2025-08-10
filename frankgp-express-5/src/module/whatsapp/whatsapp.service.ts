// src/module/whatsapp/whatsapp.service.ts

import { AppDataSource } from "../../config/typeOrmConfig";
import { WhatsappMessageEntity } from "./entities/whatsapp-message.entity"; // Asegúrate de importar correctamente

export class WhatsappService {
  private repo = AppDataSource.getRepository(WhatsappMessageEntity);

  // Guarda o actualiza un mensaje entrante
  async saveOrUpdateMessage(data: Partial<WhatsappMessageEntity>) {
    const existing = await this.repo.findOneBy({ messages_id: data.messages_id });

    if (existing) {
      this.repo.merge(existing, data);
      return await this.repo.save(existing);
    }

    const newMessage = this.repo.create(data);
    return await this.repo.save(newMessage);
  }

  // Actualiza el estado del mensaje por messages_id
  async updateStatusByMessageId(messageId: string, data: Partial<WhatsappMessageEntity>) {
    const existing = await this.repo.findOneBy({ messages_id: messageId });

    if (!existing) {
      // Si no existe, decidimos si crear uno nuevo
      const newMessage = this.repo.create({ ...data, messages_id: messageId });
      return await this.repo.save(newMessage);
    }

    this.repo.merge(existing, data);
    return await this.repo.save(existing);
  }

  // Obtiene todos los mensajes ordenados por fecha
  async getAllMessages() {
    return await this.repo.find({ order: { createdAt: "DESC" } });
  }

  // Obtiene un mensaje por ID
  async getMessageById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async getMessageByWHATSAPP_ID(WHATSAPP_ID: string) {
    return await this.repo.findBy({ WHATSAPP_ID });
  }

  async getMessagesByEntryId(entryId: string) {
    return await this.repo.find({
      where: { entry_id: entryId },
      order: { createdAt: "DESC" },
    });
  }
}
