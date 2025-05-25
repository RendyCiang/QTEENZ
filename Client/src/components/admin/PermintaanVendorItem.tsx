import { formatDateWithOffset } from "@/utils/utils";
import React, { useState } from "react";

type PermintaanVendorItemProps = {
  no: number;
  vendorName: string;
  date: string;
  status: string;
  isLoading: boolean;
};

const PermintaanVendorItem: React.FC<PermintaanVendorItemProps> = ({
  no,
  vendorName,
  date,
  status,
  isLoading,
}) => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");

  const handleStatusChange = (status: string) => {
    setShopStatus(status);
  };

  return (
    <>
      <div className="col-span-1">
        <p className=" text-center py-4">{no + 1}</p>
      </div>
      <div className="col-span-3 flex items-center gap-4 max-md:col-span-4">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">{vendorName}</p>
      </div>
      <div className="col-span-2 ">
        <p className="py-4">{formatDateWithOffset(date, 10)}</p>
      </div>

      <div className="col-span-2 flex justify-center w-full">
        {status === "Pending" && (
          <p className="max-w-fit rounded-lg px-10 bg-secondary-2nd py-2 text-center">
            Ditinjau
          </p>
        )}
        {status === "Accepted" && (
          <p className="max-w-fit rounded-lg px-10 bg-primary-4th py-2 text-center">
            Diterima
          </p>
        )}

        {status === "Rejected" && (
          <p className="max-w-fit rounded-lg px-10 bg-gray py-2 text-center">
            Ditolak
          </p>
        )}
      </div>
      <div className="col-span-1"></div>
    </>
  );
};

export default PermintaanVendorItem;
