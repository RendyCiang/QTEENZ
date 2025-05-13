import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EachCategoryMenu() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const { id } = useParams();
  console.log(data);

  useEffect(() => {
    if (data) {
      const menu = data.data;
      setAllMenus(menu);
    }
  }, [data]);

  const categoryMenu = allMenus.filter((item) => item.categoryId === id);
  const categoryName = categoryMenu[0]?.category?.name ?? "Category Name";

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

        <div className="flex justify-between flex-col">
          <p className="font-semibold text-[32px] mt-8 mb-4 max-md:text-[24px]">
            Kategori {categoryName}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error Fetching Data</p>
            ) : (
              categoryMenu.map((item) => (
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
      </div>
    </>
  );
}

export default EachCategoryMenu;
