import { AppDataSource } from "../../../../config/typeOrmConfig";
import { ContributionUserEntity } from "../entities/UserEntity";
import { UserRoleEnum } from "../../../../auth/enum/roles.enum";
import bcrypt from "bcryptjs";

export async function seedContributionUsers() {
  const userRepo = AppDataSource.getRepository(ContributionUserEntity);

  // console.log("🌱 Iniciando seed de Contribution Users...");

  // Evitar duplicados si ya existen usuarios
  const existing = await userRepo.count();
  if (existing > 0) {
    console.log(`⚠️ Ya existen ${existing} usuarios, omitiendo seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash("password123", 10);

  const users = userRepo.create([
    {
      _id: "083d01ae-5f1b-44c7-802c-a3dbb1b78a89",
      username: "admin",
      name: "Admin",
      lastName: "Principal",
      email: "admin@example.com",
      whatsapp: "+573001112233",
      password: passwordHash,
      role: UserRoleEnum.SUPERADMIN,
      displayName: "Admin Principal",
    },
    {
      username: "juanperez",
      name: "Juan",
      lastName: "Pérez",
      email: "juan@example.com",
      whatsapp: "+573002223344",
      password: passwordHash,
      role: UserRoleEnum.USER,
      displayName: "Juan Pérez",
    },
    {
      username: "maria",
      name: "María",
      lastName: "Gómez",
      email: "maria@example.com",
      whatsapp: "+573003334455",
      password: passwordHash,
      role: UserRoleEnum.USER,
      displayName: "María Gómez",
    },
  ]);

  await userRepo.save(users);

  console.log("🌱 contributionUsersSeeder seed complete ✅");
}
