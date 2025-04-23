import { seedUser } from "./user";
import { seedCategory } from "./category";
import { seedMenu } from "./menu";
import { seedFavorite } from "./favorite";
import { seedRequest } from "./request";
import { seedOrder } from "./Order";

async function seed() {
  try {
    await seedRequest();
    console.log("Request seeded successfully!");

    await seedUser();
    console.log("Users seeded successfully!");

    await seedCategory();
    console.log("Categories seeded successfully!");

    await seedMenu();
    console.log("Menus seeded successfully!");

    await seedFavorite();
    console.log("Favorites seeded successfully!");

    // await seedRequest();
    // console.log("Requests seeded successfully!");

    // await seedOrder();
    // console.log("Orders seeded successfully!");
  } catch (error) {
    console.error(error);
  }
  console.log("Seeding completed successfully!");
}

seed();
