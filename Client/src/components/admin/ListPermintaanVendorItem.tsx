import { useState } from "react";
import { Link } from "react-router-dom";
import { GetAllVendorRequest } from "@/types/types";

interface ListPermintaanVendorItemProps {
  datas: GetAllVendorRequest;
  index: number;
  onStatusChange: (id: string, newStatus: string) => void; 
}

const ListPermintaanVendorItem: React.FC<ListPermintaanVendorItemProps> = ({
  datas,
  index,
  onStatusChange,
}) => {
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
