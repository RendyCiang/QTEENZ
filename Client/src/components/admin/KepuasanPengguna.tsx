import React from "react";

const KepuasanPengguna = () => {
  return (
    <div className="rounded-xl h-[23vh] row-span-1 px-6 py-6 pb-12 bg-primary">
      <div className="flex gap-2">
        <img className="" src="/admin/penggunaDisabled.svg" alt="" />
        <p className="text-white pb-4">Kepuasan Pengguna</p>
      </div>

      <div>
        <h1 className="text-7xl text-white font-semibold">4.8/5.0</h1>
        <p className="text-white">2000 dari 2500 pengguna</p>
        <progress
          className="w-full mt-2 mb-2 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary rounded-full"
          value={2000 / 2500}
        ></progress>
      </div>
    </div>
  );
};

export default KepuasanPengguna;
