import { AppDataSource } from "../config/typeOrmConfig";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dto";
import { selectUserEntity } from "./utils/selectUserEntity";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";

export class UsersSQLService {
  // private repo: Repository<UserEntity>;
  private repo: Repository<any>;

  constructor() {
    // this.repo = AppDataSource.getRepository(UserEntity);
    this.repo = AppDataSource.getRepository(selectUserEntity());
  }

  async findAll() {
    const results = await this.repo.find();
    return {
      page: 1,
      totalPages: 1,
      totalItems: 1,
      hasMore: false,
      results,
    };
  }

  async findOne(id: string) {
    return await this.repo.findOneBy({ _id: id });
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashedPassword });
    return await this.repo.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ _id: id });
    if (!user) return null;

    // Si se envía un nuevo password, lo encriptamos
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return await this.repo.save(user);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
