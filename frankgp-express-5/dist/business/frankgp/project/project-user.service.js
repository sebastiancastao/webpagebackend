"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUserService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const user_entity_1 = require("./entities/user.entity");
class ProjectUserService {
    repoProjectUser = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.ProjectUserEntity);
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
    findOne(id) {
        return this.repoProjectUser.findOneBy({ id });
    }
    findUsername(username) {
        return this.repoProjectUser.findOneBy({ username });
    }
    create(data) {
        return this.repoProjectUser.save(data);
    }
    update(id, data) {
        return this.repoProjectUser.update(id, data);
    }
    remove(id) {
        return this.repoProjectUser.delete(id);
    }
}
exports.ProjectUserService = ProjectUserService;
//# sourceMappingURL=project-user.service.js.map