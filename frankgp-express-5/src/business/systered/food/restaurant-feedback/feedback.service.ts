// src/module/feedback/feedback.service.ts
import { AppDataSource } from "../../../../config/typeOrmConfig";
import { RestaurantFeedbackEntity } from "./entities/feedback.entity";

export class FeedbackService {
  static repo = AppDataSource.getRepository(RestaurantFeedbackEntity);

  static async create(body: Partial<RestaurantFeedbackEntity>) {
    const clientCode = Math.floor(10000 + Math.random() * 90000).toString();
    const createdAt = new Date();

    const data = {
      ...body,
      socialMediaSource: Array.isArray(body.socialMediaSource)
        ? body.socialMediaSource.join(",")
        : body.socialMediaSource,
      clientCode,
      createdAt,
    };

    const exp = this.repo.create(data);
    const saved = await this.repo.save(exp);

    // Enviar a Google Sheets
    const values: string[][] = [
      [
        saved.name,
        saved.email,
        saved.whatsapp,
        saved.birthday,
        saved.howDidYouKnowUs,
        saved.socialMediaSource || "",
        saved.branchVisited,
        saved.waiterName || "",
        saved.experienceRating.toString(),
        saved.improvementSuggestions || "",
        saved.clientCode,
        saved.createdAt.toLocaleString("sv-SE", { timeZone: "America/Lima" }),
      ],
    ];

    try {
      // await GoogleSheetService.appendToSheet(values);
    } catch (err) {
      console.error("❌ Error al enviar a Google Sheets:", err);
    }

    // Enviar correo con feedback
    try {
      // const emailService = new EmailService();
      // await emailService.sendFeedbackEmail(saved);
    } catch (err) {
      console.error("❌ Error al enviar correo de feedback:", err);
    }

    return saved;
  }

  static async findAll() {
    return await this.repo.find();
  }

  static async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  static async update(id: number, data: Partial<RestaurantFeedbackEntity>) {
    const record = await this.repo.findOneBy({ id });
    if (!record) return null;
    this.repo.merge(record, data);
    return await this.repo.save(record);
  }

  static async remove(id: number) {
    const result = await this.repo.delete(id);
    return result.affected === 1;
  }
}
