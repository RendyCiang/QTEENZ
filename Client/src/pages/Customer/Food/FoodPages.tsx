import NavbarMain from "@/components/general/NavbarMain";
import { ArrowRight, Search, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import FoodRestorant from "../../../components/food/Display Restorant/FoodRestorant";
import { Link } from "react-router-dom";
import CategorySubPage from "@/components/food/Display Category/CategorySubPage";
import MenuSubPage from "@/components/food/Display Menu/MenuSubPage";
import RestoranSubPage from "@/components/food/Display Restorant/RestoranSubPage";
import Review from "@/components/food/Review";

function FoodPages() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <NavbarMain />
      <div className="px-8 pt-4 pb-10 bg-background min-h-[92vh]">
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
        <div>
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

        {/* Kategori */}
        <CategorySubPage dataFilter={searchTerm} />

        {/* Menu */}
        <MenuSubPage dataFilter={searchTerm} />

        {/* Restoran terdekat */}
        <RestoranSubPage dataFilter={searchTerm} />
        </div>
      </div>
    </>
  );
}

export default FoodPages;
