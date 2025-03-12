import React, { useState } from "react";

const PenggunaDashboardItem = () => {
  const [penggunaStatus, setPenggunaStatus] = useState<string>("Buka");
  return (
    <>
      <div className="col-span-1">
        <p className=" text-center py-4">1</p>
      </div>
      <div className="col-span-2 flex items-center gap-4">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">Bakmie Effata</p>
      </div>
      <div className="col-span-1">
        {penggunaStatus === "Buka" ? (
          <p className="max-w-[150px] text-center rounded-xl py-2 bg-secondary">
            Pembeli
          </p>
        ) : (
          <p className="max-w-[150px] text-center rounded-xl py-2 bg-primary-2nd">
            Vendor
          </p>
        )}
      </div>
      <div className="col-span-2 text-center">
        <p className="py-4">koma*****om</p>
      </div>
      <div className="col-span-2 ">
        <p className="py-4 text-center ">08********78</p>
      </div>
      <div className="col-span-1">
        <p className=" py-4 font-bold text-2xl text-gray text-center">...</p>
      </div>
    </>
  );
};

export default PenggunaDashboardItem;
