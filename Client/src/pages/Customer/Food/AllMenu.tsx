import React, { useState } from "react";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarMain from "@/components/general/NavbarMain";
import FoodMenu from "@/components/food/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";

// Contoh data vendor, bisa diganti dengan data dari API
const vendors = [
  { id: 1, name: "Bakmi Effatta", menuCount: 10 },
  { id: 2, name: "Good Waffle", menuCount: 8 },
  { id: 3, name: "Nasi Goreng Pinangsia", menuCount: 12 },
];

function AllMenu() {
  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 max-md:mt-4 mt-4">
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
        {vendors.map((vendor) => (
          <div key={vendor.id}>
            <div className="flex justify-between items-center mt-8 mb-4">
              <p className="font-semibold text-[32px] max-md:text-[24px]">
                {vendor.name}
              </p>
              <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
                <Link to={`/customer/allmenu/${vendor.id}`}>Lihat Semua</Link>
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

export default AllMenu;
