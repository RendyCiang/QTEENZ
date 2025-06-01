import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { OrderDetailPayload, OrderDetailVendorPayload } from "@/types/types";
import { roleStore } from "@/store/roleStore";

interface NotificationProps {
  count?: number;
  to?: string;
  onClick?: () => void;
  apiEndpoint?: string;
}
type FetchPayload = OrderDetailPayload | OrderDetailVendorPayload;
export default function Notification({
  count = 0,
  to,
  onClick,
  apiEndpoint = "/orders/get-orders-buyer",
}: NotificationProps) {
  const { data, isLoading, error } =
    useFetchData<OrderDetailPayload>(apiEndpoint);

  // Calculate pending count based on fetched data or fallback to prop
  const pendingCount =
    data?.orders?.filter((order) => order.status === "Pending").length ?? count;

  const content = (
    <div className="relative cursor-pointer group">
      <Icon
        icon="ion:notifcations"
        className="w-[32px] h-[32px] pt-2 mb-1.5 text-black group-hover:text-primary transition-colors duration-200"
      />
      {pendingCount >= 0 && (
        <p className="p-[2px] absolute flex right-0 top-0 text-[12px] w-5 h-5 rounded-full bg-primary text-white text-center justify-center items-center transition-colors duration-200">
          {pendingCount}
        </p>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
}
