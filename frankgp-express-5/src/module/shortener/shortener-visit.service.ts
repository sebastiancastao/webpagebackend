// src/module/shortener/shortener-visit.service.ts
import ShortenerVisit from "./models/shortener-visit.model";

export class ShortenerVisitService {
  async findAll() {
    return await ShortenerVisit.find().sort({ visitedAt: -1 }).populate("shortenerId");
  }

  async findByShortenerId(shortenerId: string) {
    return await ShortenerVisit.find({ shortenerId }).sort({ visitedAt: -1 });
  }
}
