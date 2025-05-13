import FoodRestorant from "@/components/food/Display Restorant/FoodRestorant";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllRestorant() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);

  const groupByVendor = allMenus.reduce(
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
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background h-screen">
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* {Array.from({ length: 10 }).map((_, idx) => (
            <FoodRestorant />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
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
