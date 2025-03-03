import { z } from "zod";

export const menuValidation = z.object({
  name: z.string().nonempty("Name is required"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().nonempty("Description is required"),
  stock: z.number().int().min(0, "Stock must be at least 0"),
  categoryId: z.string().nonempty("Category ID is required"),
  photo: z.string().nonempty("Photo is required"),
});
