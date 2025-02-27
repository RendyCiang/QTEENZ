import { Location, Role, Status_Open } from "@prisma/client";
import { prisma } from "../../config/config";
import bcrypt from "bcryptjs";

export async function seedUser() {
  try {
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedBuyerPassword1 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword2 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword3 = await bcrypt.hash("buyer123", 10);
    const hashedSellerPassword1 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword2 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword3 = await bcrypt.hash("seller123", 10);

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@gmail.com",
        password: hashedAdminPassword,
        role: Role.Admin,
        phone: "081234567890",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        admin: {
          create: {
            name: "Admin",
            binusian_id: "CHAR-694",
          },
        },
      },
    });

    const buyerUsers = [
      {
        email: "buyer1@gmail.com",
        password: hashedBuyerPassword1,
        role: Role.Buyer,
        phone: "081234567891",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "1",
          },
        },
      },
      {
        email: "buyer2@gmail.com",
        password: hashedBuyerPassword2,
        role: Role.Buyer,
        phone: "081234567892",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "2",
          },
        },
      },
      {
        email: "buyer3@gmail.com",
        password: hashedBuyerPassword3,
        role: Role.Buyer,
        phone: "081234567893",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "3",
          },
        },
      },
    ];

    const vendorUsers = [
      {
        email: "Efatta@gmail.com",
        password: hashedSellerPassword1,
        role: Role.Seller,
        phone: "081234567894",
        vendor: {
          create: {
            name: "Efatta",
            location: Location.Kantin_Basement,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_account: "1234567890",
            rating: 0,
          },
        },
      },
      {
        email: "xiaokee@gmail.com",
        password: hashedSellerPassword2,
        role: Role.Seller,
        phone: "081234567895",
        vendor: {
          create: {
            name: "Xiaokee",
            location: Location.Kantin_Lt5,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Open,
            bank_account: "1234567890",
            rating: 0,
          },
        },
      },
      {
        email: "hainam@gmail.com",
        password: hashedSellerPassword3,
        role: Role.Seller,
        phone: "081234567896",
        vendor: {
          create: {
            name: "Hainam",
            location: Location.Kantin_Payung,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_account: "1234567890",
            rating: 0,
          },
        },
      },
    ];

    for (const buyer of buyerUsers) {
      await prisma.user.create({
        data: buyer,
      });
    }

    for (const vendor of vendorUsers) {
      await prisma.user.create({
        data: vendor,
      });
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.log(error);
  }
}
