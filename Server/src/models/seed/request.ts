import { Bank_Account, Location, Status_Open } from "@prisma/client";
import { prisma } from "../../config/config";

export async function seedRequest() {
  try {
    const request = [
      {
        name: "Budi Santoso",
        vendor_name: "KFC Fried Chicken",
        location: Location.Kantin_Basement,
        open_hour: "08:00",
        close_hour: "20:00",
        email: "kfc@gmail.com",
        phone: "08444444444",
        document: "test.pdf",
        proposal: "proposal.pdf",
        photo: "ktp.png",
        bank_account: "48101010",
        bank_type: Bank_Account.BCA,
      },
      {
        name: "Michael Surya",
        vendor_name: "MCD Michael Chicken",
        location: Location.Kantin_Payung,
        open_hour: "08:00",
        close_hour: "20:00",
        email: "mcd@gmail.com",
        phone: "083333333333",
        document: "test.pdf",
        proposal: "proposal.pdf",
        photo: "ktp.png",
        bank_account: "48101010",
        bank_type: Bank_Account.BCA,
      },
      {
        name: "Jane Doe",
        vendor_name: "Burger Queen",
        location: Location.Kantin_Basement,
        open_hour: "09:00",
        close_hour: "21:00",
        email: "burger@gmail.com",
        phone: "08222222222",
        document: "test.pdf",
        proposal: "proposal.pdf",
        photo: "ktp.png",
        bank_account: "48101011",
        bank_type: Bank_Account.CIMB,
      },
      {
        name: "John Doe",
        vendor_name: "Pizza Hut",
        location: Location.Kantin_Payung,
        open_hour: "10:00",
        close_hour: "22:00",
        email: "pizza@gmail.com",
        phone: "081111111111",
        document: "test.pdf",
        proposal: "proposal.pdf",
        photo: "ktp.png",
        bank_account: "48101012",
        bank_type: Bank_Account.OCBC,
      },
    ];

    for (const req of request) {
      await prisma.request.create({
        data: req,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
