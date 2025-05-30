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

  const groupedMenus = allMenus.reduce<Record<string, VendorMenuItem[]>>(
    (acc, item) => {
      const vendorName = item.vendor.name ?? "Vendor Tidak Diketahui";
      if (!acc[vendorName]) {
        acc[vendorName] = [];
      }
      acc[vendorName].push(item);
      return acc;
    },
    {}
  );

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
        <div className="flex items-center gap-2 w-m h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
          <Search className="w-[16px] text-gray" />
          <input
            type="text"
            className="text-[14px] text-black outline-none w-full"
            placeholder="Cari sesuatu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pt-8 space-y-10">
          {isLoading ? (
            <p className="pt-12">Loading...</p>
          ) : error ? (
            <p className="pt-12 text-red-500">Error Fetching Data</p>
          ) : (
            Object.entries(groupedMenus).map(([vendorName, menuItems]) => (
              <div key={vendorName}>
                <h2 className="font-semibold text-[32px] mb-4 max-md:text-[24px]">
                  {vendorName}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {menuItems.flatMap(
                    (item) =>
                      item.menuVariants?.map((variant, index) => (
                        <HistoryMenuContainer
                          key={`${item.id}-${index}`}
                          menu_name={item.name}
                          variant_name={variant.name}
                          vendor_price={variant.price}
                          purchase_number={0}
                          imageUrl={item.photo}
                        />
                      )) ?? []
                  )}
                </div>
              </div>
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
