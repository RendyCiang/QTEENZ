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
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        {/* Bagian Atas */}
        <div className="pt-8 grid grid-cols-12">
          <Button
            toPage="/customer/food"
            variant="standardWord"
            textColor="black"
            hoverTextColor="lightGray"
            size="md"
            className="col-start-1"
          >
            <span className="text-4xl">&larr;</span>
          </Button>
          <p className="col-start-6 col-span-2 justify-center self-center text-center text-2xl font-semibold">
            PESANAN SAYA
          </p>
        </div>

        <nav className="bg-background">
          <div className="grid grid-cols-12 justify-items-center">
            <button
              onClick={() => setFilterType(0)}
              className={`border-b-2 col-span-4 col-start-1 ${
                filterType === 0
                  ? "text-primary font-bold border-none"
                  : "border-transparent hover:border-primary"
              } transition-all duration-300 cursor-pointer`}
            >
              Sedang Diproses
            </button>
            <button
              onClick={() => setFilterType(1)}
              className={`border-b-2 col-span-4 col-start-5 ${
                filterType === 1
                  ? "text-primary font-bold border-none"
                  : "border-transparent hover:border-primary"
              } transition-all duration-300 cursor-pointer`}
            >
              Selesai
            </button>
            <button
              onClick={() => setFilterType(2)}
              className={`border-b-2 col-span-4 col-start-9 ${
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
            <div key={order.id} className="grid grid-cols-12 mt-8">
              <div className="col-span-5 col-start-1">
                {/* Order Details */}
                <div className="mr-12 flex flex-col bg-white">
                  <>
                    <div className="grid grid-cols-12 pt-7 pb-3.5 px-7">
                      <p className="col-span-7 col-start-1 font-semibold text-2xl text-start self-center">
                        {order.restaurant}
                      </p>
                      <p className="col-span-5 col-start-8 text-[0.85rem] text-gray text-right">
                        {order.date}
                      </p>
                    </div>
                    <div className="overflow-x-auto whitespace-nowrap">
                      {order.items.map((item, index) => (
                        <div className="px-7 inline-block">
                          <div
                            key={index}
                            className="flex flex-col justify-items-center w-40"
                          >
                            <img
                              src={item.image}
                              className="w-35 h-35 self-center"
                            />
                            <p className="pt-3 self-center">{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray h-[0.1rem] my-3.5 mx-6"></div>
                    <div className="px-7 pb-7 flex flex-row gap-10">
                      <p>{order.quantity} Menu</p>
                      <p>Rp. {order.price}</p>
                    </div>
                  </>
                </div>
              </div>

              {/* Order Status */}
              <div className="col-span-7 col-start-6">
                <div className="mr-12 flex flex-col bg-white py-3.5 px-6">
                  <p className="font-semibold text-2xl mb-4">
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
                        <div className="text-xs text-center mt-1">
                          <p className="text-gray-500 p-1.5">Pesanan</p>
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
                  <div className="space-y-4 grid grid-cols-12">
                    <div className="col-start-1 col-span-6">
                      <div className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                        <div>
                          <p className="text-sm text-black">Diambil dari</p>
                          <p className="font-medium">
                            {order.restaurant}{" "}
                            <span className="text-gray-400 font-normal">
                              — {order.location}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start mt-3.5">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1.5 mr-2"></div>
                        <div>
                          <p className="text-sm text-black">Diantar ke</p>
                          <p className="font-medium">{order.room}</p>
                          <p className="text-sm text-gray-500">
                            {order.customer} - {order.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-start-7 col-span-6">
                      <>
                        <p className="text-sm font-medium mb-2">
                          Rincian Pesanan
                        </p>
                        <div className="flex space-x-2 pb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="w-20">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <p className="text-xs mt-1 text-center">
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>

                      <div className="flex justify-between py-2 border-t">
                        <p className="text-sm text-gray-500">
                          Catatan Tambahan
                        </p>
                        <p className="text-sm">{order.notes}</p>
                      </div>

                      <div className="flex justify-between py-2 border-t">
                        <p className="text-sm text-gray-500">
                          Total Pemesanan ({order.quantity} menu)
                        </p>
                        <p className="text-sm font-medium">Rp. {order.price}</p>
                      </div>

                      <div className="flex justify-between py-2 border-t">
                        <p className="text-sm text-gray-500">Pembayaran</p>
                        <p className="text-sm">{order.payment || "-"}</p>
                      </div>

                      <div className="flex justify-between py-2 border-t">
                        <p className="text-sm text-gray-500">
                          Bukti Pengiriman
                        </p>
                        <button className="text-sm text-blue-500 flex items-center">
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
