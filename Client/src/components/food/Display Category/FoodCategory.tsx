import React from "react";
import { Link } from "react-router-dom";

type MenuCardProps = {
  vendor_category: string;
  imageUrl: string;
  categoryId: string;
};

function FoodCategory({ vendor_category, imageUrl, categoryId }: MenuCardProps) {
  return (
    <Link to={`/customer/allcategory/${categoryId}`}>
      <div className="flex flex-col items-center px-4 py-2 gap-2 bg-white rounded-lg hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)] cursor-pointer  ">
        <img
          src={imageUrl}
          alt={vendor_category}
          className="w-[74px] h-[74px] max-md:w-[50px] max-md:h-[50px]"
        />
        <p className="font-medium text-[14px] text-center max-md:text-[12px]">
          {vendor_category}
        </p>
      </div>
    </Link>
  );
}

export default FoodCategory;
