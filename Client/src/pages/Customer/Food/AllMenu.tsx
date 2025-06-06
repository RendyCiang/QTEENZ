import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMain from "@/components/general/NavbarMain";
import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import useFetchData from "@/hooks/useFetchData";
import {
  GroupedMenus,
  VendorMenuItem,
  VendorMenuItemPayload,
} from "@/types/types";
import Skeleton from "react-loading-skeleton";

function AllMenu() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");

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

  // const groupMenuFilter = Object.entries(groupMenu).filter(
  //   ([_, vendor]) =>
  //     vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vendor.menus.some((menu) =>
  //       menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  // );

  let filteredMenu = allMenus.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "lowest") {
    filteredMenu = filteredMenu.sort(
      (a, b) =>
        (a.menuVariants?.[0]?.price ?? 0) - (b.menuVariants?.[0]?.price ?? 0)
    );
  } else if (sortOption === "highest") {
    filteredMenu = filteredMenu.sort(
      (a, b) =>
        (b.menuVariants?.[0]?.price ?? 0) - (a.menuVariants?.[0]?.price ?? 0)
    );
  }

  const groupMenuFilter: GroupedMenus = filteredMenu.reduce((acc, item) => {
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

  const groupMenuFilterEntries = Object.entries(groupMenuFilter);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);
  if (isLoading) {
    return (
      <>
        <NavbarMain />
        <div className="px-8 pb-10 bg-background h-full max-md:pt-5">
          <div className="flex pb-4">
            <ChevronLeft className="text-gray" />
            <p
              className="text-[16px] font-medium text-gray cursor-pointer"
              onClick={() => navigate(-1)}
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

          {[...Array(2)].map((_, vendorIndex) => (
            <div key={vendorIndex} className="mb-8">
              <div className="flex justify-between items-center mt-8 mb-4">
                <div className="w-[300px] h-[40px]">
                  <Skeleton className="w-full h-full rounded" />
                </div>
                <div className="w-[100px] h-[20px]">
                  <Skeleton className="w-full h-full rounded" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-full h-[200px]">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-0 bg-background h-full">
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

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error Fetching Data</p>
        ) : groupMenuFilterEntries.length === 0 ? (
          <p className="text-gray-500 text-[14px] text-nowrap mt-4">
            Menu tidak tersedia.
          </p>
        ) : (
          groupMenuFilterEntries.map(([vendorId, { vendorName, menus }]) => (
            <div key={vendorId} className="mb-8">
              <div className="flex justify-between items-center mt-8 mb-4">
                <p className="font-semibold text-[32px] max-md:text-[24px]">
                  {vendorName}
                </p>
                <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 hover:underline">
                  <Link to={`/customer/allmenu/${vendorId}`}>Lihat Semua</Link>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {menus.slice(0, 5).map((item) => (
                  <FoodMenu
                    dataFilter={searchTerm}
                    key={item.id}
                    id={item.id}
                    menu_name={item.name}
                    vendor_name={item.vendor.name ?? "Null"}
                    vendor_price={item.menuVariants?.[0]?.price ?? 0}
                    vendor_rating={item.vendor.rating ?? 0}
                    menuVariants={item.menuVariants}
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
