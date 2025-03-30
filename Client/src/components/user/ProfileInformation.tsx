import React from "react";
import { Link } from "react-router-dom";

const ProfileInformation = () => {
  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5">
      <p className="text-3xl font-bold">Profil Saya</p>
      <div className="flex justify-between items-center">
        <p>
          Kelola informasi profil Anda untuk mengontrol, melindungi, dan
          mengamankan akun
        </p>
        <div className="cursor-pointer hover:opacity-80 flex items-center justify-center gap-3">
          <img src="/user/ubahProfil.svg" alt="" />
          <p className="text-primary">Ubah Profil</p>
        </div>
      </div>

      <div className="w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="grid grid-cols-4">
        <div className="col-span-1 items-center flex flex-col justify-center">
          <img
            src="/haerinTemp.jpg"
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[30vh] h-[30vh] max-md:h-[35vh]"
          />

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
      </div>
    </div>
  );
};

export default ProfileInformation;
