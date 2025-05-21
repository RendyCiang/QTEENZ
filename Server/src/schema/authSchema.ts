import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,9}$/;

const userValidation = z.object({
  email: z
    .string()
    .optional()
    .nullable()
    .refine((email) => !email || emailRegex.test(email), {
      message: "Invalid email format",
      path: ["email"],
    }),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine((phone) => !phone || phoneRegex.test(phone), {
      message: "Invalid phone number format",
      path: ["phone"],
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const buyerValidation = userValidation
  .extend({
    role: z.literal("Buyer"),
    first_name: z.string().nonempty("First name is required"),
    last_name: z.string().nonempty("Last name is required"),
  })
  .strict();

const sellerValidation = userValidation
  .extend({
    role: z.literal("Seller"),
    name: z.string().nonempty("Name is required"),
    location: z.enum(["Kantin_Basement", "Kantin_Lt5", "Kantin_Payung"]),
    open_hour: z.string().nonempty("Open hour is required"),
    close_hour: z.string().nonempty("Close hour is required"),
    bank_account: z.string().optional(),
    bank_type: z.string().optional(),
    vendor_name: z.string().nonempty("Vendor name is required"),
  })
  .strict();

const adminValidation = userValidation
  .extend({
    role: z.literal("Admin"),
    name: z.string().nonempty("Name is required"),
    binusian_id: z.string().nonempty("Binusian ID is required"),
  })
  .strict();

export const validateRegister = z.discriminatedUnion("role", [
  buyerValidation,
  sellerValidation,
  adminValidation,
]);

export const validateLogin = z.object({
  identity: z
    .string()
    .nonempty("Email or phone is required")
    .refine((value) => emailRegex.test(value) || phoneRegex.test(value), {
      message: "Invalid email or phone format",
    }),
  password: z.string().nonempty("Password is required"),
});

export const validateRequest = z.object({
  name: z.string().nonempty("Name is required"),
  vendor_name: z.string().nonempty("Vendor name is required"),
  location: z.enum(["Kantin_Basement", "Kantin_Lt5", "Kantin_Payung"], {
    required_error: "Location is required",
  }),
  open_hour: z.string().nonempty("Open hour is required"),
  close_hour: z.string().nonempty("Close hour is required"),
  email: z
    .string()
    .optional()
    .refine((email) => !email || emailRegex.test(email), {
      message: "Invalid email format",
    }),
  phone: z
    .string()
    .nonempty("Phone is required")
    .refine((phone) => phoneRegex.test(phone), {
      message: "Invalid phone number format",
    }),
  document: z.string().nonempty("Document file is required"),
  proposal: z.string().nonempty("Proposal file is required"),
  photo: z.string().nonempty("Photo is required"),

  bank_account: z.string().nonempty("Bank account is required"),
  bank_type: z.enum(
    [
      "BCA",
      "BNI",
      "Mandiri",
      "BRI",
      "CIMB",
      "Permata",
      "Danamon",
      "Maybank",
      "Panin",
      "OCBC",
      "HSBC",
      "UOB",
      "Citibank",
    ],
    {
      message: "Bank type is required",
    }
  ),
});
