import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import React, { useEffect, useState } from "react";
import FoodCategory from "./FoodCategory";

function CategorySubPage() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("/menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);

  console.log(data);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);

      const uniqCategoryMap = new Map();

      menus.forEach((item) => {
        if (!uniqCategoryMap.has(item.categoryId)) {
          uniqCategoryMap.set(item.categoryId, {
            id: item.categoryId,
            name: item.category?.name,
            imageUrl: item.photo,
          });
        }
      });

      const uniqueCategories = Array.from(uniqCategoryMap.values());
      setAllMenus(menus);
      setCategories(uniqueCategories);
    }
  }, [data]);

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
