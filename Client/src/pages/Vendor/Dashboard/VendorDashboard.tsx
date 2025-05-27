"use client";

import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import ModalNotification from "@/components/vendor/ModalNotification";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const VendorDashboard = () => {
  const [notifOpen, setNotifOpen] = useState(false);

  const dashboardStats = [
    {
      count: 22,
      percentage: null,
    },
    {
      count: 120,
      percentage: "+2.5%",
    },
    {
      count: 30,
      percentage: "+3.2%",
    },
    {
      count: 5200000,
      percentage: "+5%",
    },
  ];

  const orders = [
    {
      id: 1,
      avatar: "/user/Jacquelinee.jpg",
      customer: "Jacqueline A.",
      items: 5,
      status: "Selesai",
      statusColor: "bg-teal-100 text-teal-600",
      paymentStatus: "Sudah bayar",
    },
    {
      id: 2,
      avatar: "/user/Chris.png",
      customer: "Chris",
      items: 5,
      status: "Diproses",
      statusColor: "bg-yellow-100 text-yellow-600",
      paymentStatus: "Belum bayar",
    },
    {
      id: 3,
      avatar: "/user/Jacquelinee.jpg",
      customer: "Jacqueline A.",
      items: 5,
      status: "Pengambilan",
      statusColor: "bg-purple-100 text-purple-600",
      paymentStatus: "Sudah bayar",
    },
    {
      id: 4,
      avatar: "/user/Chris.png",
      customer: "Chris",
      items: 5,
      status: "Batal",
      statusColor: "bg-red-100 text-red-600",
      paymentStatus: "",
    },
    {
      id: 5,
      avatar: "/user/Jacquelinee.jpg",
      customer: "Jacqueline A.",
      items: 5,
      status: "Selesai",
      statusColor: "bg-teal-100 text-teal-600",
      paymentStatus: "Sudah bayar",
    },
    {
      id: 6,
      avatar: "/user/Chris.png",
      customer: "Chris",
      items: 5,
      status: "Selesai",
      statusColor: "bg-teal-100 text-teal-600",
      paymentStatus: "Sudah bayar",
    },
  ];

  const reviews = [
    {
      id: 1,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 2,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 3,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 4,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 5,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 6,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 7,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 8,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 9,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 10,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
    {
      id: 11,
      avatar: "/user/Audrey.png",
      user: "Rene Wells",
      rating: "5.0/5.0",
      comment: "Aplikasinya sangat membantu! Gampang digunakan...",
    },
  ];

  const topItems = [
    {
      id: 1,
      image: "/user/top1.png",
      name: "Bakmie + Pangsit Rebus",
      sold: "250 Terjual",
    },
    {
      id: 2,
      image: "/user/top1.png",
      name: "Bakmie + Pangsit Rebus",
      sold: "250 Terjual",
    },
    {
      id: 3,
      image: "/user/top1.png",
      name: "Bakmie + Pangsit Rebus",
      sold: "250 Terjual",
    },
  ];

  const scrollbarStyleWebkit = `
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-primary-4th);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-primary-3rd);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary);
    }
  `;

  const rating = 4.5;
  const maxRating = 5.0;
  const percentage = (rating / maxRating) * 100;

  interface ToggleVisibilityProps {
    value: number | string;
  }
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

  return (
    <>
      <style>{scrollbarStyleWebkit}</style>
      <div className="flex justify-between">
        <Sidebar props={vendorMenuList} />
        <div className="flex justify-center items-center gap-5 mr-4 hidden max-md:flex">
          <Notification count={7} onClick={() => setNotifOpen(true)} />
        </div>
      </div>
      <div className="bg-background">
        <div className="bg-white justify-between flex max-md:hidden md:pl-[17.5rem] pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
          <p className="pt-6 pb-6">
            Home &#62; <span className="font-bold">Vendor</span>
          </p>{" "}
          <div className="flex justify-center items-center gap-5">
            <Notification count={7} onClick={() => setNotifOpen(true)} />
            <h1 className="font-bold">Vendor</h1>
          </div>
        </div>

        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>
      <div className="bg-background md:pl-[17.5rem] pr-10 pt-5 max-md:pt-10 max-md:pl-5 max-md:pr-5 pb-6 min-h-screen">
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:hidden mb-6">
            Vendor Dasbor
          </h1>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {/* Orderan Baru */}
            <div className="bg-primary text-white rounded-lg p-5 flex flex-col gap-2">
              <div className="flex items-center mb-4 gap-4">
                <div className=" flex bg-white w-[44px] h-[44px]  justify-center items-center rounded-full text-black">
                  <Icon icon="mdi:bell-outline" className="text-2xl" />
                </div>
                <span className="font-medium text-xl">Orderan Baru</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-semibold">
                    {dashboardStats[0].count}
                  </h2>
                  <p className="text-base ">*Diperbarui setiap orderan baru</p>
                </div>
              </div>
            </div>

            {/* Total Orderan */}
            <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-2">
              <div className="flex items-center mb-4 gap-4">
                <div className=" flex bg-primary/10 w-[44px] h-[44px] justify-center items-center rounded-full text-primary">
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
                      <span className="text-base font-semibold text-primary mr-2">
                        {dashboardStats[1].percentage}
                      </span>
                    )}
                    <span className="text-base">dibanding kemarin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sedang Diproses */}
            <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-4">
              <div className="flex items-center mb-2 gap-4">
                <div className=" flex bg-primary/10 w-[44px] h-[44px]  justify-center items-center rounded-full text-primary">
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
                      <span className="text-base font-semibold text-primary mr-2">
                        {dashboardStats[2].percentage}
                      </span>
                    )}
                    <span className="text-base">dibanding kemarin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Pendapatan */}
            <div className="bg-white text-black rounded-lg p-5 border border-primary-4th flex flex-col gap-4">
              <div className="flex items-center mb-2 gap-4">
                <div className=" flex bg-primary/10 w-[44px] h-[44px] justify-center items-center rounded-full text-primary">
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

          {/* Orders Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 flex-grow">
            <div className="bg-white rounded-lg p-5  border border-primary-4th">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Icon icon="ep:list" className="text-xl mr-2" />
                  <h2 className="text-lg font-semibold">Daftar Orderan</h2>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center pb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <img
                        src={order.avatar}
                        alt={order.customer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{order.customer}</h3>
                      <p className="text-sm text-gray-500">
                        {order.items} Item
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-lg ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                      {order.paymentStatus && (
                        <span className="text-xs text-gray-500 mt-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              order.paymentStatus === "Sudah bayar"
                                ? "bg-tosca-element"
                                : "bg-primary-3rd"
                            } mr-1`}
                          ></span>
                          {order.paymentStatus}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg p-5  border border-primary-4th flex-grow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Icon
                    icon="ic:baseline-rate-review"
                    className="text-xl mr-2"
                  />
                  <h2 className="text-lg font-semibold">Ulasan Pengguna</h2>
                </div>
                <Link to="#" className="text-sm text-gray underline">
                  Lihat Semua
                </Link>
              </div>
              <div className="space-y-4 max-h-[550px] overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="flex items-start pb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{review.user}</h3>
                        <div className="flex items-center ml-2">
                          <Icon
                            icon="mdi:star"
                            className="text-yellow-400 text-sm"
                          />
                          <span className="text-xs ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction + Top Items */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-lg p-5 border border-primary-4th flex flex-col gap-6 flex-grow">
                <h3 className="text-lg font-semibold">Kepuasan Pengguna</h3>
                <div className="flex items-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {rating.toFixed(1)}/5.0
                      </span>
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
                      <p className="text-base">Dari 2300/2500 pengguna</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 3 Best-Selling Items */}
              <div className="bg-white rounded-lg p-5  border border-primary-4th flex-grow">
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
                  {topItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray">{item.sold}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
