import React from "react";
import { Link } from "react-router-dom";

function FoodRestorant() {
  return (
    <Link to={`/customer/allmenu/:id`}>
      <div className="flex flex-row items-center pl-4 py-4 gap-6 border-primary-3rd border-1 bg-white rounded-lg shadow-sm h-fit cursor-pointer hover:border-primary">
        <img
          src="../icon/Bakmi.png"
          alt="Kategori"
          className="w-[94px] h-[94px]"
        />
        <div className="pr-4">
          <p className="font-medium text-[16px] text-center">Bakmi Effata</p>
          <div className="flex items-center">
            <img src="../icon/star.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px]">4.8/5.0 (300+)</p>
          </div>
          <div className="flex items-center">
            <img src="../icon/price.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px]">15000-30000</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FoodRestorant;
