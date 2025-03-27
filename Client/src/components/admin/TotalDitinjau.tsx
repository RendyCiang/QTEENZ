import React from "react";

const TotalDitinjau = () => {
  return (
    <div className="rounded-xl min-h-[23vh] max-md:max-h-[10vh] row-span-1 px-6 py-6 pb-12 bg-primary ">
      <div className="flex gap-2 items-center ">
        <img className="pb-4" src="/admin/listPermintaanIcon.svg" alt="" />
        <p className="text-white pb-4">Permintaan</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex max-md:gap-3 items-end">
          <h1 className="text-5xl text-white font-semibold">15</h1>
          <p className="text-white">Perlu Ditinjau</p>
        </div>
        <img
          className=" py-4 px-5 bg-white rounded-full"
          src="/admin/arrowPrimaryKanan.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default TotalDitinjau;
