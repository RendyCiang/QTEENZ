import FoodRestorant from "@/components/food/FoodRestorant";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AllRestorant() {
  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <FoodRestorant />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllRestorant;
