import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextBox from "../general/TextBox";
import { z } from "zod";
import { registerVendorSchema, updateUserProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateUserProfile } from "@/types/types";
export type FormFields = z.infer<typeof updateUserProfileSchema>;
const ProfileInformation = () => {
  const [idleState, setIdleState] = useState<boolean>(true);
  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updateUserProfileSchema),
  });
  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5">
      <p className="text-3xl font-bold">Profil Saya</p>
      <div className="flex justify-between items-center">
        <p>
          Kelola informasi profil Anda untuk mengontrol, melindungi, dan
          mengamankan akun
        </p>
        <div
          onClick={() => setIdleState(!idleState)}
          className={`${
            !idleState ? "opacity-40" : "opacity-100"
          } cursor-pointer hover:opacity-80 flex items-center justify-center gap-3`}
        >
          <img src="/user/ubahProfil.svg" alt="" />
          <p className="text-primary">Ubah Profil</p>
        </div>
      </div>

      <div className="w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 items-center flex flex-col justify-center">
          <img
            src="/haerinTemp.jpg"
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[30vh] h-[30vh] max-md:h-[35vh]"
          />

          <button
            disabled={idleState}
            className="px-10 rounded-lg py-2 border-1 border-gray-200 mt-4"
          >
            Pilih Gambar
          </button>

          <div className="my-5">
            <p className="text-center text-sm text-gray">
              Ukuran gambar: maks 1 MB
            </p>
            <p className="text-center text-sm text-gray">
              Format gambar: JPEG, PNG
            </p>
          </div>
        </div>

        {/* DATA */}
        <div className="col-span-3 flex flex-col ">
          <p className="text-3xl font-semibold">Michael Kimeison</p>
          <p className="text-sm mt-1 mb-3">mcihaelskibidi@gmail.com</p>

          <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
            <TextBox
              label=""
              placeholder="09.00"
              required={true}
              register={register}
              errorMsg={errors.first_name?.message}
              name="first_name"
              disabledState={idleState}
            />
            <TextBox
              label="Jam Tutup"
              placeholder="17.00"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.last_name?.message}
              name="last_name"
            />
          </div>

          <Link to="/user-profile" className="cursor-pointer hover:opacity-80">
            Ubah Kata Sandi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
