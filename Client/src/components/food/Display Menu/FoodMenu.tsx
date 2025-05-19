import React from "react";
import { Link } from "react-router-dom";

type MenuProps = {
  vendor_name: string;
  menu_name: string;
  vendor_price: number;
  vendor_rating: number;
  imageUrl: string;
};

function FoodMenu({
  vendor_name,
  menu_name,
  vendor_price,
  vendor_rating,
  imageUrl,
}: MenuProps) {
  return (
    <Link to={`/customer/detailmenu/:id`}>
      <div className=" rounded-[8px] overflow-hidden bg-white cursor-pointer h-fit hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)] ">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-[150px] object-cover max-md:h-[120px]"
        />
        <div className="px-3 py-3 w-full max-md:w-[130px]">
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold max-md:text-[14px]">
              {menu_name}
            </p>

            <div className="flex gap-2 text-nowrap">
              <p className="text-[14px] font-normal text-gray max-md:text-[12px]">
                {vendor_name} |
              </p>
              <div className="flex items-center justify-center">
                <img src="/icon/star.png" alt="" className="w-4 h-4 mr-1 " />
                <p className="text-gray text-[14px] max-md:text-[12px]">
                  {vendor_rating}/5.0
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-semibold text-primary max-md:text-[14px]">
                Rp {vendor_price.toLocaleString("id-ID")}
              </p>
              <button className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center cursor-pointer text-center text-[20px] max-md:w-[20px] max-md:h-[20px] max-md:text-[14px] hover:bg-gray-800">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FoodMenu;
