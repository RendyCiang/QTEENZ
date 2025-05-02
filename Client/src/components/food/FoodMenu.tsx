import React from "react";
import { Link } from "react-router-dom";

function FoodMenu() {
  return (
    <Link to={`/customer/detailmenu/:id`}>
      <div className="border-1 border-primary-3rd rounded-[8px] overflow-hidden bg-white cursor-pointer hover:border-primary">
        <img
          src="/icon/Bakmi2.png"
          alt=""
          className="w-full h-[160px] object-cover"
        />
        <div className="flex items-end px-2 py-2 justify-between">
          <div className="flex flex-col">
            <p className="text-[16px] font-semibold">Bakmi Ayam</p>
            <p className="text-[14px]">Bakmi Effatta</p>
            <div className="flex items-center">
              <img src="/icon/star.png" alt="" className="w-4 h-4 mr-1" />
              <p className="text-gray text-[14px]">4.8/5.0 (300+)</p>
            </div>
          </div>
          <button className="w-[25px] h-[25px] rounded-full bg-primary text-white flex items-center justify-center cursor-pointer">
            +
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FoodMenu;
