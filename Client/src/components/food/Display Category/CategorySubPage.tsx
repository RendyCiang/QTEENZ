import useFetchData from "@/hooks/useFetchData";
import {
  CategoryItem,
  CategoryPayload,
  VendorMenuItem,
  VendorMenuItemPayload,
} from "@/types/types";
import React, { useEffect, useState } from "react";
import FoodCategory from "./FoodCategory";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function CategorySubPage({ dataFilter }: { dataFilter: string }) {
  const { data, isLoading, error } = useFetchData<CategoryPayload>(
    "/categorys/get-category"
  );

  const [allMenus, setAllMenus] = useState<CategoryItem[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);
  const [showAll, setShowAll] = useState(false); // NEW STATE

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);

      const uniqCategoryMap = new Map<
        string,
        { id: string; name: string; imageUrl: string }
      >();

      menus.forEach((item) => {
        if (!uniqCategoryMap.has(item.id)) {
          uniqCategoryMap.set(item.id, {
            id: item.id,
            name: item.name ?? "Unknown",
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
          <p className="font-bold text-[32px] max-md:text-[24px] my-6 inline-block">
            <Skeleton width={360} height={40} />
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-[240px]">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-[32px] max-md:text-[24px] my-6 border-b-4 border-primary inline-block">
          Kategori
        </p>
        <p
          className="font-semibold text-[14px] cursor-pointer hover:underline"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Tutup" : "Lihat Semua"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between">
        {error ? (
          <p>Error Fetching Data</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 text-[14px] text-nowrap">
            Kategori tidak ditemukan
          </p>
        ) : (
          (showAll ? categories : categories.slice(0, 4)).map((item) => (
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
  );
}

export default CategorySubPage;
