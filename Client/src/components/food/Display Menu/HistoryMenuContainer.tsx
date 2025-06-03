import React, { useState } from "react";
import { Link } from "react-router-dom";

type HistoryMenuProps = {
  variant_name: string;
  menu_name: string;
  vendor_price: number;
  purchase_number: number;
  imageUrl: string;
  menu_id: string;
};

function HistoryMenuContainer({
  variant_name,
  menu_name,
  vendor_price,
  purchase_number,
  imageUrl,
  menu_id,
}: HistoryMenuProps) {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <div className="rounded-[8px] overflow-hidden bg-white cursor-pointer h-fit w-full hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)]">
      <img
        src={imageUrl}
        alt=""
        className="w-full h-[150px] object-cover max-md:h-[120px]"
      />

      <div className="px-3 py-3 w-full">
        <p className="text-[20px] font-semibold max-md:text-[14px]">
          {menu_name}
        </p>
        <p className="text-gray-500 mb-1 text-base max-md:text-[12px]">
          Varian: {variant_name}
        </p>

        <p className="text-[18px] font-semibold text-primary max-md:text-[14px]">
          Rp {formatRupiah(vendor_price)}
        </p>

        <div className="flex justify-between items-center mt-2 max-md:justify-start max-md:flex-col max-md:items-start max-md:gap-2">
          <p className="text-base text-gray-500 max-md:text-[12px]">
            Dibeli {purchase_number} kali
          </p>
          <Link to={`/customer/food/details/${menu_id}`}>
            <button
              onClick={increment}
              className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center text-[20px] max-md:w-[20px] max-md:h-[20px] max-md:text-[14px] hover:bg-gray-800"
            >
              +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HistoryMenuContainer;
