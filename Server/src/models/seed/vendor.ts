import { prisma } from "../../config/config";

export async function seed() {
  try {
    const vendorCodes = [
      { code: "EFFATTA-666", isUsed: false },
      { code: "HAINAM-777", isUsed: false },
      { code: "CHARSIU-888", isUsed: false },
    ];

    for (const vendorCode of vendorCodes) {
      const existingVendorCode = await prisma.vendorCode.findUnique({
        where: { code: vendorCode.code },
      });

      if (!existingVendorCode) {
        await prisma.vendorCode.create({
          data: vendorCode,
        });
      } else {
        console.log(`Vendor code ${vendorCode.code} already exists.`);
      }
    }
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error(error);
  }
}

seed();
