import { z } from "zod";

export const menuValidation = z.object({
  name: z.string().nonempty("Name is required"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().nonempty("Description is required"),
  stock: z.number().int().min(0, "Stock must be at least 0"),
  categoryId: z.string().nonempty("Category ID is required"),
  photo: z.string().nonempty("Photo is required"),
  variants: z
    .array(
      z.object({
        size: z.string().nonempty("Variant size is required"),
        name: z.string().nonempty("Variant name is required"),
        price: z.number().positive("Variant price must be greater than 0"),
        stock: z.number().int().min(0, "Variant stock must be at least 0"),
      })
    )
    .min(1, "At least one variant is required"),
});
