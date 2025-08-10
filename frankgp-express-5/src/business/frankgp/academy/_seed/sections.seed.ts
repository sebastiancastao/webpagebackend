import { AppDataSource } from "../../../../config/typeOrmConfig";
import dataWhatsapp from "./section-api/sections.data.whatsapp.json";
import dataAws from "./section-devops/sections.data.aws.json";
import dataAzure from "./section-devops/sections.data.azure.json";
import dataCpanel from "./section-devops/sections.data.cpanel.json";
import dataCloudflare from "./section-system/sections.data.cloudflare.json";
import dataN8n from "./section-automatizacion/sections.data.n8n.json";
import dataWindows from "./section-system/sections.data.windows.json";
import dataSpringboot from "./section-dev/sections.data.springboot.json";
import dataFlutter from "./section-mobile/sections.data.flutter.json";
import { SectionEntity } from "../dtos-entities/section.entity";
import { CourseEntity } from "../dtos-entities/course.entity";

// sections.data.springboot

export const seedAcademySection = async () => {
  const sectionRepo = AppDataSource.getRepository(SectionEntity);
  const courseRepo = AppDataSource.getRepository(CourseEntity);

  const count = await sectionRepo.count();

  if (count === 0) {
    const allData = [
      // devops
      ...dataAws,
      ...dataAzure,
      ...dataCpanel,
      // mobile
      ...dataFlutter,
      // dev
      ...dataWhatsapp,
      ...dataSpringboot,
      // system
      ...dataCloudflare,
      ...dataN8n,
      ...dataWindows,
      //
    ];

    for (const item of allData) {
      const course = await courseRepo.findOneBy({ id: item.courseId });

      if (!course) {
        console.warn(`⚠️ Course with id ${item.courseId} not found. Skipping section "${item.titleSection}"`);
        continue;
      }

      const section = sectionRepo.create({
        slug: item.slug,
        titleSection: item.titleSection,
        sectionOrder: item.sectionOrder,
        course,
        lessons: item.lessons || [],
      });

      await sectionRepo.save(section);
    }

    console.info("🌱 SectionSeeder seed complete ✅");
  } else {
    console.info("ℹ️ SectionSeeder table already has data. Seed skipped.");
  }
};
