import { Repository } from "typeorm";
import { LessonEntity } from "./dtos-entities/lesson.entity";
import { AppDataSource } from "../../../config/typeOrmConfig";
import { SectionEntity } from "./dtos-entities/section.entity";

export class LessonService {
  private repo: Repository<LessonEntity> = AppDataSource.getRepository(LessonEntity);
  private sectionRepo: Repository<SectionEntity> = AppDataSource.getRepository(SectionEntity);

  async create(data: { labelLesson: string; descriptionLesson: string; sectionId: number; lessonOrder?: number }) {
    const section = await this.sectionRepo.findOneByOrFail({ id: data.sectionId });

    const lesson = this.repo.create({
      labelLesson: data.labelLesson,
      descriptionLesson: data.descriptionLesson,
      lessonOrder: data.lessonOrder || 1,
      section,
    });

    return await this.repo.save(lesson);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async findSlug(slug: string) {
    return await this.repo.findOne({
      where: { slug },
    });
  }

  async findBySection(sectionId: number) {
    return await this.repo.find({
      where: { section: { id: sectionId } },
      order: { lessonOrder: "ASC" },
      relations: ["section"],
    });
  }

  async update(id: number, data: Partial<{ labelLesson: string; descriptionLesson: string; lessonOrder: number }>) {
    const lesson = await this.repo.findOneByOrFail({ id });

    this.repo.merge(lesson, data);
    return await this.repo.save(lesson);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: "Lesson deleted successfully" };
  }
}
