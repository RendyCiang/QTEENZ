import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// const vendors = [{ id: 1, name: "Bakmi Effatta", menuCount: 10 }];

function AllMenuEachVendor() {
  const { id } = useParams();
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);

  //Filter dlu
  const vendorMenus = allMenus.filter((item) => item.vendorId === id);
  const vendorName = vendorMenus[0]?.vendor?.name ?? "Vendor Name";

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

        {/* Namanya */}
        <div className="flex justify-between items-center">
          <p className="font-semibold mt-8 mb-4 text-[32px] max-md:text-[24px]">
            {vendorName} Menu
          </p>
        </div>

        {/* Konten */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : (
            vendorMenus.map((item) => (
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

export default AllMenuEachVendor;
