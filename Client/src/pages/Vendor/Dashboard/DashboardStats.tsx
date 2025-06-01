import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  KeuanganPayload,
  OrderVendorPayload,
  ToggleVisibilityProps,
} from "@/types/types";
import useFetchData from "@/hooks/useFetchData";

const DashboardStats = () => {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useFetchData<OrderVendorPayload>("/orders/get-orders-vendor");

  const {
    data: historyData,
    isLoading: historyLoading,
    error: historyError,
  } = useFetchData<KeuanganPayload>("/history/get-vendor-history");

  console.log("Orders Data:", ordersData);
  console.log("History Data:", historyData);

  const calculateDashboardStats = () => {
    const orders = ordersData?.orders || [];
    const now = new Date();

    const ordersWithDate = orders.map((order) => {
      const createAt = new Date(order.createAt);
      if (isNaN(createAt.getTime())) {
        console.warn(
          `Invalid createdAt for order ${order.orderId}: ${order.createAt}`
        );
        return { ...order, createAt: new Date() };
      }
      return { ...order, createAt };
    });

    const todayOrders = ordersWithDate.filter((order) =>
      isSameDay(order.createAt, now)
    );
    const yesterdayOrders = ordersWithDate.filter((order) =>
      isYesterday(order.createAt)
    );
    const thisWeekOrders = ordersWithDate.filter((order) =>
      isThisWeek(order.createAt)
    );
    const lastWeekOrders = ordersWithDate.filter((order) =>
      isLastWeek(order.createAt)
    );

    const newOrdersToday = todayOrders.filter(
      (order) => order.status === "Pending"
    ).length;
    const newOrdersYesterday = yesterdayOrders.filter(
      (order) => order.status === "Pending"
    ).length;

    const totalOrdersToday = todayOrders.length;
    const totalOrdersYesterday = yesterdayOrders.length;

    const processingOrdersToday = todayOrders.filter(
      (order) =>
        order.status === "Accepted" || order.statusPickup === "Cooking"
    ).length;
    const processingOrdersYesterday = yesterdayOrders.filter(
      (order) =>
        order.status === "Accepted" || order.statusPickup === "Cooking"
    ).length;

    const totalEarnings = historyData?.totalEarnings || 0;

    const totalEarningsThisWeek = thisWeekOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );
    const totalEarningsLastWeek = lastWeekOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    const calculatePercentageChange = (today: number, yesterday: number) => {
      if (yesterday === 0) return "0%";
      const change = ((today - yesterday) / yesterday) * 100;
      return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
    };

    return [
      {
        count: newOrdersToday,
        percentage: calculatePercentageChange(
          newOrdersToday,
          newOrdersYesterday
        ),
      },
      {
        count: totalOrdersToday,
        percentage: calculatePercentageChange(
          totalOrdersToday,
          totalOrdersYesterday
        ),
      },
      {
        count: processingOrdersToday,
        percentage: calculatePercentageChange(
          processingOrdersToday,
          processingOrdersYesterday
        ),
      },
      {
        count: totalEarnings,
        percentage: calculatePercentageChange(
          totalEarnings,
          totalEarningsLastWeek
        ),
      },
    ];
  };

  const isLoading = ordersLoading || historyLoading;
  const error = ordersError || historyError;

  const dashboardStats = ordersData?.orders?.length
    ? calculateDashboardStats()
    : [
        { count: 0, percentage: null },
        { count: 0, percentage: null },
        { count: 0, percentage: null },
        { count: 0, percentage: null },
      ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg p-5 h-32"
            ></div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">Error: {(error as Error).message}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
      {/* Orderan Baru */}
      <div className="bg-primary text-white rounded-lg p-5 flex flex-col gap-2">
        <div className="flex items-center mb-4 gap-4">
          <div className="flex bg-white w-[44px] h-[44px] justify-center items-center rounded-full text-black">
            <Icon icon="mdi:bell-outline" className="text-2xl" />
          </div>
          <span className="font-medium text-xl">Orderan Baru</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-semibold">
              {dashboardStats[0].count}
            </h2>
            <p className="text-base">*Diperbarui setiap orderan baru</p>
          </div>
        </div>
      </div>

      {/* Total Orderan */}
      <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-2">
        <div className="flex items-center mb-4 gap-4">
          <div className="flex bg-primary/10 w-[44px] h-[44px] justify-center items-center rounded-full text-primary">
            <Icon icon="bx:list-check" className="text-3xl ml-1" />
          </div>
          <span className="font-medium text-xl">Total Orderan</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-semibold">
              {dashboardStats[1].count}
            </h2>
            <div className="flex justify-start items-start flex-wrap break-words">
              {dashboardStats[1].percentage && (
                <span className="text-sm font-medium flex text-white bg-primary px-2 py-0.5 rounded-lg">
                  {dashboardStats[1].percentage}
                </span>
              )}
              <span className="text-base ml-2">dibanding kemarin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sedang Diproses */}
      <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-4">
        <div className="flex items-center mb-2 gap-4">
          <div className="flex bg-primary/10 w-[44px] h-[44px] justify-center items-center rounded-full text-primary">
            <Icon icon="mdi:clock-outline" className="text-2xl" />
          </div>
          <span className="font-medium text-xl">Sedang Diproses</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-semibold">
              {dashboardStats[2].count}
            </h2>
            <div className="flex justify-start items-start flex-wrap break-words">
              {dashboardStats[2].percentage && (
                <span className="text-sm font-medium flex text-white bg-primary px-2 py-0.5 rounded-lg">
                  {dashboardStats[2].percentage}
                </span>
              )}
              <span className="text-base ml-2">dibanding kemarin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Pendapatan */}
      <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-4">
        <div className="flex items-center mb-2 gap-4">
          <div className="flex bg-primary/10 w-[44px] h-[44px] justify-center items-center rounded-full text-primary">
            <Icon icon="mdi:currency-usd" className="text-2xl" />
          </div>
          <span className="font-medium text-xl">Total Pendapatan</span>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <div className="flex gap-4 items-center">
              <ToggleVisibility value={dashboardStats[3].count} />
            </div>
          </div>
          <div className="flex justify-start items-center flex-wrap break-words">
            <p className="text-base mr-2">dibanding minggu lalu</p>
            <div className="flex items-center">
              {dashboardStats[3].percentage && (
                <span className="text-sm font-medium flex text-white bg-primary px-2 py-0.5 rounded-lg">
                  {dashboardStats[3].percentage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ToggleVisibility({ value }: ToggleVisibilityProps) {
  const [visible, setVisible] = useState(true);
  const numericValue = typeof value === "number" ? value : 0;
  return (
    <div>
      <div className="flex gap-4 items-center">
        <h2 className="text-4xl font-semibold">
          {visible ? (
            <span className="text-black">{`Rp. ${numericValue.toLocaleString(
              "id-ID"
            )}`}</span>
          ) : (
            <span className="text-gray-400">••••••••</span>
          )}
        </h2>
        <button
          onClick={() => setVisible(!visible)}
          aria-label="Toggle visibility"
        >
          <Icon
            icon={visible ? "mdi:eye" : "mdi:eye-off"}
            className={`text-xl cursor-pointer ${
              visible ? "text-black" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
}

function isThisWeek(date: Date) {
  const now = new Date();
  const firstDayOfWeek = new Date(now);
  firstDayOfWeek.setDate(now.getDate() - now.getDay());
  return date >= firstDayOfWeek && date <= now;
}

function isLastWeek(date: Date) {
  const now = new Date();
  const firstDayOfThisWeek = new Date(now);
  firstDayOfThisWeek.setDate(now.getDate() - now.getDay());
  const firstDayOfLastWeek = new Date(firstDayOfThisWeek);
  firstDayOfLastWeek.setDate(firstDayOfThisWeek.getDate() - 7);
  const lastDayOfLastWeek = new Date(firstDayOfThisWeek);
  lastDayOfLastWeek.setDate(firstDayOfThisWeek.getDate() - 1);
  return date >= firstDayOfLastWeek && date <= lastDayOfLastWeek;
}

export default DashboardStats;
