import React, { useState } from "react";

const PermintaanVendorItem = () => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");

  const handleStatusChange = (status: string) => {
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
      <div className="col-span-2 ">
        <p className="py-4">15 Februari 2025</p>
      </div>

      <div className="col-span-3 flex justify-center w-full">
        {shopStatus === "Ditinjau" && (
          <p className="max-w-fit rounded-lg px-10 bg-secondary-2nd py-2 text-center">
            Ditinjau
          </p>
        )}
        {shopStatus === "Diterima" && (
          <p className="max-w-fit rounded-lg px-10 bg-gray py-2 text-center">
            Diterima
          </p>
        )}

        {shopStatus === "Ditolak" && (
          <p className="max-w-fit rounded-lg px-10 bg-primary-2nd py-2 text-center">
            Ditolak
          </p>
        )}
      </div>
    </>
  );
};

export default PermintaanVendorItem;
