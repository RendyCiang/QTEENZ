import { GroupedMenus, VendorMenuItem } from "@/types/types";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

type MenuProps = {
  vendorId: string;
  vendor_name: string;
  vendor_rating: number;
  menuPrices: number[];
  imageUrl: string;
};

function formatPrice(price: number): string {
  return price.toLocaleString("id-ID");
}

function FoodRestorant({
  vendorId,
  vendor_name,
  menuPrices,
  vendor_rating,
  imageUrl,
}: MenuProps) {
  const minPrice = Math.min(...menuPrices);
  const maxPrice = Math.max(...menuPrices);

  // const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  // const groupMenu: GroupedMenus = allMenus.reduce((acc, item) => {
  //   const vendorId = item.vendorId;
  //   if (!acc[vendorId]) {
  //     acc[vendorId] = {
  //       vendorName: item.vendor.name,
  //       vendorRating: item.vendor.rating,
  //       menus: [],
  //     };
  //   }
  //   acc[vendorId].menus.push(item);
  //   return acc;
  // }, {} as GroupedMenus);

  return (
    <Link to={`/customer/allmenu/${vendorId}`}>
      <div className="flex flex-row items-center pl-4 py-4 gap-6 bg-white rounded-lg h-fit cursor-pointer hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)]  max-md:flex-col max-md:gap-1">
        <img
          src={imageUrl}
          alt="Kategori"
          className="w-[94px] h-[94px] rounded-full max-md:w-[64px] max-md:h-[64px]"
        />
        <div className="pr-4">
          <p className="font-medium text-[16px] max-md:text-[14px]">
            {vendor_name}
          </p>
          <div className="flex items-center">
            <img src="../icon/star.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px] max-md:text-[12px]">
              {vendor_rating}/5.0 (300+)
            </p>
          </div>
          <div className="flex items-center">
            <img src="../icon/price.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px] max-md:text-[12px]">
              {formatPrice(minPrice)}-{formatPrice(maxPrice)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FoodRestorant;
