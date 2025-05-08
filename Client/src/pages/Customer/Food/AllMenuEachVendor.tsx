import FoodMenu from "@/components/food/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const vendors = [{ id: 1, name: "Bakmi Effatta", menuCount: 10 }];

function AllMenuEachVendor() {
  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        <div className="flex pb-4">
          <ChevronLeft className="text-gray" />
          <Link
            to={`/customer/allmenu`}
            className="text-[16px] font-medium text-gray cursor-pointer"
          >
            Kembali
          </Link>
        </div>

        <SearchFilterComponent />

        {/* Content untuk setiap vendor */}
        {vendors.map((vendor) => (
          <div key={vendor.id}>
            <div className="flex justify-between items-center">
              <p className="font-semibold mt-8 mb-4 text-[32px] max-md:text-[24px]">
                {vendor.name} Menu
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: vendor.menuCount }).map((_, idx) => (
                <FoodMenu key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllMenuEachVendor;
