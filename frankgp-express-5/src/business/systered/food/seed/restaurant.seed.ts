// import { AppDataSource } from "@/config/typeOrmConfig";
import { AppDataSource } from "../../../../config/typeOrmConfig";
import tablesSede1 from "./data/tables/tables-sede1.json";
import usersSede1 from "./data/users/users-sede1.json";
import usersSede2 from "./data/users/users-sede2.json";
import alCarbonData from "./data/categories/al-carbon.json";
import cervezasData from "./data/categories/cervezas.json";
import deLaTierritaData from "./data/categories/de-la-tierrita.json";
import laPescaData from "./data/categories/la-pesca.json";
import lasBurgersYMasData from "./data/categories/las-burgers-y-mas.json";
import losPremiumData from "./data/categories/los-premium.json";
import menuInfantilData from "./data/categories/menu-infantil.json";
import paAcompanarData from "./data/categories/pa-acompanar.json";
import paQueJarteData from "./data/categories/pa-que-jarte.json";
import paraArrancarData from "./data/categories/para-arrancar.json";
import pinchosData from "./data/categories/pinchos.json";
import platosDeLaCasaData from "./data/categories/platos-de-la-casa.json";
import puraBrasaData from "./data/categories/pura-brasa.json";
import puraLenaData from "./data/categories/pura-lena.json";
import { RestaurantEntity } from "../restaurant/entities/restaurant.entity";

export async function seedRestaurant() {
  const repo = AppDataSource.getRepository(RestaurantEntity);

  const existing = await repo.findOne({ where: {} });
  if (existing) return;

  const defaultMenuImage = "https://i.postimg.cc/nz2mV6Fv/demo.webp";
  // const defaultMenuVideo = "https://res.cloudinary.com/ddervgjb9/video/upload/v1752330029/videos/video1_r9cr1k.mp4";
  const defaultMenuVideo = "https://back.fgp.one/uploads/shorts/short-001.mp4";

  type RawMenu = {
    name: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    videos?: string[];
  };

  type RawCategory = {
    name: string;
    slug: string;
    order: number;
    thumbnail: string;
    menus: RawMenu[];
  };

  const rawCategories: RawCategory[] = [
    paraArrancarData,
    deLaTierritaData,
    puraLenaData,
    platosDeLaCasaData,
    alCarbonData,
    pinchosData,
    losPremiumData,
    menuInfantilData,
    lasBurgersYMasData,
    puraBrasaData,
    laPescaData,
    paAcompanarData,
    paQueJarteData,
    cervezasData,
  ];

  // Asignar imagen por defecto a cada menú si `images` está vacío
  const categories = rawCategories.map((cat) => ({
    ...cat,
    menus: cat.menus.map((menu) => ({
      ...menu,
      images: menu.images && menu.images.length > 0 ? menu.images : [defaultMenuImage],
      videos: menu.videos && menu.videos.length > 0 ? menu.videos : [defaultMenuVideo + "?slug=" + menu.slug],
      description: menu.description ? menu.description : "Sin descripción",
    })),
  }));

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d15839.803508778188!2d-73.057293!3d7.01506!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDAnNTQuMiJOIDczwrAwMycyNi4zIlc!5e0!3m2!1sen!2sus!4v1751072330402!5m2!1sen!2sus";

  const data = [
    {
      location: "📍La Españolita Km7 via Florida/Piedecuesta",
      slug: "la-espanolita",
      whatsapp: "3112113571",
      instagram: "https://instagram.com/sangilenacampestre",
      googleMapUrl,
      photos: [],
      categories,
      users: [...usersSede1],
      tables: [...tablesSede1],
    },
    {
      location: "📍Main Location San Gil – Road to Barichara",
      slug: "san-gil",
      whatsapp: "3101234567",
      instagram: "https://instagram.com/sangilenacampestre",
      googleMapUrl,
      photos: [],
      categories,
      users: [...usersSede2],
      tables: [...tablesSede1],
    },
  ];

  const records = data.map((entry) => repo.create(entry));
  await repo.save(records);

  console.info("✅ Restaurantes sembrados con usuarios demo");
}
