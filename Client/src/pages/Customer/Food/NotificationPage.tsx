import Button from "@/components/general/Button";
import { cn } from "@/utils/utils";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

function NotificationPage() {
  const [filterType, setFilterType] = useState<number>(0);
  const orders = [
    {
      id: 1,
      restaurant: "Bakmie Efatta",
      date: "3 Mei 2024",
      location: "Basement BINUS",
      room: "Room 527",
      customer: "Jacqueline Audrey Iman",
      phone: "(+62) 822-7618-2818",
      items: [
        {
          name: "Bakmie Ayam Biasa",
          image:
            "https://swansdown.com/wp-content/uploads/2021/10/Basic-waffles-1024x683.jpg.webp",
        },
        {
          name: "Bakmie Ayam + Baso",
          image:
            "https://www.allrecipes.com/thmb/SI6dn__pfJb9G5eBpYAqkyGCLxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50050-five-minute-ice-cream-DDMFS-4x3-076-fbf49ca6248e4dceb3f43a4f02823dd9.jpg",
        },
      ],
      quantity: 2,
      price: 54000,
      payment: "BCA Virtual Account",
      timeline: [
        { status: "created", time: "11:07", completed: true },
        { status: "confirmed", time: "11:20", completed: true },
        { status: "delivery", time: "11:50", completed: true },
        { status: "arrived", time: "11:59", completed: false },
      ],
      notes: "Kuah dipisah",
    },
    {
      id: 2,
      restaurant: "Good Waffle",
      date: "3 Mei 2024",
      location: "Basement BINUS",
      room: "Room 701",
      customer: "Jacqueline Audrey Iman",
      phone: "(+62) 822-7618-2818",
      items: [
        {
          name: "Chocolate Waffle",
          image:
            "https://asset.kompas.com/crops/JPWFqwXGVS0lIEkLL3FaxQkxGTM=/0x0:1000x667/1200x800/data/photo/2024/04/01/660ac92b3d984.jpg",
        },
        {
          name: "Cheese Waffle",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/0/0d/Omurice_by_Taimeiken.jpg",
        },
      ],
      quantity: 2,
      price: "Rp24.000",
      payment: "",
      timeline: [
        { status: "created", time: "11:07", completed: true },
        { status: "confirmed", time: "11:10", completed: true },
        { status: "delivery", time: "11:40", completed: true },
        { status: "arrived", time: "11:45", completed: false },
      ],
      notes: "-",
    },
  ];
  return (
    <>
      <div className="px-4 pb-10 mx-auto bg-background md:pl-8 md:pr-8 md:pb-10 max-md:mt-4">
        {/* Bagian Atas */}
        <div className="pt-8 grid grid-cols-12">
          <Button
            toPage="/customer/food"
            variant="standardWord"
            textColor="black"
            hoverTextColor="lightGray"
            size="md"
            className="col-start-1 col-span-2 md:col-span-1"
          >
            <span className="text-2xl md:text-4xl">&larr;</span>
          </Button>
          <p className="col-start-5 col-span-5 md:col-start-6 md:col-span-2 justify-center self-center text-center text-[0.95rem] md:text-2xl font-semibold">
            PESANAN SAYA
          </p>
        </div>

        <nav className="bg-background">
          <div className="grid grid-cols-12 justify-items-center">
            <button
              onClick={() => setFilterType(0)}
              className={`border-b-2 col-span-4 col-start-1 text-[0.825rem] md:text-[1rem] ${
                filterType === 0
                  ? "text-primary font-bold border-none"
                  : "border-transparent hover:border-primary"
              } transition-all duration-300 cursor-pointer`}
            >
              Sedang Diproses
            </button>
            <button
              onClick={() => setFilterType(1)}
              className={`border-b-2 col-span-4 col-start-5 text-[0.825rem] md:text-[1rem] ${
                filterType === 1
                  ? "text-primary font-bold border-none"
                  : "border-transparent hover:border-primary"
              } transition-all duration-300 cursor-pointer`}
            >
              Selesai
            </button>
            <button
              onClick={() => setFilterType(2)}
              className={`border-b-2 col-span-4 col-start-9 text-[0.825rem] md:text-[1rem] ${
                filterType === 2
                  ? "text-primary font-bold border-none"
                  : "border-transparent hover:border-primary"
              } transition-all duration-300 cursor-pointer`}
            >
              Pengembalian Dana
            </button>
          </div>
        </nav>

        <>
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid max-md:grid-rows-10 grid-cols-12 mt-8"
            >
              <div className="col-start-1 col-span-full md:col-span-5 max-md:row-start-1 max-md:row-span-3">
                {/* Order Details */}
                <div className="md:mr-12 flex flex-col bg-white">
                  <>
                    <div className="grid grid-cols-12 pt-7 pb-3.5 px-3 md:px-7">
                      <p className="col-span-7 col-start-1 font-semibold text-[1rem] md:text-2xl text-start self-center">
                        {order.restaurant}
                      </p>
                      <p className="col-span-5 col-start-8 text-[0.7rem] md:text-[0.85rem] text-gray text-right">
                        {order.date}
                      </p>
                    </div>
                    <div className="overflow-x-auto whitespace-nowrap">
                      <div className="px-3 md:px-5">
                        {order.items.map((item, index) => (
                          <div className="max-md:pr-3 inline-block">
                            <div
                              key={index}
                              className="flex flex-col justify-items-center w-20 md:w-40"
                            >
                              <img
                                src={item.image}
                                className="w-20 h-20 md:w-35 md:h-35 self-center"
                              />
                              <p className="pt-1.5 md:pt-3 self-center max-w-35 text-wrap text-center text-[0.75rem] md:text-[1rem]">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray h-[0.1rem] my-3.5 mx-6"></div>
                    <div className="px-7 pb-7 flex flex-row justify-between md:gap-10">
                      <p className="text-[0.85rem] md:text-[1rem]">
                        {order.quantity} Menu
                      </p>
                      <p className="text-[0.85rem] md:text-[1rem]">
                        Rp. {order.price}
                      </p>
                    </div>
                  </>
                </div>
              </div>

              {/* Order Status */}
              <div className="max-md:row-start-4 max-md:row-span-9 col-span-full md:col-span-7 md:col-start-6 max-md:mt-6">
                <div className="flex flex-col bg-white py-3.5 px-3 md:px-6">
                  <p className="font-semibold text-[1rem] md:text-2xl mb-4">
                    Pesanan Sedang Diproses
                  </p>

                  {/* Timeline */}
                  <div className="relative flex justify-between mb-8">
                    {/* Progress line */}
                    <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
                    <div
                      className="absolute top-3 left-0 h-0.5 bg-red-500 z-10"
                      style={{
                        width: `${
                          (order.timeline.filter((t) => t.completed).length /
                            order.timeline.length) *
                          100
                        }%`,
                      }}
                    ></div>

                    {/* Status points */}
                    {order.timeline.map((point, index) => (
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
                        <div className="text-[0.575rem] md:text-xs text-center mt-1">
                          <p className="text-gray-500">Pesanan</p>
                          <p
                            className={cn(
                              point.completed ? "text-black" : "text-gray-400"
                            )}
                          >
                            {index === 0 && `dibuat ${point.time}`}
                            {index === 1 && `dikonfirmasi ${point.time}`}
                            {index === 2 && `diantar ${point.time}`}
                            {index === 3 && `tiba ${point.time}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4 grid max-md:grid-rows-10 md:grid-cols-12">
                    <div className="row-start-1 row-span-3 md:col-start-1 md:col-span-6">
                      <div className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                        <div>
                          <p className="text-[0.75rem] md:text-sm text-black">
                            Diambil dari
                          </p>
                          <p className="font-medium text-[0.875rem] md:text-[1rem]">
                            {order.restaurant}{" "}
                            <span className="text-gray-400 font-normal text-[0.875rem] md:text-[1rem]">
                              — {order.location}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start mt-3.5">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1.5 mr-2"></div>
                        <div>
                          <p className="text-[0.75rem] md:text-sm text-black">
                            Diantar ke
                          </p>
                          <p className="font-medium text-[0.875rem] md:text-[1rem]">
                            {order.room}
                          </p>
                          <p className="text-[0.75rem] md:text-sm text-gray-500">
                            {order.customer} - {order.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="max-md:row-start-4 max-md:row-span-7 md:col-start-7 md:col-span-6">
                      <>
                        <p className="text-[1rem] md:text-sm font-medium mb-2">
                          Rincian Pesanan
                        </p>
                        <div className="flex space-x-2 pb-3">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="w-12 md:w-20 justify-center"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-md"
                              />
                              <p className="text-[0.65rem] md:text-xs mt-1 text-center">
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>

                      <div className="flex justify-between py-2 ">
                        <p className="text-[0.8rem] md:text-sm text-gray-500">
                          Catatan Tambahan
                        </p>
                        <p className="text-[0.8rem] md:text-sm">
                          {order.notes}
                        </p>
                      </div>

                      <div className="flex justify-between py-2 ">
                        <p className="text-[0.8rem] md:text-sm text-gray-500">
                          Total Pemesanan ({order.quantity} menu)
                        </p>
                        <p className="text-[0.8rem] md:text-sm font-medium">
                          Rp. {order.price}
                        </p>
                      </div>

                      <div className="flex justify-between py-2 ">
                        <p className="text-[0.8rem] md:text-sm text-gray-500">
                          Pembayaran
                        </p>
                        <p className="text-[0.8rem] md:text-sm">
                          {order.payment || "-"}
                        </p>
                      </div>

                      <div className="flex justify-between py-2 ">
                        <p className="text-[0.8rem] md:text-sm text-gray-500">
                          Bukti Pengiriman
                        </p>
                        <button className="text-[0.8rem] md:text-sm text-blue-500 flex items-center">
                          Lihat foto <span className="ml-1">›</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
}

export default NotificationPage;
