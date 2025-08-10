import bcrypt from "bcryptjs";
import { AppDataSource } from "../../config/typeOrmConfig";
import { UserEntity } from "../entities/user.entity";
import { UserRoleEnum } from "../enum/roles.enum";
import userModel from "../models/user.model";

interface IUserData {
  name: string;
  username?: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  photo?: string;
  sendMail?: boolean;
  isVisible?: boolean;
}

const hashedPass = async (password: string) => await bcrypt.hash(password, 10);

// Datos base
const getUsers = async (): Promise<IUserData[]> => {
  const baseUsers: IUserData[] = [
    {
      name: "User Tester",
      username: "user",
      email: "user@gmail.com",
      password: await hashedPass("user@gmail.com"),
      role: UserRoleEnum.USER,
    },
    {
      name: "Admin Tester",
      email: "admin@gmail.com",
      username: "admin",
      password: await hashedPass("admin@gmail.com"),
      role: UserRoleEnum.ADMIN,
    },
  ];

  const emailAdmin = process.env.SUPER_ADMIN_MAIL_SEED;
  const passAdmin = process.env.SUPER_ADMIN_PASS_SEED;

  if (emailAdmin && passAdmin) {
    console.info("🔑 Admin credentials found in environment variables");
    baseUsers.push({
      name: "SUPERADMIN",
      username: "superadmin",
      email: emailAdmin,
      password: await hashedPass(passAdmin),
      role: UserRoleEnum.SUPERADMIN,
      photo: "https://i.postimg.cc/GmddyvS1/icon-user.webp",
      sendMail: false,
      isVisible: true,
    });
  }

  return baseUsers;
};

// Seeder MongoDB
export const seedUserMongoDB = async () => {
  try {
    const users = await getUsers();

    for (const user of users) {
      const exists = await userModel.findOne({ email: user.email });
      if (!exists) {
        await userModel.create(user);
        console.info(`✅ [MongoDB] Seeded: ${user.email}`);
      } else {
        console.info(`ℹ️ [MongoDB] Already exists: ${user.email}`);
      }
    }

    console.info("🎉 [MongoDB] User seeding completed");
  } catch (error) {
    console.error("❌ [MongoDB] Error seeding users:", error);
  }
};

// Seeder SQL
export const seedUserSQL = async () => {
  try {
    const users = await getUsers();

    const userRepository = AppDataSource.getRepository(UserEntity);
    for (const user of users) {
      const exists = await userRepository.findOneBy({ email: user.email });
      if (!exists) {
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
        console.info(`✅ [SQL] Seeded: ${user.email}`);
      } else {
        console.info(`ℹ️ [SQL] Already exists: ${user.email}`);
      }
    }

    console.info("🎉 [SQL] User seeding completed");
  } catch (error) {
    console.error("❌ [SQL] Error seeding users:", error);
  }
};
