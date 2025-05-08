import FoodMenu from "@/components/food/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const category = [{ id: 1, name: "Bakmi", menuCount: 10 }];

function EachCategoryMenu() {
  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        <div className="flex pb-4">
          <ChevronLeft className="text-gray" />
          <Link
            to={`/customer/food`}
            className="text-[16px] font-medium text-gray cursor-pointer"
          >
            Kembali
          </Link>
        </div>

        <SearchFilterComponent />

        {/* Content untuk setiap vendor */}
        {category.map((category) => (
          <div key={category.id}>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[32px] mt-8 mb-4 max-md:text-[24px]">
                Kategori {category.name}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: category.menuCount }).map((_, idx) => (
                <FoodMenu key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EachCategoryMenu;
