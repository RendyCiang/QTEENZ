import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type MenuCardProps = {
  vendor_name: string;
  vendor_price: number;
  imageUrl: string;
  vendor_stock: number;
};

function MenuCard({
  vendor_name,
  vendor_price,
  imageUrl,
  vendor_stock,
}: MenuCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[290px] h-[347px] bg-white rounded-[8px] outline-2 outline-stroke px-2 py-4">
      <div className="flex justify-start">
        <EllipsisVertical
          className="cursor-pointer hover:via-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          src="/Bakmi.png"
          alt="Profile Vendor"
          className="rounded-lg object-cover  w-[150px] h-[150px] "
        />

        <p className="text-[18px] font-medium mt-2">Bakmi Ayam Kecap</p>
        <div
          className="flex items-start justify-baseline
        "
        >
          <p className="pr-5">Kategori</p>
          <p>: {vendor_name}</p>
        </div>
        <div
          className="flex items-start justify-baseline
        "
        >
          <p className="pr-5">{vendor_stock}</p>
          <p>: {vendor_price}</p>
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
        <div className="absolute top-60  w-32 bg-white shadow-lg rounded-lg z-50">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer`}
          >
            <Link to={`/vendor/menu/editmenu`}>
              <p>Edit</p>
            </Link>
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-primary cursor-pointer">
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuCard;
