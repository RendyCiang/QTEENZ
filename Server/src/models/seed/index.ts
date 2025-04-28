import { seedUser } from "./user";
import { seedCategory } from "./category";
import { seedMenu } from "./menu";
import { seedFavorite } from "./favorite";
import { seedRequest } from "./request";
import { seedOrder } from "./Order";

async function seed() {
  try {
    await seedRequest();

    await seedUser();

    await seedCategory();

    await seedMenu();

    await seedFavorite();

    // await seedRequest();

    // await seedOrder();
  } catch (error) {
    console.error(error);
  }
}

seed();
