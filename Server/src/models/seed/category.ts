import { prisma } from "../../config/config";

export async function seedCategory() {
  try {
    const categories = [
      {
        name: "Makanan",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC1pGhW7_BRwnGuBguLE99tfA0faYflekCA&shttps://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1280px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
      },
      {
        name: "Minuman",
        photo:
          "https://static.vecteezy.com/system/resources/thumbnails/040/174/391/small/ai-generated-pictures-of-delicious-and-beautiful-drinks-photo.jpg",
      },
      {
        name: "Snacks",
        photo:
          "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-various-snack-food-and-snack-foods-image_2908848.jpg",
      },
      {
        name: "Desert",
        photo:
          "https://i.pinimg.com/736x/e8/bb/fe/e8bbfef4616d2bbee9a9f0cd3f35ded5.jpg",
      },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }
  } catch (error) {}
}
