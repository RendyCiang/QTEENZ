import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarMain from "@/components/general/NavbarMain";
import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import useFetchData from "@/hooks/useFetchData";
import {
  GroupedMenus,
  VendorMenuItem,
  VendorMenuItemPayload,
} from "@/types/types";

function AllMenu() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  const groupMenu: GroupedMenus = allMenus.reduce((acc, item) => {
    const vendorId = item.vendorId;
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendorName: item.vendor.name,
        vendorRating: item.vendor.rating,
        menus: [],
      };
    }
    acc[vendorId].menus.push(item);
    return acc;
  }, {} as GroupedMenus);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);
  console.log(data);
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

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error Fetching Data</p>
        ) : (
          Object.entries(groupMenu).map(([vendorId, { vendorName, menus }]) => (
            <div key={vendorId} className="mb-8">
              <div className="flex justify-between items-center mt-8 mb-4">
                <p className="font-semibold text-[32px] max-md:text-[24px]">
                  {vendorName}
                </p>
                <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
                  <Link to={`/customer/allmenu/${vendorId}`}>Lihat Semua</Link>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {menus.map((item) => (
                  <FoodMenu
                    key={item.id}
                    menu_name={item.name}
                    vendor_name={item.vendor.name ?? "Null"}
                    vendor_price={item.menuVariants?.[0]?.price ?? 0}
                    vendor_rating={item.vendor.rating ?? 0}
                    imageUrl={item.photo}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AllMenu;
