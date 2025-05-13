import { register } from "module";
import React from "react";
import { Toaster } from "react-hot-toast";
import Button from "../general/Button";
import TextBox from "../general/TextBox";
import { updatePasswordSchema } from "@/utils/schema";
import { z } from "zod";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormFields = z.infer<typeof updatePasswordSchema>;

const UpdatePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updatePasswordSchema),
  });
  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5">
      <Toaster />
      <p className="text-3xl font-bold">Atur Kata Sandi</p>
      <p>Lindungi kata sandi anda dari akun anda</p>

      <div className="w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="flex flex-col gap-5">
        <TextBox
          label="Kata Sandi Sekarang"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.oldPassword?.message}
          name="oldPassword"
        ></TextBox>
        <TextBox
          label="Kata Sandi Baru"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.newPassword?.message}
          name="oldPassword"
        ></TextBox>
        <TextBox
          label="Ketik Kembali Kata Sandi Baru"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.confirmPassword?.message}
          name="oldPassword"
        ></TextBox>
      </div>

      <Button type="submit" variant="tertiary" className="mt-10">
        <div className="w-full flex items-center justify-center gap-2">
          <p>Simpan</p>
        </div>
      </Button>
      <p className="underline cursor-pointer text-center">Lupa Kata Sandi?</p>
    </div>
  );
};

export default UpdatePassword;
