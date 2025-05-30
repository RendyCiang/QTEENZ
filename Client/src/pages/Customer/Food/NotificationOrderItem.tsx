import { OrderDetail } from "@/types/types";
import { formatToIndoTime, cn } from "@/utils/utils";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
type TimelineItem = {
  time: string | null | undefined; // allow string or null
  completed: boolean;
  label: string;
  key: string;
};
const getStatusText = (status: OrderDetail["status_pickup"]) => {
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

const NotificationOrderItem = ({ order }: { order: OrderDetail }) => {
  const steps = [
    { label: "Dibuat", key: "createdAt" },
    { label: "Diterima", key: "updateAcceptedAt" },
    { label: "Siap", key: "updateReadyAt" },
    { label: "Diantar", key: "updatePickedUpAt" },
  ];

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
    <div key={order.id} className="grid grid-cols-12 mt-8 ">
      <div className="col-span-5 col-start-1">
        {/* Order Details */}
        <div className="mr-12 flex flex-col bg-white">
          <>
            <div className="grid grid-cols-12 pt-7 pb-3.5 px-7">
              <p className="col-span-7 col-start-1 font-semibold text-2xl text-start self-center">
                {order?.orderItem?.length > 0
                  ? order.orderItem[0]?.menuVariant?.menu?.vendor?.vendor_name
                  : "Nama Vendor"}
              </p>
              <p className="col-span-5 col-start-8 text-[0.85rem] text-gray text-right">
                {"Tanggal"}
              </p>
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
              {order?.orderItem.map((item, index) => (
                <div className="px-7 inline-block">
                  <div
                    key={index}
                    className="flex flex-col justify-items-center w-40"
                  >
                    {/* Gambar Menu */}
                    <img
                      src={
                        item.menuVariant.menu.photo ||
                        "/user/foodPlaceholder.jpg"
                      }
                      className="w-35 h-35 self-center"
                    />
                    <p className="pt-3 self-center">
                      {item.menuVariant.menu.name + "" + item.menuVariant.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray h-[0.1rem] my-3.5 mx-6"></div>
            <div className="px-7 pb-7 flex flex-row gap-10">
              <p>{order.total_menu} Menu</p>
              <p>Rp. {order.total_price}</p>
            </div>
          </>
        </div>
      </div>

      {/* Order Status */}
      <div className="col-span-7 col-start-6">
        <div className="mr-12 flex flex-col bg-white py-3.5 px-6">
          <p className="font-semibold text-2xl mb-4">
            {getStatusText(order.status_pickup)}
          </p>

          {/* Timeline ini timeline */}
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
                  {point.completed && (
                    <Check size={14} className="text-white" />
                  )}
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

          {/* Order Details */}
          <div className="space-y-4 grid grid-cols-12">
            <div className="col-start-1 col-span-6">
              <div className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                <div>
                  <p className="text-sm text-black">Diambil dari</p>
                  <p className="font-medium">
                    {order?.orderItem?.length > 0
                      ? order.orderItem[0]?.menuVariant?.menu?.vendor
                          ?.vendor_name
                      : "Nama Vendor"}

                    <span className="text-gray-400 font-normal">
                      {/* — {order.location} */} — Lokasi
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start mt-3.5">
                <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1.5 mr-2"></div>
                <div>
                  <p className="text-sm text-black">Diantar ke</p>
                  <p className="font-medium">{"Tujuan"}</p>
                  <p className="text-sm text-gray-500">{order.buyerName}</p>
                </div>
              </div>
            </div>

            <div className="col-start-7 col-span-6">
              <>
                <p className="text-sm font-medium mb-2">Rincian Pesanan</p>
                <div className="flex space-x-2 pb-3">
                  {order?.orderItem?.map((item, index) => (
                    <div key={index} className="w-20">
                      <img
                        src={
                          item.menuVariant.menu.photo ||
                          "/user/foodPlaceholder.jpg"
                        }
                        alt={item.menuVariant.menu.name}
                        className="w-20 h-20 object-cover rounded-md"
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
                        <p className="text-sm text-gray-500">
                          Catatan Tambahan
                        </p>
                        <p className="text-sm">{"Catatan"}</p>
                      </div> */}

              <div className="flex justify-between py-2 border-t">
                <p className="text-sm text-gray-500">
                  Total Pemesanan ({order.total_menu} menu)
                </p>
                <p className="text-sm font-medium">Rp. {order.total_price}</p>
              </div>
              {/* 
              <div className="flex justify-between py-2 border-t">
                <p className="text-sm text-gray-500">Pembayaran</p>
                <p className="text-sm">
                  {order.transaction.status_payment || "-"}
                </p>
              </div> */}

              {/* <div className="flex justify-between py-2 border-t">
                <p className="text-sm text-gray-500">Bukti Pengiriman</p>
                <button className="text-sm text-blue-500 flex items-center">
                  Lihat foto <span className="ml-1">›</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationOrderItem;
