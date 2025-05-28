import React from "react";
import { Link } from "react-router-dom";

type MenuCardProps = {
  vendor_category: string;
  imageUrl: string;
  categoryId: string;
};

function FoodCategory({
  vendor_category,
  imageUrl,
  categoryId,
}: MenuCardProps) {
  return (
    <Link to={`/customer/allcategory/${categoryId}`}>
      <div className="relative flex flex-col items-center gap-3 bg-white hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)] cursor-pointer rounded-[8px] overflow-hidden">
        <div className="relative w-full h-[200px] max-md:w-[200px] max-md:h-[120px]">
          <img
            src={imageUrl}
            alt={vendor_category}
            className="w-full h-full object-cover rounded-[8px]"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent rounded-[8px]" />
          {/* Text di atas overlay */}
          <p className="absolute bottom-2 left-4 text-white text-[28px] font-semibold z-10 max-md:text-[14px] max-md:left-10">
            {vendor_category}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default FoodCategory;
