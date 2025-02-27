import { prisma } from "../../config/config";

export async function seedCategory() {
  try {
    const categories = [
      {
        name: "Makanan",
      },
      {
        name: "Minuman",
      },
      {
        name: "Snacks",
      },
      {
        name: "Desert",
      },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }
    console.log("Seeding completed succcessfully!");
  } catch (error) {
    console.log(error);
  }
}
