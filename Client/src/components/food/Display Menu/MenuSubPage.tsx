import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodMenu from "./FoodMenu";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { Item } from "@radix-ui/react-dropdown-menu";

function MenuSubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  console.log(data);

  useEffect(() => {
    if (data) {
      const menu = data.data;

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
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
            Menu
          </p>
          <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
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
          ) : (
            allMenus.map((item: VendorMenuItem) => (
              <FoodMenu
                key={item.id}
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
