import NavbarMain from "@/components/general/NavbarMain";
import { ArrowRight, ArrowUpRight, Search, Star } from "lucide-react";
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
          <div className="my-10 flex justify-between max-md:flex-col-reverse">
            {/* kiri */}
            <div className="flex flex-col gap-6 max-md:gap-2 max-md:items-center max-md:text-center ">
              <div >
                <p className="font-bold text-[40px] max-md:text-[24px]">
                  Bingung cari makanan?
                </p>
                <div className="flex gap-2 max-md:justify-center">
                  <p className="font-bold text-[40px] max-md:text-[24px]">
                    Cari
                  </p>
                  <p className="font-bold text-[40px] text-primary max-md:text-[24px]">
                    QTEENZ
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium max-md:text-[14px] ">
                  Pilih makanan favoritmu dan ambil di kantin
                  <br />
                  tanpa perlu mengantri terlalu lama!
                </p>
              </div>
              <div>
                <button className="flex gap-2 rounded-[8px] bg-primary py-2 px-10 text-white hover:bg-primary-2nd">
                  <Link to={"/customer/allmenu"}>Menu</Link>
                  <ArrowUpRight />
                </button>
              </div>
            </div>

            {/* Kanan */}
            <div>
              <img
                src="/user/foodpageheader.svg
              "
                alt=""
              />
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
