import React from "react";
import { Icon } from "@iconify/react";
import useFetchData from "@/hooks/useFetchData";
import {
  KeuanganPayload,
  ReviewVendorSpecifiedPayload,
  GetVendorByIdPayload,
} from "@/types/types";
import { useParams } from "react-router-dom";

type TopItem = {
  id: string;
  name: string;
  sold: number;
  photo: string;
};

const DashboardSatisfactionSection = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: vendorData,
    isLoading: vendorLoading,
    error: vendorError,
  } = useFetchData<GetVendorByIdPayload>(`/vendors/get-vendor/${id}`);
  console.log("Vendor data:", vendorData);
  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
  } = useFetchData<ReviewVendorSpecifiedPayload>(`/reviews/get-review/${id}`);

  const {
    data: historyData,
    isLoading: historyLoading,
    error: historyError,
  } = useFetchData<KeuanganPayload>("/history/get-vendor-history");

  if (vendorLoading || reviewLoading || historyLoading) {
    return (
      <div className="flex flex-col gap-5">
        {/* Skeleton */}
        <div className="bg-white rounded-lg p-5 border border-primary-4th flex flex-col gap-6 flex-grow">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="flex items-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-full h-full bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton TOp 3 Items */}
        <div className="bg-white rounded-lg p-5 border border-primary-4th flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (vendorError || reviewError || historyError) {
    return <div>Error loading data</div>;
  }

  if (!vendorData || !historyData) {
    return <div>No data available</div>;
  }

  // Total Reviews (BackEnd Ga Sediain)
  const totalReviews = historyData.data.filter(
    (item) => item.review != null
  ).length;

  // Top Selling
  const menuQuantities: {
    [key: string]: { name: string; sold: number; id: string; photo: string };
  } = {};

  historyData.data.forEach((item) => {
    if (item.vendor.name === vendorData.data?.name) {
      item.order.orderItem.forEach((orderItem) => {
        const menuName = orderItem.menuVariant.menu.name;
        const menuId = orderItem.menuVariant.menu.name;
        const menuPhoto =
          orderItem.menuVariant.menu.photo || "https://via.placeholder.com/64";
        if (!menuQuantities[menuName]) {
          menuQuantities[menuName] = {
            id: menuId,
            name: menuName,
            sold: 0,
            photo: menuPhoto,
          };
        }
        menuQuantities[menuName].sold += orderItem.quantity;
      });
    }
  });

  const topItems: TopItem[] = Object.values(menuQuantities)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      name: item.name,
      sold: item.sold,
      photo: item.photo,
    }));

  const rating = vendorData.data?.rating || 0;
  console.log("Rating:", rating);
  const percentage = (rating / 5) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Kepuasan Pengguna  */}
      <div className="bg-white rounded-lg p-5 border border-primary-4th flex flex-col gap-6 flex-grow">
        <h3 className="text-lg font-semibold">Kepuasan Pengguna</h3>
        <div className="flex items-center">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{rating}/5.0</span>
            </div>
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full transform scale-x-[-1]"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-tosca-element)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FF5733"
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="text-base">Dari {totalReviews} pengguna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton TOp 3 Items */}
      <div className="bg-white rounded-lg p-5 border border-primary-4th flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            3 Item Terlaris
            <Icon
              icon="mdi:trending-up"
              className="text-2xl ml-2 text-primary"
            />
          </h2>
        </div>
        <div className="space-y-4">
          {topItems.length > 0 ? (
            topItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray">{item.sold} sold</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray">No items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSatisfactionSection;
