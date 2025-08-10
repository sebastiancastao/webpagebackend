// src/modules/wardrobe/wardrobe.seeder.ts

import { AppDataSource } from "../../../config/typeOrmConfig";
import { WardrobeUserEntity } from "../../ivanaapps/wardrobe-user/entities/user-wardrobe.entity";
import dataWardrobeFrank from "./wardrobe.data.frank.json";
import dataWardrobeIvana from "./wardrobe.data.ivana.json";
import bcrypt from "bcryptjs";

export async function seedWardrobes() {
  const hashedPass = async (password: string) => await bcrypt.hash(password, 10);

  const usersDemos = [
    {
      name: "Administrador 123",
      email: "admin@gmail.com",
      username: "admin123",
      role: "admin",
      password: await hashedPass("admin@gmail.com"),
      isPublic: false,
      wardrobes: [
        {
          name: "Armario de verano",
          slug: "armario-de-verano",
          description: "Ropa ligera y fresca para el verano",
        },
      ],
    },
    {
      name: "Usuario 123",
      email: "user@gmail.com",
      username: "user123",
      role: "user",
      password: await hashedPass("user@gmail.com"),
      isPublic: false,
      wardrobes: [
        {
          name: "Armario de verano",
          slug: "armario-de-verano",
          description: "Ropa ligera y fresca para el verano",
        },
        {
          name: "Armario de invierno",
          slug: "armario-de-invierno",
          description: "Ropa ligera y fresca para el invierno",
        },
      ],
    },
  ];

  const userRepo = AppDataSource.getRepository(WardrobeUserEntity);

  const exist = await userRepo.find();

  const dataWardrobe = [dataWardrobeFrank, dataWardrobeIvana, ...usersDemos];

  if (exist.length === 0) {
    const user = userRepo.create(dataWardrobe);
    await userRepo.save(user);
    console.info(`✅ Insertado: ${dataWardrobe}`);
  } else {
    console.info(`⚠️ seedWardrobes: Seed skipped.`);
  }

  console.info("🌱 Seeder de wardrobes completado.");
}
