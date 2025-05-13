import React, { useState } from "react";

const UlasanPenggunaItem = () => {
  const [shopStatus, setShopStatus] = useState<string>("Buka");

  const handleStatusChange = (status: string) => {
    setShopStatus(status);
  };

  return (
    <>
      <div className="col-span-1">
        <p className="max-md:text-sm text-center py-4">1</p>
      </div>
      <div className="col-span-2 max-md:text-sm flex items-center gap-4 ">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">Bakmie Effata</p>
      </div>
      <div className="col-span-5">
        <p className=" py-4 max-md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nobis
          nisi maiores nemo ipsa quaerat odio laudantium quisquam vitae
          inventore! Cum fugit eaque voluptates dolore alias quod. Ipsum, labore
          laboriosam?
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-center py-4">4.9/5.0</p>
      </div>
    </>
  );
};

export default UlasanPenggunaItem;
