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
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
});

export const updateVendorProfileSchema = z.object({
  namaGerai: z.string().nullable(),
  namaPemilik: z.string().nullable(),
  lokasiGerai: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  jamBuka: z.string().nullable(),
  jamTutup: z.string().nullable(),
  norek: z.string().nullable(),
  bankType: z.string().nullable(),
});

export const registerVendorSchema = z.object({
  namaGerai: z.string().nonempty("Nama Gerai harus diisi."),
  namaPemilik: z.string().nonempty("Nama Pemilik harus diisi."),
  email: z.string().email("Email tidak valid.").nonempty("Email harus diisi."),
  nomorTelp: z.string().nonempty("Nomor Telepon harus diisi."),
  lokasi: z
    .enum(["Kantin_Basement", "Kantin_Lt5", "Kantin_Payung"], {
      message:
        "Lokasi harus antara Kantin_Basement, Kantin_Lt5, atau Kantin_Payung.",
    })
    .refine((val) => val !== null && val !== undefined, "Lokasi harus diisi."),
  jamBuka: z
    .string()
    .nonempty("Jam Buka harus diisi.")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam harus Jam:Menit"),
  jamTutup: z
    .string()
    .nonempty("Jam Tutup harus diisi.")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam harus Jam:Menit"),
  nomorRekening: z.string().nonempty("Nomor Rekening harus diisi."),
  bankPemilikRekening: z
    .string()
    .nonempty("Bank Pemilik Rekening harus diisi."),
  pass: z.string().nonempty("Kata Sandi harus diisi."),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().nonempty("Kata Sandi Lama harus diisi."),
  newPassword: z.string().nonempty("Kata Sandi Baru harus diisi."),
  confirmPassword: z.string().nonempty("Mohon isi lagi kata sandi barunya."),
});

export const forgotPasswordSchema = z.object({
  newPassword: z.string().nonempty("Kata Sandi Baru harus diisi."),
  confirmPassword: z.string().nonempty("Mohon isi lagi kata sandi barunya."),
});
