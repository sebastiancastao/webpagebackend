import { Repository } from "typeorm";
import { SectionEntity } from "./dtos-entities/section.entity";
import { AppDataSource } from "../../../config/typeOrmConfig";
import { CourseEntity } from "./dtos-entities/course.entity";

export class SectionService {
  private repo: Repository<SectionEntity> = AppDataSource.getRepository(SectionEntity);
  private courseRepo: Repository<CourseEntity> = AppDataSource.getRepository(CourseEntity);

  async create(data: { titleSection: string; courseId: number; sectionOrder?: number }) {
    const course = await this.courseRepo.findOneByOrFail({ id: data.courseId });

    const section = this.repo.create({
      titleSection: data.titleSection,
      sectionOrder: data.sectionOrder || 1,
      course,
    });

    return await this.repo.save(section);
  }

  async findAll() {
    return await this.repo.find({ relations: ["course"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["course"],
    });
  }

  async findByCourse(courseId: number) {
    return await this.repo.find({
      where: { course: { id: courseId } },
      order: { sectionOrder: "ASC" },
      relations: ["course"],
    });
  }

  async update(id: number, data: Partial<{ title: string; sectionOrder: number }>) {
    const section = await this.repo.findOneByOrFail({ id });

    this.repo.merge(section, data);
    return await this.repo.save(section);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: "Section deleted successfully" };
  }
}
