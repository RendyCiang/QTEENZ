import { Bank_Account, Location, Role, Status_Open } from "@prisma/client";
import { prisma } from "../../config/config";
import bcrypt from "bcryptjs";

export async function seedUser() {
  try {
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedBuyerPassword1 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword2 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword3 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword4 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword5 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword6 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword7 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword8 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword9 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword10 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword11 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword12 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword13 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword14 = await bcrypt.hash("buyer123", 10);
    const hashedBuyerPassword15 = await bcrypt.hash("buyer123", 10);
    const hashedSellerPassword1 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword2 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword3 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword4 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword5 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword6 = await bcrypt.hash("seller123", 10);
    const hashedSellerPassword7 = await bcrypt.hash("seller123", 10);

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@gmail.com",
        password: hashedAdminPassword,
        role: Role.Admin,
        phone: "081234567890",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
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
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
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
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
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
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "3",
          },
        },
      },
      {
        email: "buyer4@gmail.com",
        password: hashedBuyerPassword4,
        role: Role.Buyer,
        phone: "081234567894",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "4",
          },
        },
      },
      {
        email: "buyer5@gmail.com",
        password: hashedBuyerPassword5,
        role: Role.Buyer,
        phone: "081234567895010101",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "5",
          },
        },
      },
      {
        email: "buyer6@gmail.com",
        password: hashedBuyerPassword6,
        role: Role.Buyer,
        phone: "0812345678961221212121212",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "6",
          },
        },
      },
      {
        email: "buyer7@gmail.com",
        password: hashedBuyerPassword7,
        role: Role.Buyer,
        phone: "081234567897",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "7",
          },
        },
      },
      {
        email: "buyer8@gmail.com",
        password: hashedBuyerPassword8,
        role: Role.Buyer,
        phone: "081234567898",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "8",
          },
        },
      },
      {
        email: "buyer9@gmail.com",
        password: hashedBuyerPassword9,
        role: Role.Buyer,
        phone: "081234567899",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "9",
          },
        },
      },
      {
        email: "buyer10@gmail.com",
        password: hashedBuyerPassword10,
        role: Role.Buyer,
        phone: "081234567900",
        photo:
          "https://i.pinimg.com/736x/aa/e6/d3/aae6d3d7577610269e2ec73218126c2b.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "10",
          },
        },
      },
      {
        email: "buyer11@gmail.com",
        password: hashedBuyerPassword11,
        role: Role.Buyer,
        phone: "081234567901",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "11",
          },
        },
      },
      {
        email: "buyer12@gmail.com",
        password: hashedBuyerPassword12,
        role: Role.Buyer,
        phone: "081234567902",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "12",
          },
        },
      },
      {
        email: "buyer13@gmail.com",
        password: hashedBuyerPassword13,
        role: Role.Buyer,
        phone: "081234567903",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "13",
          },
        },
      },
      {
        email: "buyer14@gmail.com",
        password: hashedBuyerPassword14,
        role: Role.Buyer,
        phone: "081234567904",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "14",
          },
        },
      },
      {
        email: "buyer15@gmail.com",
        password: hashedBuyerPassword15,
        role: Role.Buyer,
        phone: "081234567905",
        photo:
          "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
        buyer: {
          create: {
            first_name: "Buyer",
            last_name: "15",
          },
        },
      },
    ];

    const vendorUsers = [
      {
        email: "Efatta@gmail.com",
        password: hashedSellerPassword1,
        role: Role.Seller,
        phone: "081234567894012012",
        photo:
          "https://assetd.kompas.id/VSqxTEbESeaVIdY0qoVPvxosCjg=/1024x576/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2024%2F06%2F01%2F495340df-2f53-4c8a-a50d-c853bc25755d_jpg.jpg",
        vendor: {
          create: {
            name: "Efatta",
            location: Location.Kantin_Basement,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_account: "1234567890",
            bank_type: Bank_Account.BNI,
            rating: 0,
          },
        },
      },
      {
        email: "xiaokee@gmail.com",
        password: hashedSellerPassword2,
        role: Role.Seller,
        phone: "081234567895",
        photo:
          "https://assets-pergikuliner.com/es_acR76-VrXQjcUIh9764vTR_g=/945x0/smart/filters:watermark(https://assets-pergikuliner.com/assets/pegimakan-logo-3086a7c6e15809ddc0438b11b4fbe8e6.png,-0,-3,10):no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/1460978/picture-1561516778.jpg",
        vendor: {
          create: {
            name: "Xiaokee",
            location: Location.Kantin_Lt5,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Open,
            bank_account: "1234567890",
            bank_type: Bank_Account.BCA,
            rating: 0,
          },
        },
      },
      {
        email: "hainam@gmail.com",
        password: hashedSellerPassword3,
        role: Role.Seller,
        phone: "081234567896",
        photo:
          "https://nibble-images.b-cdn.net/nibble/original_images/nasi-hainam-di-jakarta-02.jpg",
        vendor: {
          create: {
            name: "Hainam",
            location: Location.Kantin_Payung,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_type: Bank_Account.Mandiri,
            bank_account: "1234567890",
            rating: 0,
          },
        },
      },
      {
        email: "yoshinoya@gmail.com",
        password: hashedSellerPassword4,
        role: Role.Seller,
        phone: "0812345678961",
        photo:
          "https://upload.wikimedia.org/wikipedia/id/3/3d/Yoshinoya_logo.jpg",
        vendor: {
          create: {
            name: "Yoshinoya",
            location: Location.Kantin_Payung,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_type: Bank_Account.Mandiri,
            bank_account: "12345678901",
            rating: 0,
          },
        },
      },
      {
        email: "rosela@gmail.com",
        password: hashedSellerPassword5,
        role: Role.Seller,
        phone: "08123456789612",
        photo:
          "https://static.wixstatic.com/media/02378f_5d46cc3c9dbd4e2a9b69a98cce9a6922~mv2.webp/v1/fill/w_1530,h_1080,al_c/02378f_5d46cc3c9dbd4e2a9b69a98cce9a6922~mv2.webp",
        vendor: {
          create: {
            name: "Rosela Kitchen",
            location: Location.Kantin_Payung,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_type: Bank_Account.Mandiri,
            bank_account: "123456789013",
            rating: 0,
          },
        },
      },
      {
        email: "waffle@gmail.com",
        password: hashedSellerPassword6,
        role: Role.Seller,
        phone: "081234567896123",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelxlUUukZ0DqK-MYTp-0vkNHMSCmmgQqWzg&s",
        vendor: {
          create: {
            name: "Waffle House",
            location: Location.Kantin_Payung,
            open_hour: "08:00",
            close_hour: "20:00",
            status: Status_Open.Close,
            bank_type: Bank_Account.Mandiri,
            bank_account: "123456789012",
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
      const existingUser = await prisma.user.findUnique({
        where: { phone: vendor.phone },
      });

      if (!existingUser) {
        await prisma.user.create({ data: vendor });
      } else {
      }
    }
  } catch (error) {}
}
