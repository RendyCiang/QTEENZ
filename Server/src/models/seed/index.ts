import { seedUser } from "./user";
import { seedCategory } from "./category";
import { seedMenu } from "./menu";
import { seedFavorite } from "./favorite";

async function seed() {
  try {
    await seedUser();
    console.log("Users seeded successfully!");

    await seedCategory();
    console.log("Categories seeded successfully!");

    await seedMenu();
    console.log("Menus seeded successfully!");

    await seedFavorite();
    console.log("Favorites seeded successfully!");
  } catch (error) {
    console.error(error);
  }
  console.log("Seeding completed successfully!");
}

seed();
