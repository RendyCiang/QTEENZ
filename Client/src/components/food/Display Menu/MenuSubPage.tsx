import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodMenu from "./FoodMenu";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import Skeleton from "react-loading-skeleton";

function MenuSubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(data);

  useEffect(() => {
    if (data) {
      const menu = data.data;
      console.log(data.data);

      if (dataFilter !== "") {
        const filteredMenu = menu.filter((item: VendorMenuItem) =>
          item.name.toLowerCase().includes(dataFilter.toLowerCase())
        );
        setAllMenus(filteredMenu);
        return;
      }

      setAllMenus(menu);
    }
  }, [data, dataFilter]);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
            <Skeleton width={400} height={40} />
          </p>
          <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 hover:underline">
            <Link to={`/customer/allmenu`}>
              <Skeleton width={200} height={40} />
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-[200px]">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
            Menu
          </p>
          <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 hover:underline">
            <Link to={`/customer/allmenu`}>Lihat semua</Link>
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* {Array.from({ length: 10 }).map((_, idx) => (
            <FoodMenu />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : allMenus.length === 0 ? (
            <p className="text-gray-500 text-[14px] text-nowrap">
              Menu tidak ditemukan
            </p>
          ) : (
            allMenus.map((item: VendorMenuItem) => (
              <FoodMenu
                dataFilter={searchTerm}
                key={item.id}
                id={item.id}
                menu_name={item.name}
                vendor_name={item.vendor.name ?? "Null"}
                vendor_price={item.menuVariants?.[0]?.price ?? 0}
                vendor_rating={item.vendor.rating ?? 0}
                imageUrl={item.photo}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MenuSubPage;
