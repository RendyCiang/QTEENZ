import { prisma } from "../../config/config";
import bcrypt from "bcryptjs";

export async function seed() {
  try {
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedBuyerPassword = await bcrypt.hash("buyer123", 10);
    const hashedSellerPassword = await bcrypt.hash("seller123", 10);

    const adminUser = await prisma.user.create({
      data: {
        id: "USR0001",
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedAdminPassword,
        role: "Admin",
        phone: "081234567890",
        admin: {
          create: {
            id: "ADM0001",
            binusian_id: "CHAR-694",
          },
        },
      },
    });

    const buyerUser = await prisma.user.create({
      data: {
        id: "USR0002",
        name: "Buyer",
        email: "buyer@gmail.com",
        password: hashedBuyerPassword,
        role: "Buyer",
        phone: "081234567891",
        buyer: {
          create: {
            id: "BUY0001",
            nim: "2201761234",
          },
        },
      },
    });

    const sellerUser = await prisma.user.create({
      data: {
        id: "USR0003",
        name: "Seller",
        email: "seller@gmail.com",
        password: hashedSellerPassword,
        role: "Seller",
        phone: "081234567892",
        seller: {
          create: {
            id: "SEL0001",
            vendorCode: {
              connect: {
                code: "EFFATTA-666",
              },
            },
          },
        },
      },
    });

    const vendorCodes = await prisma.vendorCode.update({
      where: {
        code: "EFFATTA-666",
      },
      data: {
        isUsed: true,
      },
    });

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.log(error);
  }
}

seed();
