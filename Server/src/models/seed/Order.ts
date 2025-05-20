import { Status_Order } from "@prisma/client";
import { prisma } from "../../config/config";

export async function seedOrder() {
  try {
    const buyer = await prisma.buyer.findMany({
      select: {
        id: true,
      },
    });

    const vendor = await prisma.vendor.findMany({
      select: {
        id: true,
      },
    });

    const menuVariants = await prisma.menuVariant.findMany({
      select: {
        id: true,
        price: true,
        menuId: true,
      },
    });

    const orderItems = [
      {
        menuVariantId: menuVariants[0].id,
        quantity: 2,
        pricePerMenu: menuVariants[0].price,
        subtotalPerMenu: 2 * menuVariants[0].price,
      },
      {
        menuVariantId: menuVariants[6].id,
        quantity: 1,
        pricePerMenu: menuVariants[6].price,
        subtotalPerMenu: 1 * menuVariants[6].price,
      },
    ];
    const totalMenu = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.subtotalPerMenu,
      0
    );

    const orderData_One = {
      buyerId: buyer[0].id,
      status: Status_Order.Pending,
      total_menu: totalMenu,
      total_price: totalPrice,
      orderItem: {
        create: orderItems.map((item) => ({
          menuVariant: {
            connect: {
              id: item.menuVariantId,
            },
          },
          quantity: item.quantity,
          pricePerMenu: item.pricePerMenu,
          subtotalPerMenu: item.subtotalPerMenu,
        })),
      },
    };

    const orderData_Two = {
      buyerId: buyer[0].id,
      status: Status_Order.Accepted,
      total_menu: totalMenu,
      total_price: totalPrice,
      orderItem: {
        create: orderItems.map((item) => ({
          menuVariant: {
            connect: {
              id: item.menuVariantId,
            },
          },
          quantity: item.quantity,
          pricePerMenu: item.pricePerMenu,
          subtotalPerMenu: item.subtotalPerMenu,
        })),
      },
    };

    await prisma.order.create({
      data: orderData_One,
      include: {
        orderItem: true,
      },
    });
    await prisma.order.create({
      data: orderData_Two,
      include: {
        orderItem: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
