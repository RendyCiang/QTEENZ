import { prisma } from "../../config/config";

export async function seedFavorite() {
  try {
    const buyer = await prisma.buyer.findMany({
      select: {
        id: true,
      },
    });

    const menu = await prisma.menu.findMany({
      select: {
        id: true,
      },
    });

    const favorite = [
      {
        buyerId: buyer[0].id,
        menuId: menu[0].id,
      },
      {
        buyerId: buyer[0].id,
        menuId: menu[1].id,
      },
      {
        buyerId: buyer[0].id,
        menuId: menu[2].id,
      },
      {
        buyerId: buyer[1].id,
        menuId: menu[3].id,
      },
      {
        buyerId: buyer[1].id,
        menuId: menu[4].id,
      },
      {
        buyerId: buyer[1].id,
        menuId: menu[5].id,
      },
      {
        buyerId: buyer[2].id,
        menuId: menu[6].id,
      },
      {
        buyerId: buyer[2].id,
        menuId: menu[7].id,
      },
      {
        buyerId: buyer[2].id,
        menuId: menu[8].id,
      },
    ];
    for (const fav of favorite) {
      await prisma.favoriteBuyer.create({
        data: fav,
      });
    }
  } catch (error) {}
}
