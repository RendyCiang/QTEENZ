import React from "react";

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
      <p>a</p>
    </div>
  );
};

export default ProfileInformation;
