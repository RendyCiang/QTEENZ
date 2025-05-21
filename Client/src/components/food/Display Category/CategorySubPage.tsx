import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import React, { useEffect, useState } from "react";
import FoodCategory from "./FoodCategory";
import Skeleton from "react-loading-skeleton";

function CategorySubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("/menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);

      const uniqCategoryMap = new Map<
        string,
        { id: string; name: string; imageUrl: string }
      >();

      menus.forEach((item) => {
        if (!uniqCategoryMap.has(item.categoryId)) {
          uniqCategoryMap.set(item.categoryId, {
            id: item.categoryId,
            name: item.category?.name ?? "Unknown",
            imageUrl: item.photo,
          });
        }
      });

      let uniqueCategories = Array.from(uniqCategoryMap.values());

      if (dataFilter !== "") {
        uniqueCategories = uniqueCategories.filter((category) =>
          category.name.toLowerCase().includes(dataFilter.toLowerCase())
        );
      }

      setCategories(uniqueCategories);
    }
  }, [data, dataFilter]);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[32px] max-md:text-[24px] mb-6">
            <Skeleton width={400} height={40} />
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-[120px]">
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
          <p className="font-semibold text-[32px] max-md:text-[24px] mb-6">
            Kategori
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-[14px] text-nowrap">
              Kategori tidak ditemukan
            </p>
          ) : (
            categories.map((item) => (
              <FoodCategory
                key={item.id}
                vendor_category={item.name}
                imageUrl={item.imageUrl}
                categoryId={item.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CategorySubPage;
