import React, { useState } from "react";

const VendorDashboardItem = () => {
  const [shopStatus, setShopStatus] = useState<string>("Buka");

  const handleStatusChange = (status) => {
    setShopStatus(status);
  };

  return (
    <>
      <div className="col-span-1">
        <p className=" text-center py-4">1</p>
      </div>
      <div className="col-span-3 flex items-center gap-4 max-md:col-span-4">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">Bakmie Effata</p>
      </div>
      <div className="col-span-1 max-md:hidden">
        <p className=" py-4">4.9/5.0</p>
      </div>
      <div className="col-span-2 max-md:col-span-3 max-md:text-center">
        <p className="py-4">08:00 - 17.00</p>
      </div>
      <div className="col-span-1 flex items-center gap-2 max-md:hidden">
        {shopStatus === "Buka" ? (
          <p className="w-full text-center rounded-xl py-2 bg-[#A0EFE5]">
            Buka
          </p>
        ) : (
          <p className="w-full text-center rounded-xl py-2 bg-[#FFA8A9]">
            Tutup
          </p>
        )}
      </div>
      <div className="col-span-1">
        <p className=" py-4 font-bold text-2xl text-gray text-center max-md:hidden">
          ...
        </p>
        <p className=" py-4 font-bold text-2xl text-gray text-center rotate-180 hidden max-md:block">
          &#60;
        </p>
      </div>
    </>
  );
};

export default VendorDashboardItem;
