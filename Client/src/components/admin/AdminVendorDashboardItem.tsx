import { AdminPageDashboardItems, GetAllVendorData } from "@/types/types";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminVendorDashboardItem: React.FC<
  Partial<AdminPageDashboardItems<GetAllVendorData>>
> = ({ key, isLoading, data, index }) => {
  const [shopStatus, setShopStatus] = useState<string>("Buka");

  const handleStatusChange = (status) => {
    setShopStatus(status);
  };

  if (isLoading || !data) {
    return (
      <>
        <div className="col-span-1">
          <p className=" text-center max-md:hidden block py-4">
            <Skeleton width={50} height={20} />
          </p>
          <p className=" text-center max-md:block hidden py-4">
            <Skeleton width={20} height={20} />
          </p>
        </div>
        <div className="col-span-3 max-md:text-sm flex items-center gap-4 max-md:col-span-4">
          <Skeleton width={150} height={20} className="max-md:hidden block" />
        </div>
        <div className="col-span-1 max-md:hidden">
          <p className=" py-4">
            <Skeleton width={55} height={20} />
          </p>
        </div>
        <div className="col-span-2 max-md:text-sm max-md:col-span-3 max-md:text-start">
          <p className="py-4 flex">
            <Skeleton width={40} height={20} /> -{" "}
            <Skeleton width={40} height={20} />
          </p>
        </div>
        <div className="col-span-1 flex items-center gap-2 max-md:hidden">
          <Skeleton width={100} height={30} />
        </div>
        <div className="col-span-1 text-md">
          <p className="cursor-pointer py-4 font-bold text-2xl text-gray text-center max-md:hidden">
            <Skeleton width={30} height={20} />
          </p>
          <p className=" py-4 font-bold text-2xl max-md:text-xl text-gray text-center rotate-180 hidden max-md:block">
            <Skeleton width={30} height={20} />
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-span-1">
        <p className=" text-center max-md:text-sm py-4">
          {index ? index + 1 : 1}
        </p>
      </div>
      <div className="col-span-3 max-md:text-sm flex items-center gap-4 max-md:col-span-4">
        <img
          className="w-[35px] h-[35px] rounded-full"
          src="/admin/bakmieTemp.png"
          alt=""
        />
        <p className=" py-4">{data.name}</p>
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
