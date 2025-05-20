import HistoryMenuContainer from "@/components/food/Display Menu/HistoryMenuContainer";
import NavbarMain from "@/components/general/NavbarMain";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import FoodMenu from "@/components/food/Display Menu/FoodMenu";

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  console.log("Test");
  console.log(data);

  useEffect(() => {
    if (data) {
      const menu = data.data;

      setAllMenus(menu);
    }
  }, [data]);

  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        {/* Search */}
        <div className=" flex items-center gap-2 w-m h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
          <Search className="w-[16px] text-gray" />
          <input
            type="text"
            className="text-[14px] text-black outline-none w-full"
            placeholder="Cari sesuatu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : (
            allMenus.map((item: VendorMenuItem) => (
              <HistoryMenuContainer
                key={item.id}
                menu_name={item.name}
                vendor_name={item.vendor.name ?? "Null"}
                vendor_price={item.menuVariants?.[0]?.price ?? 0}
                purchase_number={0} // BLM MASUKIN PURCHASE NUMBER
                imageUrl={item.photo}
              />
            ))
          )}
        </div>

        <div className="pt-12 flex flex-row justify-center">
          {isLoading ? (
            <></>
          ) : (
            <p className="text-gray-400">Sudah Menampilkan Semuanya</p>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
}

export default HistoryPage;
