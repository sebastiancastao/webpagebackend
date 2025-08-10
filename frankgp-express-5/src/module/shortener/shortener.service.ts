// src/module/shortener/shortener.service.ts
import Shortener from "./models/shortener.model";
import ShortenerVisit from "./models/shortener-visit.model";
import { nanoid } from "nanoid";
import { IShortenerVisit } from "./models/shortener-visit.model";
import { Types } from "mongoose";

export class ShortenerService {
  async findAll() {
    return await Shortener.find();
  }

  async findAllSelectBackup() {
    return await Shortener.find().select("backHalf destination -_id").sort({ destination: 1 });
  }

  async findAllFilter(params = {}) {
    const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = params as {
      page?: number;
      limit?: number;
      search?: string;
      dateVisitFrom?: string;
      dateVisitTo?: string;
      sortVisitCount?: "ASC" | "DESC";
    };

    const baseQuery: any = {};
    if (search) {
      baseQuery.backHalf = { $regex: search, $options: "i" };
    }

    const shorteners = await Shortener.find(baseQuery);

    const fromDate = dateVisitFrom ? new Date(dateVisitFrom) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const toDate = dateVisitTo ? new Date(dateVisitTo) : new Date();

    const results = await Promise.all(
      shorteners.map(async (short) => {
        const visits = await ShortenerVisit.find({
          shortenerId: short._id,
          visitedAt: { $gte: fromDate, $lte: toDate },
        });

        return {
          ...short.toObject(),
          visits,
          visitCount: visits.length,
        };
      })
    );

    // Ordenar
    if (sortVisitCount === "ASC") {
      results.sort((a, b) => a.visitCount - b.visitCount);
    } else if (sortVisitCount === "DESC") {
      results.sort((a, b) => b.visitCount - a.visitCount);
    }

    if (!page || !limit) {
      return {
        page: 1,
        totalPages: 1,
        totalItems: results.length,
        hasMore: false,
        results,
      };
    }

    const skip = (page - 1) * limit;
    const paginated = results.slice(skip, skip + limit);

    return {
      page,
      totalPages: Math.ceil(results.length / limit),
      totalItems: results.length,
      hasMore: page * limit < results.length,
      results: paginated,
    };
  }

  async create(destination: string, backHalf?: string) {
    const backHalfValue = backHalf || nanoid(6);

    const exists = await Shortener.findOne({ backHalf: backHalfValue });
    if (exists) throw new Error("Short code already in use");

    const short = new Shortener({ backHalf: backHalfValue, destination });
    return await short.save();
  }

  async findByCode(code: string) {
    return await Shortener.findOne({ backHalf: code });
  }

  async findOne(id: string) {
    return await Shortener.findById(id);
  }

  async update(id: string, data: Partial<{ destination: string; backHalf: string }>) {
    const record = await Shortener.findById(id);
    if (!record) return null;

    // Validar si el backHalf está en uso por otro documento
    if (data.backHalf && data.backHalf !== record.backHalf) {
      const exists = await Shortener.findOne({
        backHalf: data.backHalf,
        _id: { $ne: new Types.ObjectId(id) }, // ✅ excluir el actual
      });

      if (exists) throw new Error("Custom code already in use");
      record.backHalf = data.backHalf;
    }

    if (data.destination) {
      record.destination = data.destination;
    }

    return await record.save();
  }

  async remove(id: string) {
    const result = await Shortener.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }

  async registerVisit(shortenerId: string, data: Partial<IShortenerVisit>) {
    const visit = new ShortenerVisit({
      ...data,
      shortenerId: new Types.ObjectId(shortenerId),
      visitedAt: new Date(),
    });

    return await visit.save();
  }
}
