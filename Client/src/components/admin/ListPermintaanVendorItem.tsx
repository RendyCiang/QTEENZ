import { AdminPageDashboardItems, RequestsPayload } from "@/types/types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { GetAllVendorRequest } from "@/types/types";

interface ListPermintaanVendorItemProps {
  datas: GetAllVendorRequest;
  index: number;
  onStatusChange: (id: string, newStatus: string) => void; 
}

const ListPermintaanVendorItem: React.FC<ListPermintaanVendorItemProps>: React.FC<
  Partial<AdminPageDashboardItems<RequestsPayload>>
> = ({
  datas,
  index,
  onStatusChange,
}{ key, isLoading, data, index }) => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");
  const [isOpen, setIsOpen] = useState(false);

  if (!datas || typeof datas !== "object") {
    return <p className="col-span-9 text-center py-4">Data tidak tersedia</p>;
  }

  const formatDateWithOffset = (
    dateString: string | undefined,
    daysToAdd: number = 0
  ): string => {
    if (!dateString) return "Tidak tersedia";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Format salah";

    // Tambah hari
    date.setDate(date.getDate() + daysToAdd);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatUpdateDate = (
    shopStatus: string | undefined,
    updateAt: string | undefined
  ): string => {
    if (shopStatus !== "Diterima") return "N/A";
    if (!updateAt) return "Tidak tersedia";

    const date = new Date(updateAt);
    if (isNaN(date.getTime())) return "Format salah";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
        <p className="text-center py-4">{index + 1}</p>
      </div>
      <div className="col-span-2 flex items-center gap-4 max-md:col-span-4">
        <img src="/admin/bakmieTemp.png" alt="" className="w-10 h-10" />
        <p className="py-4">{datas?.vendor_name || "Tidak tersedia"}</p>
      </div>
      <div className="col-span-1">
        <p className="py-4">{formatDateWithOffset(datas?.createAt, 10)}</p>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p className="py-4">
          {formatUpdateDate(datas?.shopStatus, datas?.updateAt)}
        </p>
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
        {shopStatus === "Ditolak" && (
          <p className="max-w-fit rounded-lg px-10 bg-primary-2nd py-2 text-center">
            Ditolak
          </p>
        )}
      </div>
      <div className="col-span-1 max-md:col-span-2 relative">
        <button
          className="py-4 font-bold text-2xl text-gray text-center w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ...
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 w-32 bg-white shadow-lg rounded-lg z-50">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to={`/admin/permintaan/${datas?.id}`}>
                <p>Edit</p>
              </Link>
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-primary cursor-pointer">
              Hapus
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListPermintaanVendorItem;
