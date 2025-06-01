import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import {
  APIPayload,
  VendorMenuItem,
  VendorMenuItemPayload,
} from "@/types/types";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";

function EachCategoryMenu() {
  const [searchName, setSearchName] = useState<string>("");
  const { data, isLoading, error } =
    useFetchData<APIPayload<VendorMenuItem[]>>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");
  console.log(data);

  useEffect(() => {
    if (data) {
      const menu = data.data;
      setAllMenus(menu);
    }
  }, [data]);

  const categoryMenu = allMenus.filter((item) => item.categoryId === id);
  const categoryName = categoryMenu[0]?.category?.name ?? "";

  let filteredCategoryMenu = categoryMenu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "lowest") {
    filteredCategoryMenu = filteredCategoryMenu.sort(
      (a, b) =>
        (a.menuVariants?.[0]?.price ?? 0) - (b.menuVariants?.[0]?.price ?? 0)
    );
  } else if (sortOption === "highest") {
    filteredCategoryMenu = filteredCategoryMenu.sort(
      (a, b) =>
        (b.menuVariants?.[0]?.price ?? 0) - (a.menuVariants?.[0]?.price ?? 0)
    );
  }

  if (isLoading) {
    return (
      <>
        <NavbarMain />
        <div className="pl-8 pr-8 pb-10 bg-background max-md:pt-5">
          <div className="flex pb-4">
            <ChevronLeft className="text-gray" />
            <p
              className="text-[16px] font-medium text-gray cursor-pointer"
              onClick={(e) => navigate(-1)}
            >
              Kembali
            </p>
          </div>

          <SearchFilterComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {/* Content untuk setiap vendor */}

          <div className="flex justify-between flex-col">
            <p className="font-semibold text-[32px] mt-8 mb-4 max-md:text-[24px]">
              <Skeleton width={400} height={40} />
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full h-[200px]">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-0 bg-background h-screen">
        <div className="flex pb-4">
          <ChevronLeft className="text-gray" />
          <p
            className="text-[16px] font-medium text-gray cursor-pointer"
            onClick={(e) => navigate(-1)}
          >
            Kembali
          </p>
        </div>

        <SearchFilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

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
            ) : filteredCategoryMenu.length === 0 ? (
              <p className="text-gray-500 text-[14px] text-nowrap">
                Kategori {categoryName} tidak ditemukan
              </p>
            ) : (
              filteredCategoryMenu.map((item) => (
                <FoodMenu
                  key={item.id}
                  id={item.id}
                  menu_name={item.name}
                  vendor_name={item.vendor.name ?? "Null"}
                  vendor_price={item.menuVariants?.[0]?.price ?? 0}
                  vendor_rating={item.vendor.rating ?? 0}
                  imageUrl={item.photo}
                  dataFilter={searchTerm}
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
