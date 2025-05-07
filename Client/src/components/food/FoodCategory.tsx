import React from "react";
import { Link } from "react-router-dom";

function FoodCategory() {
  return (
    <Link to={`/customer/allcategory/:id`}>
      <div className="flex flex-col items-center px-4 py-2 gap-2 bg-white rounded-lg shadow-sm cursor-pointer  shadow-gray-150 hover:shadow-primary-3rd">
        <img
          src="../icon/Bakmi.png"
          alt="Kategori"
          className="w-[74px] h-[74px] max-md:w-[50px] max-md:h-[50px]"
        />
        <p className="font-medium text-[14px] text-center max-md:text-[12px]">Bakmi</p>
      </div>
    </Link>
  );
}

export default FoodCategory;
