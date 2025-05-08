import React from "react";
import { Link } from "react-router-dom";

function FoodMenu() {
  return (
    <Link to={`/customer/detailmenu/:id`}>
      <div className=" rounded-[8px] overflow-hidden bg-white cursor-pointer h-fit hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)] ">
        <img
          src="/icon/Bakmi2.png"
          alt=""
          className="w-full h-[full] object-cover max-md:h-[120px]"
        />
        <div className="px-3 py-3 w-full max-md:w-[130px]">
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold max-md:text-[14px]">
              Bakmi Ayam
            </p>

            <div className="flex gap-2">
              <p className="text-[14px] font-normal text-gray max-md:text-[12px]">
                Bakmi Effatta{" "} |
              </p>
              <div className="flex items-center">
                <img src="/icon/star.png" alt="" className="w-4 h-4 mr-1 " />
                <p className="text-gray text-[14px] max-md:text-[12px]">
                  4.8/5.0
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-semibold text-primary max-md:text-[14px]">
                Rp. 25.000
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
