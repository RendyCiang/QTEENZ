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
      <div className="flex flex-row bg-white rounded-lg cursor-pointer hover:shadow-[0px_4px_10px_0px_rgba(270,74,35,0.1)] h-[180px] overflow-hidden max-md:h-auto max-md:flex-col">
        <div className="w-1/2 h-full relative max-md:w-full max-md:h-[120px]">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={vendor_name}
            className="w-full h-full object-cover rounded-l-lg max-md:rounded-t-lg max-md:rounded-bl-none"
          />
        </div>

        <div className="w-1/2 p-4 flex flex-col justify-center max-md:w-full">
          <p className="font-semibold text-[24px] line-clamp-2 max-md:text-[18px]">
            {vendor_name}
          </p>

          <div className="flex items-center mt-3">
            <img src="../icon/star.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px]">{vendor_rating}/5.0 (300+)</p>
          </div>

          <div className="flex items-center mt-2">
            <img src="../icon/price.png" alt="" className="w-4 h-4 mr-1" />
            <p className="text-gray text-[14px]">
              {formatPrice(minPrice)}-{formatPrice(maxPrice)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FoodRestorant;
