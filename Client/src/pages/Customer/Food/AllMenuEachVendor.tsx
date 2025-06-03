import FoodMenu from "@/components/food/Display Menu/FoodMenu";
import SearchFilterComponent from "@/components/food/SearchFilterComponent";
import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";

// const vendors = [{ id: 1, name: "Bakmi Effatta", menuCount: 10 }];

function AllMenuEachVendor() {
  const { id } = useParams();
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);

  //Filter dlu
  const vendorMenus = allMenus.filter((item) => item.vendorId === id);
  const vendorName = vendorMenus[0]?.vendor?.name ?? "Vendor Name";

  //Filter Search
  // Langkah 1: Filter berdasarkan vendorId
  let filteredMenu = allMenus.filter((item) => item.vendorId === id);

  filteredMenu = filteredMenu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "lowest") {
    filteredMenu = [...filteredMenu].sort(
      (a, b) =>
        (a.menuVariants?.[0]?.price ?? 0) - (b.menuVariants?.[0]?.price ?? 0)
    );
  } else if (sortOption === "highest") {
    filteredMenu = [...filteredMenu].sort(
      (a, b) =>
        (b.menuVariants?.[0]?.price ?? 0) - (a.menuVariants?.[0]?.price ?? 0)
    );
  }

  if (isLoading) {
    return (
      <>
        <NavbarMain />
        <div className="pl-8 pr-8 pb-10 max-md:mt-0 bg-background min-h-screen">
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

          {/* Namanya */}
          <div className="flex justify-between items-center">
            <p className="font-semibold mt-8 mb-4 text-[32px] max-md:text-[24px]">
              <Skeleton width={500} height={40} />
            </p>
          </div>

          {/* Konten */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full h-[200px]">
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
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:pt-5 bg-background min-h-screen">
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
          ) : filteredMenu.length === 0 ? (
            <p className="text-gray-500 text-[14px] text-nowrap">
              Menu tidak ditemukan
            </p>
          ) : (
            filteredMenu.map((item) => (
              <FoodMenu
                dataFilter={searchTerm}
                key={item.id}
                id={item.id}
                menu_name={item.name}
                vendor_name={item.vendor.name ?? "Null"}
                vendor_price={item.menuVariants?.[0]?.price ?? 0}
                menuVariants={item.menuVariants}
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
