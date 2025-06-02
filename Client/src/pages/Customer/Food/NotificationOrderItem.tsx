import Button from "@/components/general/Button";
import useHandleUserOrder from "@/hooks/User/useHandleUserOrder";
import { OrderDetail } from "@/types/types";
import {
  formatToIndoTime,
  cn,
  formatUpdateDate,
  formatDate,
} from "@/utils/utils";
import { Check, PackageCheck, Timer, Utensils } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
type TimelineItem = {
  time: string | null | undefined; // allow string or null
  completed: boolean;
  label: string;
  key: string;
};

const getStatusText = (
  status: OrderDetail["status_pickup"],
  validasi: string,
  pembayaran: string
) => {
  if (validasi === "Declined") {
    return "Pesanan Dibatalkan";
  }

  if (pembayaran === "Pending") {
    return "Menunggu Pembayaran";
  }

  switch (status) {
    case "Cooking":
      return "Pesanan Sedang Dimasak";
    case "Ready":
      return "Pesanan Siap Diambil";
    case "Picked_Up":
      return "Pesanan Sudah Diambil";
    default:
      return "Status Tidak Diketahui";
  }
};

const getStepIcon = (key: string, completed: boolean) => {
  switch (key) {
    case "createAt":
      return (
        <Timer
          size={14}
          className={completed ? "text-white" : "text-gray-400"}
        />
      );
    case "updateAcceptedAt":
      return (
        <Utensils
          size={14}
          className={completed ? "text-white" : "text-gray-400"}
        />
      );
    case "updateReadyAt":
      return (
        <PackageCheck
          size={14}
          className={completed ? "text-white" : "text-gray-400"}
        />
      );
    case "updatePickedUpAt":
      return (
        <Check
          size={14}
          className={completed ? "text-white" : "text-gray-400"}
        />
      );
    default:
      return null;
  }
};

const steps = [
  { label: "Dibuat", key: "createAt" },
  { label: "Diterima", key: "updateAcceptedAt" },
  { label: "Siap", key: "updateReadyAt" },
  { label: "Diantar", key: "updatePickedUpAt" },
];

const NotificationOrderItem = ({ order }: { order: OrderDetail }) => {
  const { isLoadingHandleOrder, handleDeclineOrder, handleSelesaikanPesanan } =
    useHandleUserOrder();

  const [timeline, setTimeline] = useState<TimelineItem[]>(
    steps.map((step) => ({ ...step, time: null, completed: false }))
  );

  useEffect(() => {
    if (!order) return;

    setTimeline(
      steps.map((step) => {
        const timestamp = order[step.key as keyof OrderDetail];
        return {
          ...step,
          time: timestamp ? formatToIndoTime(String(timestamp)) : null,
          completed: Boolean(timestamp),
        };
      })
    );
  }, [order]);

  return (
    <>
      <Toaster />
      <div
        key={order.id}
        className="grid grid-cols-12 mt-8 max-md:grid-rows-10"
      >
        <div className="col-span-5 col-start-1 md:col-span-5 max-md:row-start-1 max-md:row-span-3 max-md:col-span-12 max-md:w-full">
          {/* Order Details */}
          <div className="mr-12 flex flex-col bg-white">
            <>
              <div className="grid grid-cols-12 pt-7 pb-3.5 px-3 md:px-7 items-center">
                <p className="col-span-7 col-start-1 font-semibold text-[1rem] md:text-2xl text-start self-center">
                  {order?.orderItem?.length > 0
                    ? order.orderItem[0]?.menuVariant?.menu?.vendor?.vendor_name
                    : "Nama Vendor"}
                </p>
                <p className="col-span-5 col-start-8 text-[0.7rem] md:text-[0.85rem] text-gray text-right">
                  {formatDate(order?.createAt) || "01/01/1999"}
                </p>
              </div>
              <div className="overflow-x-auto whitespace-nowrap">
                <div className="px-3 md:px-5">
                  {order?.orderItem.map((item, index) => (
                    <div className="max-md:pr-3 inline-block">
                      <div
                        key={index}
                        className="flex flex-col justify-items-center w-20 md:w-40"
                      >
                        {/* Gambar Menu */}
                        <img
                          src={
                            item.menuVariant.menu.photo ||
                            "/user/foodPlaceholder.jpg"
                          }
                          className="w-20 h-20 md:w-35 md:h-35 self-center"
                        />
                        <p className="pt-1.5 md:pt-3 self-center max-w-35 text-wrap text-center text-[0.75rem] md:text-[1rem]">
                          {item.menuVariant.menu.name +
                            " " +
                            item.menuVariant.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray h-[0.1rem] my-3.5 mx-6"></div>
              <div className="px-7 pb-7 flex flex-row justify-between md:gap-10">
                <p className="text-[0.85rem] md:text-[1rem]">
                  {order.total_menu} Menu
                </p>
                <p className="text-[0.85rem] md:text-[1rem]">
                  Rp. {order.total_price}
                </p>
              </div>
            </>
          </div>
        </div>

        {/* Order Status */}
        <div className="max-md:row-start-4 max-md:row-span-9 col-span-full md:col-span-7 md:col-start-6 max-md:mt-6">
          <div className="flex flex-col bg-white py-3.5 px-3 md:px-6">
            <p className="font-semibold text-[1rem] md:text-2xl mb-4">
              {getStatusText(
                order.status_pickup,
                order.status,
                order.transaction.status_payment
              )}
            </p>

            {/* Timeline ini timeline */}
            {order.status !== "Declined" && (
              <div className="relative flex justify-between mb-8">
                {/* gray background line */}
                <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200 z-0"></div>

                {/* red progress bar */}
                <div
                  className="absolute top-3 left-0 h-0.5 bg-red-500 z-10"
                  style={{
                    width: `${
                      (timeline.filter((t) => t.completed).length /
                        timeline.length) *
                      100
                    }%`,
                  }}
                ></div>

                {timeline.map((point, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center relative z-20"
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        point.completed
                          ? "bg-red-500"
                          : "bg-white border-2 border-gray-200"
                      )}
                    >
                      {getStepIcon(point.key, point.completed)}
                    </div>
                    <div className="text-xs text-center mt-1">
                      <p className="text-gray-500 p-1.5">Pesanan</p>
                      <p
                        className={cn(
                          point.completed ? "text-black" : "text-gray-400"
                        )}
                      >
                        {point.completed
                          ? `${point.label} ${point.time}`
                          : point.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Details */}
            <div className="space-y-4 grid max-md:grid-rows-10 md:grid-cols-12">
              <div className="row-start-1 row-span-3 justify-between flex flex-col md:col-start-1 md:col-span-6">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                  <div>
                    <p className="text-[0.75rem] md:text-sm text-black">
                      Diambil dari
                    </p>
                    <p className="font-medium text-[0.875rem] md:text-[1rem]">
                      {order?.orderItem?.length > 0
                        ? order.orderItem[0]?.menuVariant?.menu?.vendor
                            ?.vendor_name
                        : "Nama Vendor"}

                      <span className="text-gray-400 font-normal text-[0.875rem] md:text-[1rem]">
                        {/* — {order.location} */} — Lokasi
                      </span>
                    </p>
                  </div>
                </div>

                {order.delivery_status && (
                  <div className="flex items-start mt-3.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1.5 mr-2"></div>
                    <div>
                      <p className="text-[0.75rem] md:text-sm text-black">
                        Diantar ke
                      </p>
                      <p className="font-medium text-[0.875rem] md:text-[1rem]">
                        {order.delivery_location}
                      </p>
                      <p className="text-[0.75rem] md:text-sm text-gray-500">
                        {order.buyerName}
                      </p>
                    </div>
                  </div>
                )}

                {order.status === "Pending" && (
                  <Button
                    variant={"danger"}
                    className="max-w-[150px]"
                    loading={isLoadingHandleOrder}
                    onClick={() => handleDeclineOrder(order.id)}
                  >
                    <p>Batal Pesanan</p>
                  </Button>
                )}
                {order.status_pickup === "Ready" && (
                  <Button
                    variant={"primaryRed"}
                    className="max-w-[150px]"
                    loading={isLoadingHandleOrder}
                    onClick={() => handleSelesaikanPesanan(order.id)}
                  >
                    <p>Selesai</p>
                  </Button>
                )}
                {order.status_pickup === "Picked_Up" && (
                  <Button
                    variant={"primaryRed"}
                    className="max-w-[150px]"
                    loading={isLoadingHandleOrder}
                    // onClick={() => handleSelesaikanPesanan(order.id)} Pergi ke page review
                  >
                    <p>Review</p>
                  </Button>
                )}
              </div>

              <div className="max-md:row-start-4 max-md:row-span-7 md:col-start-7 md:col-span-6">
                <>
                  <p className="text-[1rem] md:text-sm font-medium mb-2">
                    Rincian Pesanan
                  </p>
                  <div className="flex space-x-2 pb-3">
                    {order?.orderItem?.map((item, index) => (
                      <div key={index} className="w-12 md:w-20 justify-center">
                        <img
                          src={
                            item.menuVariant.menu.photo ||
                            "/user/foodPlaceholder.jpg"
                          }
                          alt={item.menuVariant.menu.name}
                          className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-md"
                        />
                        <p className="text-xs mt-1 text-center">
                          {item.menuVariant.menu.name +
                            " " +
                            item.menuVariant.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </>

                {/* <div className="flex justify-between py-2 border-t">
                        <p className="text-[0.8rem] md:text-sm text-gray-500">
                          Catatan Tambahan
                        </p>
                        <p className="text-[0.8rem] md:text-sm">{"Catatan"}</p>
                      </div> */}

                <div className="flex justify-between py-2 ">
                  <p className="text-[0.8rem] md:text-sm text-gray-500">
                    Total Pemesanan ({order.total_menu} menu)
                  </p>
                  <p className="text-[0.8rem] md:text-sm font-medium">
                    Rp. {order.total_price}
                  </p>
                </div>
                {/* 
              <div className="flex justify-between py-2">
                <p className="text-[0.8rem] md:text-sm text-gray-500">Pembayaran</p>
                <p className="text-[0.8rem] md:text-sm">
                  {order.transaction.status_payment || "-"}
                </p>
              </div> */}

                {/* <div className="flex justify-between py-2 ">
                <p className="text-[0.8rem] md:text-sm text-gray-500">Bukti Pengiriman</p>
                <button className="text-sm text-blue-500 flex items-center">
                  Lihat foto <span className="ml-1">›</span>
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationOrderItem;
