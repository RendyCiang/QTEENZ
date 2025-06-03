"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import useGetVendorOrder from "@/hooks/queries/useGetVendorOrder";
import { OrderDetailVendor } from "@/types/types";
import { formatToIndoTime } from "@/utils/utils";
import { all } from "axios";

interface NotificationItem {
  id: string;
  user: string;
  avatar: string;
  time: string;
  status: "cancelled" | "processing" | "rejected";
  content: React.ReactNode;
  isNew?: boolean;
}

interface ModalNotificationProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalNotification({
  visible,
  onClose,
}: ModalNotificationProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<
    "baru" | "sudahkonfirm"
  >("baru");

  const statusColor = {
    Declined: "bg-primary",
    Pending: "bg-teal-400",
    Accepted: "bg-gray-400",
  };

  const { data, error, isLoading } = useGetVendorOrder();
  const [allOrder, setAllOrder] = useState<OrderDetailVendor[]>([]);
  const [newOrderSum, setNewOrderSum] = useState<number>(0);
  useEffect(() => {
    if (data?.orders) {
      // Sort by date
      data.orders.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB.getTime() - dateA.getTime(); // Sort by createdAt in descending order
      });

      // Order Filtering
      let filteredOrders = data.orders;
      if (activeCategoryKey === "sudahkonfirm") {
        filteredOrders = data.orders.filter(
          (order) => order.status !== "Pending"
        );
      } else {
        filteredOrders = data.orders.filter(
          (order) => order.status === "Pending"
        );
      }
      setNewOrderSum(
        data.orders.filter((order) => order.status === "Pending").length
      );
      setAllOrder(filteredOrders);
    }
  }, [activeCategoryKey]);

  const notifications: NotificationItem[] = [
    {
      id: "1",
      user: "Jacqueline",
      avatar: "/user/Jacqueline.png",
      time: "17.30 WIB",
      status: "processing",
      isNew: true,
      content: (
        <div className="w-full flex flex-col gap-2">
          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-1 lg:gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-semibold">Jacqueline</span>
              <span>ingin membeli</span>
              <span className="font-semibold">5 item</span>
            </div>

            <button className="bg-black text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 2</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus + baso
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus + pangsit goreng + baso
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="mt-4 border-l-4 border-black pl-3">
              <div className="font-medium">Catatan:</div>
              <div className="text-gray-600">Pisah cabe ya</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span>Total</span>
                <span className="font-semibold">Rp 160.000</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-semibold">Cash</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-primary text-white flex-1 py-1.5 rounded-lg">
              Terima
            </button>
            <button className="border border-primary text-primary flex-1 py-1.5 rounded-lg">
              Tolak
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      user: "Audrey",
      avatar: "/user/Audrey.png",
      time: "17.30 WIB",
      status: "cancelled",
      isNew: true,
      content: (
        <div>
          <span className="font-semibold">Audrey</span> membatalkan pesanan.{" "}
          <span className="font-semibold">Rp 80.000</span> telah dikembalikan ke
          rekening Anda.
        </div>
      ),
    },
    {
      id: "3",
      user: "Chris",
      avatar: "/user/Chris.png",
      time: "17.30 WIB",
      status: "processing",
      isNew: false,
      content: (
        <div className="w-full flex flex-col gap-2 text-gray-600">
          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Chris</span> ingin membeli{" "}
              <span className="font-semibold">2 item</span>
            </div>
            <button className="bg-gray-400 text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2">
              <span className="flex-1 break-words pr-4">
                Bakmie + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 2</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span>Total</span>
                <span className="font-semibold">Rp 60.000</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-semibold">Cash</span>
              </div>
            </div>
            <div className="mt-4 flex justify-start">
              <button className="bg-secondary-2nd px-6 py-1 rounded-lg text-sm font-medium">
                Diproses
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "4",
      user: "Chris",
      avatar: "/user/Chris.png",
      time: "17.30 WIB",
      status: "rejected",
      isNew: false,
      content: (
        <div className="w-full flex flex-col gap-2 text-gray-600">
          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-1 lg:gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-semibold">Chris</span>
              <span>ingin membeli</span>
              <span className="font-semibold">1 item</span>
            </div>
            <button className="bg-gray-400 text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded w-full">
            <div className="flex justify-between mb-2">
              <span className="flex-1 break-words pr-4">
                Bakmie + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span>Total</span>
                <span className="font-semibold">Rp 30.000</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-semibold">Cash</span>
              </div>
            </div>
            <div className="mt-4 flex justify-start">
              <button className="bg-primary/80 text-white px-6 py-1 rounded-lg text-sm font-medium">
                Ditolak
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "6",
      user: "Jacqueline",
      avatar: "/user/Jacqueline.png",
      time: "17.30 WIB",
      status: "processing",
      isNew: true,
      content: (
        <div className="w-full flex flex-col gap-2">
          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-1 lg:gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-semibold">Jacqueline</span>
              <span>ingin membeli</span>
              <span className="font-semibold">5 item</span>
            </div>

            <button className="bg-black text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
              Layanan Antar
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 2</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus + baso
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="flex justify-between mb-2 ">
              <span className="flex-1 break-words pr-4">
                Bakmie jumbo + pangsit rebus + pangsit goreng + baso
              </span>
              <span className="whitespace-nowrap">x 1</span>
            </div>
            <div className="mt-4 border-l-4 border-black pl-3">
              <div className="font-medium">Catatan:</div>
              <div className="text-gray-600">Pisah cabe ya</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span>Total</span>
                <span className="font-semibold">Rp 160.000</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-semibold">Cash</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-primary text-white flex-1 py-1.5 rounded-lg">
              Terima
            </button>
            <button className="border border-primary text-primary flex-1 py-1.5 rounded-lg">
              Tolak
            </button>
          </div>
        </div>
      ),
    },
  ];

  // const filteredNotifications = notifications.filter((n) =>
  //   activeCategoryKey === "baru" ? n.isNew : !n.isNew
  // );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full  sm:max-w-3xl max-w-full h-[85vh] sm:p-8 p-6 shadow-lg animate-slide-in-right z-50 rounded-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifikasi</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <X size={24} className="text-gray-600 hover:text-black" />
          </button>
        </div>

        <div className="flex space-x-4 pb-2 mb-4">
          <button
            onClick={() => setActiveCategoryKey("baru")}
            className={`text-sm font-medium pb-1 border-b-2 cursor-pointer px-4 ${
              activeCategoryKey === "baru"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            Baru
          </button>
          <button
            onClick={() => setActiveCategoryKey("sudahkonfirm")}
            className={`text-sm font-medium pb-1 border-b-2 cursor-pointer px-4 ${
              activeCategoryKey === "sudahkonfirm"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            Sudah Dikonfirmasi
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div className="py-2 pr-4">
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={notification.avatar}
                      alt={notification.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        statusColor[
                          notification.status as keyof typeof statusColor
                        ] || "bg-gray-300"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 sm:pr-4 gap-1 sm:gap-0">
                    <div className="text-xs text-gray-500 whitespace-nowrap mt-1 self-start">
                      {notification.time}
                    </div>
                    <div className="text-sm lg:text-base sm:border-0 border-b sm:pb-0 pb-6 border-gray-200">
                      {notification.content}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : ( */}
          {allOrder.length > 0 &&
            activeCategoryKey === "baru" &&
            allOrder.map((notification) => (
              <div className="py-2 pr-4">
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={notification.photo || "/user/profilePlaceholder.jpg"}
                      alt={notification.buyerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        statusColor[
                          notification.status as keyof typeof statusColor
                        ] || "bg-gray-300"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 sm:pr-4 gap-1 sm:gap-0">
                    <div className="text-xs text-gray-500 whitespace-nowrap mt-1 self-start">
                      {formatToIndoTime(notification.createAt)}
                    </div>
                    <div className="text-sm lg:text-base sm:border-0 border-b sm:pb-0 pb-6 border-gray-200">
                      {notification.status === "Pending" ? (
                        <div className="w-full flex flex-col gap-2">
                          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
                            <div className="flex items-center gap-1 lg:gap-2 flex-wrap sm:flex-nowrap">
                              <span className="font-semibold">
                                {notification.buyerName}
                              </span>
                              <span>ingin membeli</span>
                              <span className="font-semibold">
                                {notification.menuDetails.length} item
                              </span>
                            </div>

                            <button className="bg-black text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
                              {notification.deliveryStatus
                                ? "Layanan Antar"
                                : "Ambil Sendiri"}
                            </button>
                          </div>
                          <div className="bg-gray-50 p-6 rounded">
                            {notification.menuDetails.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between mb-2"
                              >
                                <span className="flex-1 break-words pr-4">
                                  {item.menuName}
                                </span>
                                <span className="whitespace-nowrap">
                                  x {item.quantity}
                                </span>
                              </div>
                            ))}

                            <div className="mt-4 border-l-4 border-black pl-3">
                              <div className="font-medium">Catatan:</div>
                              <div className="text-gray-600">Pisah cabe ya</div>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between mb-1">
                                <span>Total</span>
                                <span className="font-semibold">
                                  Rp {notification.totalPrice}
                                </span>
                              </div>
                              {/* <div className="flex justify-between">
                                <span>Metode Pembayaran</span>
                                <span className="font-semibold">Cash</span>
                              </div> */}
                            </div>
                          </div>
                          <div className="flex gap-4 mt-4">
                            <button className="bg-primary text-white flex-1 py-1.5 rounded-lg">
                              Terima
                            </button>
                            <button className="border border-primary text-primary flex-1 py-1.5 rounded-lg">
                              Tolak
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="font-semibold">Audrey</span>{" "}
                          membatalkan pesanan.{" "}
                          <span className="font-semibold">Rp 80.000</span> telah
                          dikembalikan ke rekening Anda.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {allOrder.length > 0 &&
            activeCategoryKey === "sudahkonfirm" &&
            allOrder.map((notification) => (
              <>
                <div className="py-2 pr-4">
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={
                          notification.photo || "/user/profilePlaceholder.jpg"
                        }
                        alt={notification.buyerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          statusColor[
                            notification.status as keyof typeof statusColor
                          ] || "bg-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 sm:pr-4 gap-1 sm:gap-0">
                      <div className="text-xs text-gray-500 whitespace-nowrap mt-1 self-start">
                        {/* {notification.time} */}
                      </div>
                      <div className="text-sm lg:text-base sm:border-0 border-b sm:pb-0 pb-6 border-gray-200">
                        <div className="w-full flex flex-col gap-2 text-gray-600">
                          <div className="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row gap-2 sm:gap-0">
                            <div className="flex items-center gap-1 lg:gap-2 flex-wrap sm:flex-nowrap">
                              <span className="font-semibold">Chris</span>
                              <span>ingin membeli</span>
                              <span className="font-semibold">1 item</span>
                            </div>
                            <button className="bg-gray-400 text-white text-xs px-3 lg:px-5 py-1.5 lg:py-2 rounded-3xl">
                              Ambil Sendiri
                            </button>
                          </div>
                          <div className="bg-gray-50 p-6 rounded w-full">
                            <div className="flex justify-between mb-2">
                              <span className="flex-1 break-words pr-4">
                                Bakmie + pangsit rebus
                              </span>
                              <span className="whitespace-nowrap">x 1</span>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between mb-1">
                                <span>Total</span>
                                <span className="font-semibold">Rp 30.000</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Metode Pembayaran</span>
                                <span className="font-semibold">Cash</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-start">
                              <button className="bg-primary/80 text-white px-6 py-1 rounded-lg text-sm font-medium">
                                Ditolak
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

          {allOrder.length === 0 && (
            <div className="text-sm text-gray-500 italic p-4">
              Tidak ada notifikasi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
