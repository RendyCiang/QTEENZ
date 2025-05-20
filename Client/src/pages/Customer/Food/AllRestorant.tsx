import FoodRestorant from "@/components/food/Display Restorant/FoodRestorant";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AllRestorant() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);

  const searchMenu = allMenus.filter((item) =>
    item.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupByVendor = searchMenu.reduce(
    (acc, item) => {
      const vendorId = item.vendorId;
      if (!acc[vendorId]) {
        acc[vendorId] = {
          vendorName: item.vendor.name,
          vendorRating: item.vendor.rating,
          imageUrl: item.photo,
          prices: [],
        };
      }

      //Kumpulin harga
      const variantPrices = item.menuVariants.map((variant) => variant.price);
      acc[vendorId].prices.push(...variantPrices);

      return acc;
    },
    {} as Record<
      string,
      {
        vendorName: string;
        vendorRating: number;
        imageUrl: string;
        prices: number[];
      }
    >
  );
  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10  bg-background h-screen">
        <div className="flex pb-4">
          <ChevronLeft className="text-gray" />
          <p
            className="text-[16px] font-medium text-gray cursor-pointer"
            onClick={(e) => navigate(-1)}
          >
            Kembali
          </p>
        </div>

        <div className="flex items-center gap-2 w-full h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
          <Search className="w-[16px] text-gray" />
          <input
            type="text"
            className="text-[14px] text-black outline-none w-full"
            placeholder="Cari sesuatu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content untuk setiap vendor */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* {Array.from({ length: 10 }).map((_, idx) => (
            <FoodRestorant />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : searchMenu.length === 0 ? (
            <p className="text-gray-500 text-[14px] text-nowrap">
              Restoran tidak ditemukan
            </p>
          ) : (
            Object.entries(groupByVendor).map(([vendorId, vendor]) => (
              <FoodRestorant
                key={vendorId}
                vendorId={vendorId}
                vendor_name={vendor.vendorName}
                vendor_rating={vendor.vendorRating}
                menuPrices={vendor.prices}
                imageUrl={vendor.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AllRestorant;
