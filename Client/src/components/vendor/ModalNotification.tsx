"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

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
    cancelled: "bg-primary",
    processing: "bg-teal-400",
    rejected: "bg-gray-400",
  };

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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Jacqueline</span> ingin membeli{" "}
              <span className="font-semibold">5 item</span>
            </div>
            <button className="bg-black text-white text-xs px-5 py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2">
              <span>Bakmie + pangsit rebus</span>
              <span>x 2</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus</span>
              <span>x 1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus + baso</span>
              <span>x 1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus + pangsit goreng + baso</span>
              <span>x 1</span>
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Chris</span> ingin membeli{" "}
              <span className="font-semibold">2 item</span>
            </div>
            <button className="bg-gray-400 text-white text-xs px-5 py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2">
              <span>Bakmie + pangsit rebus</span>
              <span>x 2</span>
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Chris</span> ingin membeli{" "}
              <span className="font-semibold">1 item</span>
            </div>
            <button className="bg-gray-400 text-white text-xs px-5 py-2 rounded-3xl">
              Ambil Sendiri
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2">
              <span>Bakmie + pangsit rebus</span>
              <span>x 1</span>
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Jacqueline</span> ingin membeli{" "}
              <span className="font-semibold">5 item</span>
            </div>
            <button className="bg-black text-white text-xs px-5 py-2 rounded-3xl">
              Layanan Antar
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <div className="flex justify-between mb-2">
              <span>Bakmie + pangsit rebus</span>
              <span>x 2</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus</span>
              <span>x 1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus + baso</span>
              <span>x 1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Bakmie jumbo + pangsit rebus + pangsit goreng + baso</span>
              <span>x 1</span>
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

  const filteredNotifications = notifications.filter((n) =>
    activeCategoryKey === "baru" ? n.isNew : !n.isNew
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl h-[85vh] p-8 shadow-lg animate-slide-in-right z-50 rounded-2xl overflow-hidden flex flex-col">
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

        <div className="flex flex-col gap-8 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div key={notification.id} className="py-2 pr-4">
                <div className="flex gap-5">
                  <div className="relative">
                    <img
                      src={notification.avatar}
                      alt={notification.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        statusColor[
                          notification.status as keyof typeof statusColor
                        ] || "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div className="flex-1">{notification.content}</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.time}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic p-4">
              Tidak ada notifikasi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
