import { AppDataSource } from "../../../config/typeOrmConfig";
import { CourseEntity } from "./dtos-entities/course.entity";
import { LessonEntity } from "./dtos-entities/lesson.entity";
import { CategoryEntity } from "./dtos-entities/category.entity";

export class CoursesService {
  private courseRepo = AppDataSource.getRepository(CourseEntity);
  private categoryRepo = AppDataSource.getRepository(CategoryEntity);
  private lessonRepo = AppDataSource.getRepository(LessonEntity);

  async create(data: Partial<CourseEntity> & { categoryName?: string }) {
    let category: CategoryEntity | null = null;

    if (data.categoryName) {
      category = await this.categoryRepo.findOneBy({ name: data.categoryName });

      if (!category) {
        category = this.categoryRepo.create({ name: data.categoryName });
        category = await this.categoryRepo.save(category);
      }
    }

    const course = this.courseRepo.create({
      ...data,
      category,
    });

    return await this.courseRepo.save(course);
  }

  async findAll() {
    return await this.courseRepo.find({
      relations: ["category", "sections", "sections.lessons"],
    });
  }

  async findOne(id: number) {
    return await this.courseRepo.findOne({
      where: { id },
      relations: ["category", "sections", "sections.lessons"],
    });
  }

  async findSlug(slug: string) {
    return await this.courseRepo.findOne({
      where: { slug },
      relations: ["category", "sections", "sections.lessons"],
    });
  }

  async update(id: number, data: Partial<CourseEntity> & { categoryName?: string }) {
    const course = await this.courseRepo.findOneBy({ id });

    if (!course) return null;

    if (data.categoryName) {
      let category = await this.categoryRepo.findOneBy({ name: data.categoryName });
      if (!category) {
        category = this.categoryRepo.create({ name: data.categoryName });
        category = await this.categoryRepo.save(category);
      }
      course.category = category;
    }

    this.courseRepo.merge(course, data);
    return await this.courseRepo.save(course);
  }

  async remove(id: number) {
    return await this.courseRepo.delete(id);
  }
}
