import { AdminPageDashboardItems, RequestsPayload } from "@/types/types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ListPermintaanVendorItem: React.FC<
  Partial<AdminPageDashboardItems<RequestsPayload>>
> = ({ key, isLoading, data, index }) => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");
  const [isOpen, setIsOpen] = useState(false);

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
          <p className="cursor-pointer hover:opacity-80 py-4 font-bold text-2xl text-gray text-center max-md:hidden">
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
        <p className=" max-md:text-sm text-center py-4">
          {index ? index + 1 : 1}
        </p>
      </div>
      <div className="col-span-2 flex items-center gap-4 max-md:col-span-4">
        <img
          src={data?.photo !== "" ? data?.photo : "/admin/bakmieTemp.png"}
          alt=""
        />
        <p className=" max-md:text-sm py-4">{data.vendor_name}</p>
      </div>
      <div className="col-span-1 max-md:hidden">
        <p className=" max-md:text-sm py-4">{data?.createAt}</p>
      </div>
      <div className="col-span-2 flex justify-center max-md:hidden items-center">
        <p className=" max-md:text-sm py-4">N/A</p>
      </div>

      <div className="col-span-2 flex justify-center w-full">
        {data?.status === "Pending" && (
          <p className=" max-md:text-sm max-w-fit rounded-lg max-md:px-3 max-md:py-1 px-10 bg-secondary-2nd py-2 text-center">
            Ditinjau
          </p>
        )}
        {data?.status === "Accepted" && (
          <p className=" max-md:text-sm max-w-fit rounded-lg max-md:px-3 max-md:py-1 px-10 bg-gray py-2 text-center">
            Diterima
          </p>
        )}

        {data?.status === "Declined" && (
          <p className=" max-md:text-sm max-w-fit rounded-lg max-md:px-3 max-md:py-1 px-10 bg-primary-2nd py-2 text-center">
            Ditolak
          </p>
        )}
      </div>
      <div className="col-span-1 max-md:col-span-2">
        <Link to={`/admin/permintaan/${data?.id}`}>
          <p className="py-4 cursor-pointer hover:opacity-80 font-bold text-2xl max-md:text-xl text-gray text-center rotate-180 ">
            &#60;
          </p>
        </Link>
      </div>
    </>
  );
};

export default ListPermintaanVendorItem;
