import NavbarMain from "@/components/general/NavbarMain";
import { ArrowRight, Search } from "lucide-react";
import React, { useState } from "react";
import FoodMenu from "../../../components/food/FoodMenu";
import FoodRestorant from "../../../components/food/FoodRestorant";
import FoodCategory from "../../../components/food/FoodCategory";
import { Link } from "react-router-dom";

function FoodPages() {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { name: "Bakmi", img: "/Bakmi.png" },
    { name: "Nasi", img: "/Nasi.png" },
    { name: "Dessert", img: "/Dessert.png" },
    { name: "Snack", img: "/Snack.png" },
    { name: "Jus", img: "/Jus.png" },
    { name: "Minuman", img: "/Minuman.png" },
    { name: "Bakmi", img: "/Bakmi.png" },
    { name: "Nasi", img: "/Nasi.png" },
    { name: "Dessert", img: "/Dessert.png" },
    { name: "Snack", img: "/Snack.png" },
    { name: "Jus", img: "/Jus.png" },
    { name: "Minuman", img: "/Minuman.png" },
  ];
  return (
    <>
      <NavbarMain />
      <div className="px-8 pt-4 pb-10 bg-background">
        {/* Search */}
        <div className=" flex items-center gap-2 w-m h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
          <Search className="w-[16px] text-gray" />
          <input
            type="text"
            className="text-[14px] text-black outline-none w-full"
            placeholder="Cari sesuatu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between h-fit w-max[1440px] my-10 bg-primary rounded-[8px] py-8 max-md:flex-col-reverse">
          <div className="pl-10 flex flex-col max-md:px-4 gap-4">
            <div className="mb-2">
              <p className="text-[32px] font-semibold text-white max-md:text-[24px] max-md:text-center">
                Bingung cari makanan?
              </p>
              <p className="text-[32px] font-semibold text-white max-md:text-[24px] max-md:text-center">
                Cari QTEENZ!
              </p>
            </div>
            <div className="flex justify-start max-md:justify-center">
              <div className="h-fit py-2 w-fit px-8 flex justify-center items-center bg-white rounded-[8px] hover:bg-gray-200 cursor-pointer">
                <Link
                  to={`/customer/allmenu`}
                  className="text-[14px] font-medium"
                >
                  Eksplor
                </Link>
                <ArrowRight className="rotate-320 ml-2" />
              </div>
            </div>
          </div>
          <div className="pr-10  max-md:px-4">
            <img src="../icon/FoodHeader.png" alt="" />
          </div>
        </div>

        {/* Content */}
        {/* Kategori */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[32px] max-md:text-[24px] mb-6">
              Kategori
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
            {Array.from({ length: 14 }).map((_, idx) => (
              <FoodCategory key={idx} />
            ))}
          </div>
        </div>

        {/* Menu */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
              Menu
            </p>
            <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
              <Link to={`/customer/allmenu`}>Lihat semua</Link>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <FoodMenu />
            ))}
          </div>
        </div>

        {/* Restoran terdekat */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
              Restoran terdekat
            </p>
            <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
              <Link to={`/customer/allrestorant`}>Lihat semua</Link>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {Array.from({ length: 10 }).map((_, idx) => (
              <FoodRestorant />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodPages;
