import React from "react";
import { Link } from "react-router-dom";

function FoodCategory() {
  return (
    <Link to={`/customer/allcategory/:id`}>
      <div className="flex flex-col items-center px-4 py-2 border-primary-3rd border-1 bg-white rounded-lg shadow-sm cursor-pointer  hover:border-primary">
        <img
          src="../icon/Bakmi.png"
          alt="Kategori"
          className="w-[74px] h-[74px]"
        />
        <p className="font-medium text-[14px] text-center">Bakmi</p>
      </div>
    </Link>
  );
}

export default FoodCategory;
