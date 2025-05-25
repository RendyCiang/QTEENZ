import { UlasanPenggunaData } from "@/types/types";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

type UlasanPenggunaItemProps = {
  item: Pick<UlasanPenggunaData, "vendor" | "rating" | "description">;
  index: number;
  isLoading?: boolean;
};

interface list {
  isLoading?: boolean;
}

const UlasanPenggunaItem = ({
  
  item,
  index,
  isLoading,
}: UlasanPenggunaItemProps) => {
  if (isLoading) {
    return (
      <>
        <div className="col-span-1">
          <p className="max-md:text-sm text-center py-4">
            <Skeleton width={40} height={20} />
          </p>
        </div>
        <div className="col-span-2 max-md:text-sm flex items-center gap-4 ">
          {/* <img src="/admin/bakmieTemp.png" alt="" /> */}
          <p className=" py-4">
            <Skeleton width={200} height={20} />
          </p>
        </div>
        <div className="col-span-5">
          <p className=" py-4 max-md:text-sm">
            <Skeleton width={500} height={20} />
          </p>
        </div>
        <div className="col-span-1">
          <p className="text-center py-4">
            <Skeleton width={100} height={20} />
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-1">
        <p className="max-md:text-sm text-center py-4">{index + 1}</p>
      </div>
      <div className="col-span-2 max-md:text-sm flex items-center gap-4 ">
        <img src={ "/admin/bakmieTemp.png"} alt="" />
        <p className=" py-4">{item.vendor}</p>
      </div>
      <div className="col-span-5">
        <p className=" py-4 max-md:text-sm">{item.description}</p>
      </div>
      <div className="col-span-1">
        <p className="text-center py-4">{item.rating}/5.0</p>
      </div>
    </>
  );
};

export default UlasanPenggunaItem;
