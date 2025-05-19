import React, { useEffect, useState } from "react";
import FoodRestorant from "./FoodRestorant";
import { Link } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";

function RestoranSubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;

      if (dataFilter !== "") {
        const filteredMenu = menus.filter(
          (item: VendorMenuItem) =>
            item.name &&
            item.name.toLowerCase().includes(dataFilter.toLowerCase())
        );
        setAllMenus(filteredMenu);
        return;
      }
      setAllMenus(menus);
    }
  }, [data, dataFilter]);

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

export default RestoranSubPage;
