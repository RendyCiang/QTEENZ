import Button from "@/components/general/Button";
import useFetchData from "@/hooks/useFetchData";
import { APIPayload, OrderDetail, OrderDetailPayload } from "@/types/types";
import { cn } from "@/utils/utils";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import NotificationOrderItem from "./NotificationOrderItem";

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

  const [orderFiltered, setOrderFiltered] = useState<OrderDetail[]>([]);
  const { data, isLoading, error } = useFetchData<OrderDetailPayload>(
    "orders/get-orders-buyer/"
  );

  useEffect(() => {
    if (data?.orders) {
      console.log(data.orders);

      let filteredOrders = data.orders;
      if (filterType === 1) {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === "completed"
        );
      } else if (filterType === 2) {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === "refund"
        );
      }
      setOrderFiltered(filteredOrders);
    }
  }, [data, filterType]);

  return (
    <>
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background min-h-screen">
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
          {orderFiltered?.map((order, index) => (
            <NotificationOrderItem order={order} key={index} />
          ))}
        </>
      </div>
    </>
  );
}

export default NotificationPage;
