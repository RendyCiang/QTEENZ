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
      {
        name: "Nasi",
        photo:
          "https://thumb.viva.id/vivabanyuwangi/375x211/2025/01/30/679b1f079f5eb-ilustrasi-nasi-uduk_banyuwangi.jpg",
      },
      {
        name: "Mie",
        photo:
          "https://asset.kompas.com/crops/BvPhGzWukG5xusEE-VZ1mJ9eg7c=/16x430:734x908/1200x800/data/photo/2019/12/08/5deca39d32512.png",
      },
      {
        name: "Roti",
        photo: "https://www.fomac.co.id/uploads/images/blog/Roti.jpg",
      },
      {
        name: "Sup",
        photo:
          "https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-2-1200.jpg",
      },
      {
        name: "Gorengan",
        photo:
          "https://cdn.grid.id/crop/0x0:0x0/700x465/photo/2021/09/26/tips-masak-cepat-untuk-pemula-20210926042132.jpg",
      },
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }
  } catch (error) {}
}
