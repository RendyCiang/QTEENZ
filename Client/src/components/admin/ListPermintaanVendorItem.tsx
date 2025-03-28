import { useState } from "react";
import { Link } from "react-router-dom";

const ListPermintaanVendorItem = () => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (status) => {
    setShopStatus(status);
  };

  return (
    <>
      <div className="col-span-1">
        <p className=" text-center py-4">1</p>
      </div>
      <div className="col-span-2 flex items-center gap-4 max-md:col-span-4">
        <img src="/admin/bakmieTemp.png" alt="" />
        <p className=" py-4">Bakmie Effata</p>
      </div>
      <div className="col-span-1 ">
        <p className="py-4">15 Februari 2025</p>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p className="py-4">N/A</p>
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
      <div className="col-span-1 max-md:col-span-2">
        <button
          className="py-4 font-bold text-2xl text-gray text-center w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ...
        </button>

        {/* DD Menu */}
        {isOpen && (
          <div className="absolute right-30 w-32 bg-white shadow-lg rounded-lg">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to={"/admin/permintaan/:id"}>
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
