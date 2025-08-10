import { AppDataSource } from "../../config/typeOrmConfig";
import { Repository, Between, ILike } from "typeorm";
import { ShortenerEntity } from "./entities/shortener.entity";
import { nanoid } from "nanoid";
import { ShortenerVisitEntity } from "./entities/shortener-visit.entity";
import { FindAllParams } from "./interfaces/IShortener";

export class ShortenerService {
  private repo: Repository<ShortenerEntity>;
  private visitRepo: Repository<ShortenerVisitEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(ShortenerEntity);
    this.visitRepo = AppDataSource.getRepository(ShortenerVisitEntity);
  }

  async findAll(): Promise<ShortenerEntity[]> {
    return await this.repo.find();
  }

  async findAllSelect(): Promise<ShortenerEntity[]> {
    return await this.repo.find({
      select: ["backHalf", "destination"],
    });
  }

  async findAllFilter(params: FindAllParams = {}) {
    const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = params;

    const query = this.repo.createQueryBuilder("shortener").leftJoinAndSelect("shortener.visits", "visit");

    if (search) {
      query.andWhere("LOWER(shortener.backHalf) LIKE :search", {
        search: `%${search.toLowerCase()}%`,
      });
    }

    // Obtener todos los resultados
    const [results] = await query.getManyAndCount();

    const fromDate = dateVisitFrom ? new Date(dateVisitFrom) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const toDate = dateVisitTo ? new Date(dateVisitTo) : new Date();

    const filteredResults = results.map((shortener) => {
      let filteredVisits = shortener.visits ?? [];

      filteredVisits = filteredVisits.filter((v) => {
        const visitedAt = new Date(v.visitedAt);
        return visitedAt >= fromDate && visitedAt <= toDate;
      });

      return {
        ...shortener,
        visits: filteredVisits,
        visitCount: filteredVisits.length,
      };
    });

    // Ordenar si se solicitó
    if (sortVisitCount === "ASC") {
      filteredResults.sort((a, b) => a.visitCount - b.visitCount);
    } else if (sortVisitCount === "DESC") {
      filteredResults.sort((a, b) => b.visitCount - a.visitCount);
    }

    // 👇 Si page o limit no vienen definidos, devolver todo
    if (!page || !limit) {
      return {
        page: 1,
        totalPages: 1,
        totalItems: filteredResults.length,
        hasMore: false,
        results: filteredResults,
      };
    }

    const skip = (page - 1) * limit;
    const paginatedResults = filteredResults.slice(skip, skip + limit);

    return {
      page,
      totalPages: Math.ceil(filteredResults.length / limit),
      totalItems: filteredResults.length,
      hasMore: page * limit < filteredResults.length,
      results: paginatedResults,
    };
  }

  async create(destination: string, backHalf?: string): Promise<ShortenerEntity> {
    const backHalfResult = backHalf || nanoid(6);

    // Verificar si ya existe ese código
    const exists = await this.repo.findOneBy({ backHalf: backHalfResult });
    if (exists) {
      throw new Error("Short code already in use");
    }

    const short = this.repo.create({ backHalf: backHalfResult, destination });
    return await this.repo.save(short);
  }

  async findByCode(code: string): Promise<ShortenerEntity | null> {
    return await this.repo.findOneBy({ backHalf: code });
  }

  async findOne(id: number): Promise<ShortenerEntity | null> {
    return await this.repo.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }

  async update(id: number, data: Partial<{ destination: string; backHalf: string }>): Promise<ShortenerEntity | null> {
    const record = await this.repo.findOneBy({ id });
    if (!record) return null;

    // Si el código personalizado cambia, verificar si ya existe
    if (data.backHalf && data.backHalf !== record.backHalf) {
      const exists = await this.repo.findOneBy({ backHalf: data.backHalf });
      if (exists) throw new Error("Custom code already in use");
      record.backHalf = data.backHalf;
    }

    if (data.destination) {
      record.destination = data.destination;
    }

    return await this.repo.save(record);
  }

  async registerVisit(shortenerId: number, data: Partial<ShortenerVisitEntity>) {
    const visit = this.visitRepo.create({ ...data, shortenerId });
    return this.visitRepo.save(visit);
  }
}
