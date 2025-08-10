import { AppDataSource } from "../../../config/typeOrmConfig";
import { ProjectEntity } from "./entities/project.entity";

export class ProjectService {
  private projectRepo = AppDataSource.getRepository(ProjectEntity);

  async create(data: Partial<ProjectEntity>) {
    const newProject = this.projectRepo.create(data);
    return await this.projectRepo.save(newProject);
  }

  async findAll() {
    // return await this.projectRepo.find({
    //   // relations: ["images", "buttons", "languages", "content", "content.features", "content.dates", "content.collaborators", "content.technologies"],
    // });
    // sort desc by id
    const results = await this.projectRepo.find({
      order: {
        id: "DESC",
      },
    });
    return {
      page: 1,
      totalPages: 1,
      totalItems: 1,
      hasMore: false,
      results,
    };
  }

  async findOne(id: number) {
    return await this.projectRepo.findOne({
      where: { id },
      // relations: [
      //   "images",
      //   "buttons",
      //   "languages",
      //   "content",
      //   "content.features",
      //   "content.dates",
      //   "content.collaborators",
      //   "content.technologies",
      // ],
    });
  }

  async findOneBySlug(slug: string) {
    return await this.projectRepo.findOne({
      where: { slug },
      // relaciones si necesitas
      // relations: [...]
    });
  }

  async update(id: number, data: Partial<ProjectEntity>) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) return null;
    this.projectRepo.merge(project, data);
    return await this.projectRepo.save(project);
  }

  async remove(id: number) {
    const result = await this.projectRepo.delete(id);
    return result.affected ? true : false;
  }
}
