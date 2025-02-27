import { prisma } from "../../config/config";

export async function seedMenu() {
  try {
    const vendor = await prisma.vendor.findMany({
      select: {
        id: true,
      },
    });

    const categories = await prisma.category.findMany({
      select: {
        id: true,
      },
    });

    const menus = [
      {
        name: "Ayam Goreng",
        price: 15000,
        description: "Ayam goreng yang renyah",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[0].id,
      },
      {
        name: "Nasi Goreng",
        price: 12000,
        description: "Nasi goreng yang enak",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[1].id,
      },
      {
        name: "Mie Goreng",
        price: 12000,
        description: "Mie goreng yang lezat",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[2].id,
      },
      {
        name: "Es Teh",
        price: 5000,
        description: "Teh mas",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[0].id,
      },
      {
        name: "Es Jeruk",
        price: 6000,
        description: "Jeruknya mas",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[1].id,
      },
      {
        name: "Kopi",
        price: 5000,
        description: "Ngopi biar kuat ngoding",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[2].id,
      },
      {
        name: "Keripik",
        price: 5000,
        description: "Keripik Singkong ga tu",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[2].id,
        vendorId: vendor[0].id,
      },
      {
        name: "Permen",
        price: 2000,
        description: "Permen permen apa yang enak",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[2].id,
        vendorId: vendor[1].id,
      },
      {
        name: "Coklat",
        price: 5000,
        description: "Coklat yang manis",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",

        categoryId: categories[2].id,
        vendorId: vendor[2].id,
      },
      {
        name: "Es Krim",
        price: 10000,
        description: "Es krim yang enak",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",

        categoryId: categories[3].id,
        vendorId: vendor[0].id,
      },
      {
        name: "Pudding",
        price: 8000,
        description: "Pudding yang lembut",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",

        categoryId: categories[3].id,
        vendorId: vendor[1].id,
      },
      {
        name: "Pie",
        price: 10000,
        description: "Pie yang enak",
        stock: 10,
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[3].id,
        vendorId: vendor[0].id,
      },
    ];

    for (const menu of menus) {
      await prisma.menu.create({
        data: menu,
      });
    }
    console.log("Seeding completed succcessfully!");
  } catch (error) {
    console.log(error);
  }
}
