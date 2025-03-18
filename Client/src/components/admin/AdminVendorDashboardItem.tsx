import { GetAllVendorData } from "@/types/types";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
type VendorDashboardItemProps = {
  key: number;
  isLoading: boolean;
  data: GetAllVendorData;
  index: number;
};

const AdminVendorDashboardItem: React.FC<VendorDashboardItemProps> = ({
  key,
  isLoading,
  data,
  index,
}) => {
  const [shopStatus, setShopStatus] = useState<string>("Buka");

  const handleStatusChange = (status) => {
    setShopStatus(status);
  };

  // if (isLoading) {
  //   return;
  // }

  return (
    <>
      <div className="col-span-1">
        <p className=" text-center max-md:text-sm py-4">{index + 1}</p>
        {/* <Skeleton color={"#f0f0f0"} width={"100%"} height={"100%"} /> */}
      </div>
      <div className="col-span-3 max-md:text-sm flex items-center gap-4 max-md:col-span-4">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">{data.name}</p>
        {/* <Skeleton width={120} height={20} /> */}
      </div>
      <div className="col-span-1 max-md:hidden">
        <p className=" py-4">{data.rating}/5.0</p>
      </div>
      <div className="col-span-2 max-md:text-sm max-md:col-span-3 max-md:text-start">
        <p className="py-4">
          {data.open_hour} - {data.close_hour}
        </p>
      </div>
      <div className="col-span-1 flex items-center gap-2 max-md:hidden">
        {data.status === "Open" ? (
          <p className="w-full text-center rounded-xl py-2 bg-[#A0EFE5]">
            Buka
          </p>
        ) : (
          <p className="w-full text-center rounded-xl py-2 bg-[#FFA8A9]">
            Tutup
          </p>
        )}
      </div>
      <div className="col-span-1 text-md">
        <p className="cursor-pointer py-4 font-bold text-2xl text-gray text-center max-md:hidden">
          ...
        </p>
        <p className=" py-4 font-bold text-2xl max-md:text-xl text-gray text-center rotate-180 hidden max-md:block">
          &#60;
        </p>
      </div>
    </>
  );
};

export default AdminVendorDashboardItem;
