import { z } from "zod";
export const loginSchema = z.object({
  identity: z.string().nonempty("Email atau Nomor Telepon harus diisi."),
  password: z.string().nonempty("Kata Sandi harus diisi."),
});

export const registerBuyerSchema = z.object({
  namaDepan: z.string().nonempty("Nama Depan harus diisi."),
  namaBlkg: z.string().nonempty("Nama Belakang harus diisi."),
  identity: z.string().nonempty("Email atau Nomor Telepon harus diisi."),
  pass: z.string().nonempty("Kata Sandi harus diisi."),
  pass2: z.string().nonempty("Konfirmasi Kata Sandi harus diisi."),
});
export const updateUserProfileSchema = z.object({
  role: z.enum(["Buyer", "Seller", "Admin"]).nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
});

export const registerVendorSchema = z.object({
  namaGerai: z.string().nonempty("Nama Gerai harus diisi."),
  namaPemilik: z.string().nonempty("Nama Pemilik harus diisi."),
  email: z.string().email("Email tidak valid.").nonempty("Email harus diisi."),
  nomorTelp: z.string().nonempty("Nomor Telepon harus diisi."),
  lokasi: z.string().nonempty("Lokasi harus diisi."),
  jamBuka: z.string().nonempty("Jam Buka harus diisi."),
  jamTutup: z.string().nonempty("Jam Tutup harus diisi."),
  nomorRekening: z.string().nonempty("Nomor Rekening harus diisi."),
  bankPemilikRekening: z
    .string()
    .nonempty("Bank Pemilik Rekening harus diisi."),
  pass: z.string().nonempty("Kata Sandi harus diisi."),

  // Manual dari state
  // imgKTP: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file.type.startsWith("image/"),
  //     "Gambar KTP harus berupa file gambar (contoh: .jpg, .png)."
  //   ),
  // proposalUsaha: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file.type === "application/pdf",
  //     "Proposal Usaha harus berupa file PDF."
  //   ),
  // suratPermohonan: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file.type === "application/pdf",
  //     "Surat Permohonan harus berupa file PDF."
  //   ),
});
