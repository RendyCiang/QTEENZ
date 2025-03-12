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
        description: "Ayam goreng yang renyah",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[0].id,
        menuVariants: {
          create: [
            {
              name: "Paha",
              price: 10000,
              stock: 10,
            },
            {
              name: "Dada",
              price: 12000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Nasi Goreng",
        description: "Nasi goreng yang enak",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[1].id,
        menuVariants: {
          create: [
            {
              name: "Biasa",
              price: 12000,
              stock: 10,
            },
            {
              name: "Spesial",
              price: 15000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Mie Goreng",
        description: "Mie goreng yang lezat",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[0].id,
        vendorId: vendor[2].id,
        menuVariants: {
          create: [
            {
              name: "Biasa",
              price: 10000,
              stock: 10,
            },
            {
              name: "Spesial",
              price: 12000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Es Teh",
        description: "Teh mas",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[0].id,
        menuVariants: {
          create: [
            {
              name: "Manis",
              price: 5000,
              stock: 10,
            },
            {
              name: "Tawar",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Es Jeruk",
        description: "Jeruknya mas",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[1].id,
        menuVariants: {
          create: [
            {
              name: "Manis",
              price: 5000,
              stock: 10,
            },
            {
              name: "Tawar",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Kopi",
        description: "Ngopi biar kuat ngoding",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[1].id,
        vendorId: vendor[2].id,
        menuVariants: {
          create: [
            {
              name: "Manis",
              price: 5000,
              stock: 10,
            },
            {
              name: "Tawar",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Keripik",
        description: "Keripik Singkong ga tu",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[2].id,
        vendorId: vendor[0].id,
        menuVariants: {
          create: [
            {
              name: "Pedas",
              price: 5000,
              stock: 10,
            },
            {
              name: "Asin",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Permen",
        description: "Permen permen apa yang enak",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[2].id,
        vendorId: vendor[1].id,
        menuVariants: {
          create: [
            {
              name: "Manis",
              price: 5000,
              stock: 10,
            },
            {
              name: "Asin",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Coklat",
        description: "Coklat yang manis",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[2].id,
        vendorId: vendor[2].id,
        menuVariants: {
          create: [
            {
              name: "Manis",
              price: 5000,
              stock: 10,
            },
            {
              name: "Pahit",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Es Krim",
        description: "Es krim yang enak",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[3].id,
        vendorId: vendor[0].id,
        menuVariants: {
          create: [
            {
              name: "Vanilla",
              price: 5000,
              stock: 10,
            },
            {
              name: "Coklat",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Pudding",
        description: "Pudding yang lembut",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[3].id,
        vendorId: vendor[1].id,
        menuVariants: {
          create: [
            {
              name: "Vanilla",
              price: 5000,
              stock: 10,
            },
            {
              name: "Coklat",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
      {
        name: "Pie",
        description: "Pie yang enak",
        photo:
          "https://i.pinimg.com/736x/ba/1d/37/ba1d3778a33091a234236774a78151e7.jpg",
        categoryId: categories[3].id,
        vendorId: vendor[0].id,
        menuVariants: {
          create: [
            {
              name: "Apel",
              price: 5000,
              stock: 10,
            },
            {
              name: "Coklat",
              price: 4000,
              stock: 10,
            },
          ],
        },
      },
    ];

    for (const menu of menus) {
      await prisma.menu.create({
        data: menu,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
