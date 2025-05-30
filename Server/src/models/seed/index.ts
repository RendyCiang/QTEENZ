import { seedUser } from "./user";
import { seedCategory } from "./category";
import { seedMenu } from "./menu";
import { seedFavorite } from "./favorite";
import { seedRequest } from "./request";
import { seedOrder } from "./Order";
import { seedReviews } from "./review";

async function seed() {
  try {
    // await seedRequest();
    // console.log("Request seeded successfully!");

    // await seedUser();
    // console.log("User seeded successfully!");

    // await seedCategory();
    // console.log("Category seeded successfully!");

    // await seedMenu();
    // console.log("Menu seeded successfully!");

    // await seedFavorite();
    // console.log("Favorite seeded successfully!");

    await seedOrder();
    console.log("Order seeded successfully!");

    await seedReviews();
    console.log("Reviews seeded successfully!");
  } catch (error) {
    console.error(error);
  }
}

seed();
