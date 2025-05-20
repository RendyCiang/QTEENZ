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
          "https://www.dapurkobe.co.id/wp-content/uploads/ayam-goreng-lengkuas.jpg",
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
          "https://www.dapurkobe.co.id/wp-content/uploads/nasi-goreng-kencur-kemangi.jpg",
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
          "https://static01.nyt.com/images/2024/11/21/multimedia/ML-Mie-Goreng-Mee-Goreng-Indonesian-Fried-Noodlesrex-mvhk/ML-Mie-Goreng-Mee-Goreng-Indonesian-Fried-Noodlesrex-mvhk-googleFourByThree.jpg",
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
          "https://static.republika.co.id/uploads/member/images/news/240607073248-607.jpg",
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
          "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/03/09062214/X-Manfaat-Es-Jeruk-dan-Resep-untuk-Membuatnya.jpg",
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
          "https://cdn.rri.co.id/berita/Takengon/o/1717123848169-IMG_7383/nos50gadq67gvfd.jpeg",
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
          "https://cdn0-production-images-kly.akamaized.net/cfXbEcohW3dIxyqQrnWssLGOHzk=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4218315/original/084401600_1667880147-shutterstock_2219753371.jpg",
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
          "https://cdn.grid.id/crop/0x0:0x0/x/photo/2022/10/11/gulalijpg-20221011121911.jpg",
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
          "https://asset-2.tstatic.net/bali/foto/bank/images/coklat_20180425_164815.jpg",
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
          "https://asset.kompas.com/crops/V1rGgCf8U84591Qze_xvImEKzfM=/73x13:890x558/1200x800/data/photo/2023/01/03/63b3c67e48d29.jpg",
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
          "https://blog.tokowahab.com/wp-content/uploads/2021/11/Resep-Caramel-Pudding-yang-Lembut-dan-Praktis.-Simak-di-Blog.Tokowahab.com_.png",
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
          "https://schoolnightvegan.com/wp-content/uploads/2022/11/vegan-apple-pie-25.jpg",
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
  } catch (error) {}
}
