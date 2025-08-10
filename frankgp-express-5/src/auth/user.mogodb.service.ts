import bcrypt from "bcryptjs";
import User, { IUser } from "./models/user.model";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dto";

export class UsersMongoDBService {
  async findAll() {
    const results = await User.find();
    return {
      page: 1,
      totalPages: 1,
      totalItems: results.length,
      hasMore: false,
      results,
    };
  }

  async findOne(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User({ ...dto, password: hashedPassword });
    return await user.save();
  }

  async update(id: string, dto: UpdateUserDto): Promise<IUser | null> {
    const user = await User.findById(id);
    if (!user) return null;

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return await user.save();
  }

  async remove(id: string): Promise<boolean> {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}
