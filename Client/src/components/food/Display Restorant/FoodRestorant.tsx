import React from "react";
import { Link } from "react-router-dom";

type MenuProps = {
  vendor_name: string;
  vendor_rating: number;
  vendor_price: number;
  imageUrl: string
};

function FoodRestorant({
  vendor_name,
  vendor_price,
  vendor_rating,
  imageUrl
}: MenuProps) {
  return (
    <Link to={`/customer/allmenu/:id`}>
      <div className="flex flex-row items-center pl-4 py-4 gap-6 bg-white rounded-lg h-fit cursor-pointer hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)]  max-md:flex-col max-md:gap-1">
        <img
          src={imageUrl}
          alt="Kategori"
          className="w-[94px] h-[94px] max-md:w-[64px] max-md:h-[64px]"
        />
        <div className="pr-4">
          <p className="font-medium text-[16px] text-center max-md:text-[14px]">
            {vendor_name}
          </p>
          <div className="flex items-center">
            <img src="../icon/star.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px] max-md:text-[12px]">
              {vendor_rating}/5.0 (300+)
            </p>
          </div>
          <div className="flex items-center">
            <img src="../icon/price.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px] max-md:text-[12px]">
              {vendor_price}-30000
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FoodRestorant;
