import { register } from "module";
import React from "react";
import { Toaster } from "react-hot-toast";
import Button from "../general/Button";
import TextBox from "../general/TextBox";
import { UpdatePasswordSchema } from "@/utils/schema";
import { z } from "zod";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormFields = z.infer<typeof UpdatePasswordSchema>;

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(UpdatePasswordSchema),
  });
  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5">
      <Toaster />
      <p className="text-3xl font-bold">Atur Kata Sandi</p>
      <p>Lindungi kata sandi anda dari akun anda</p>

      <div className="w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="flex flex-col gap-5">
        {/* <TextBox
          label="Nama Depan"
          placeholder="09.00"
          required={true}
          register={register}
          errorMsg={errors.first_name?.message}
          name="first_name"
          disabledState={idleState}
        ></TextBox> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
