import { VendorMenuItem } from "@/types/types";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type MenuCardProps = {
  menu_name: string;
  vendor_price: number;
  vendor_category: string;
  imageUrl: string;
  vendor_stock: number;
};

function MenuCard({
  menu_name,
  vendor_price,
  vendor_category,
  imageUrl,
  vendor_stock,
}: MenuCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [archivedMenus, setArchivedMenus] = useState<VendorMenuItem[]>([]);

  return (
    <div className="w-full h-fit bg-white rounded-[8px] border border-stroke py-6">
      <div className="flex justify-start">
        <EllipsisVertical
          className="cursor-pointer hover:via-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="flex flex-col items-center justify-center ">
        <img
          src="/Bakmi.png"
          alt="Profile Vendor"
          className="rounded-lg object-cover  w-[150px] h-[150px] "
        />

        <p className="text-[18px] font-medium mt-2">{menu_name}</p>
        <div
          className="flex items-start justify-items-start
        "
        >
          <p className="pr-5">Kategori:</p>
          <p>: {vendor_category}</p>
        </div>
        <div
          className="flex items-start justify-items-start
        "
        >
          <p className="pr-5">Stok: </p>
          <p>: {vendor_stock}</p>
        </div>
        {/* Button */}
        <div className="mt-2">
          <Link to="/vendor/menu/editmenu">
            <div className="w-50 bg-primary-4th outline-1 outline-stroke py-2 rounded-[8px] hover:bg-primary group">
              <p className="text-center font-medium text-primary group-hover:text-white">
                Edit
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-60  w-40 bg-white shadow-lg rounded-lg z-50 py-2 px-2">
          <button
            className={`group block w-full text-left px-4 py-2 hover:bg-primary hover:rounded-lg hover:text-white cursor-pointer`}
          >
            <p className="text-gray-700 group-hover:text-white">Hapus</p>
          </button>
          <button
            className={`group block w-full text-left px-4 py-2 hover:bg-primary hover:rounded-lg hover:text-white cursor-pointer`}
          >
            <p
              className="text-gray-700 group-hover:text-white"
              onClick={() => {
                setIsArchived(true);
              }}
            >
              Arsip
            </p>
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuCard;
