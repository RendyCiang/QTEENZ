import React, { useEffect, useState } from "react";
import FoodRestorant from "./FoodRestorant";
import { Link } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import Skeleton from "react-loading-skeleton";

function RestoranSubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;

      if (dataFilter !== "") {
        const filteredMenu = menus.filter((item: VendorMenuItem) =>
          item.vendor.name.toLowerCase().includes(dataFilter.toLowerCase())
        );
        setAllMenus(filteredMenu);
      } else {
        setAllMenus(menus);
      }
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

  if (isLoading) {
    return (
      <>
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
              <Skeleton width={400} height={40} />
            </p>
            <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 hover:underline">
              <Link to={`/customer/allrestorant`}>
                <Skeleton width={200} height={40} />
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-md:pb-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full h-[150px]">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-[32px] max-md:text-[24px] my-6 border-b-4 border-primary inline-block">
            Restoran
          </p>
          <p className="font-semibold text-[14px] cursor-pointer  hover:underline">
            <Link to={`/customer/allrestorant`}>Lihat semua</Link>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-md:pb-10">
          {/* {Array.from({ length: 10 }).map((_, idx) => (
            <FoodRestorant />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : Object.keys(groupByVendor).length === 0 ? (
            <p className="text-gray-500 text-[14px] text-nowrap">
              Kategori tidak ditemukan
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

export default RestoranSubPage;
