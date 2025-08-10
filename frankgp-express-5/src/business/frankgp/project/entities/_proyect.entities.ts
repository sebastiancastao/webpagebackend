// Project
import { CollaboratorEntity } from "./project-collaborator.entity";
import { ProjectDates } from "./project-dates.embeddable";
import { ProjectEntity } from "./project.entity";
import { ProjectImageEntity } from "./project-image.entity";
import { ProjectLinkEntity } from "./project-link.entity";
import { ProjectSkillEntity } from "./project-skill.entity";
import { ProjectUserEntity } from "./user.entity";
import { SkillUserEntity } from "./user-skill.entity";
import { TechnologyEntity } from "./project-technology.entity";
import { UserLinkEntity } from "./user-link.entity";

export const project_entities = [
  CollaboratorEntity,
  ProjectDates,
  ProjectEntity,
  ProjectImageEntity,
  ProjectLinkEntity,
  ProjectSkillEntity,
  ProjectUserEntity,
  SkillUserEntity,
  TechnologyEntity,
  UserLinkEntity,
];
