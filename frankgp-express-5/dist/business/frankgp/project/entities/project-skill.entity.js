"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSkillEntity = void 0;
const typeorm_1 = require("typeorm");
const project_collaborator_entity_1 = require("./project-collaborator.entity");
let ProjectSkillEntity = class ProjectSkillEntity {
    id;
    name;
    type;
    collaborators;
};
exports.ProjectSkillEntity = ProjectSkillEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectSkillEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectSkillEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectSkillEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => project_collaborator_entity_1.CollaboratorEntity, (collab) => collab.skillsUsed),
    __metadata("design:type", Array)
], ProjectSkillEntity.prototype, "collaborators", void 0);
exports.ProjectSkillEntity = ProjectSkillEntity = __decorate([
    (0, typeorm_1.Entity)("project_skill")
], ProjectSkillEntity);
//# sourceMappingURL=project-skill.entity.js.map