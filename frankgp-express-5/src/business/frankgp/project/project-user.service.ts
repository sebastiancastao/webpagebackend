import { AppDataSource } from "../../../config/typeOrmConfig";
import { ProjectUserEntity } from "./entities/user.entity";

export class ProjectUserService {
  private repoProjectUser = AppDataSource.getRepository(ProjectUserEntity);

  async findAll() {
    const results = await this.repoProjectUser.find({
      order: {
        order: "ASC", // o 'DESC' si quieres descendente
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

  findOne(id: number) {
    return this.repoProjectUser.findOneBy({ id });
  }

  findUsername(username: string) {
    return this.repoProjectUser.findOneBy({ username });
  }

  create(data: Partial<ProjectUserEntity>) {
    return this.repoProjectUser.save(data);
  }

  update(id: number, data: Partial<ProjectUserEntity>) {
    return this.repoProjectUser.update(id, data);
  }

  remove(id: number) {
    return this.repoProjectUser.delete(id);
  }
}
