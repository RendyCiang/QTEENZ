import Button from "@/components/general/Button";
import { OrderDetail } from "@/types/types";
import { useEffect, useState } from "react";
import NotificationOrderItem from "./NotificationOrderItem";
import { roleStore } from "@/store/roleStore";
import { useNavigate } from "react-router-dom";
import useGetBuyerOrder from "@/hooks/queries/useGetBuyerOrder";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { Toaster } from "react-hot-toast";

function NotificationPage() {
  const [filterType, setFilterType] = useState<number>(0);
  const navigate = useNavigate();
  // const orders = [
  //   {
  //     id: 1,
  //     restaurant: "Bakmie Efatta",
  //     date: "3 Mei 2024",
  //     location: "Basement BINUS",
  //     room: "Room 527",
  //     customer: "Jacqueline Audrey Iman",
  //     phone: "(+62) 822-7618-2818",
  //     items: [
  //       {
  //         name: "Bakmie Ayam Biasa",
  //         image:
  //           "https://swansdown.com/wp-content/uploads/2021/10/Basic-waffles-1024x683.jpg.webp",
  //       },
  //       {
  //         name: "Bakmie Ayam + Baso",
  //         image:
  //           "https://www.allrecipes.com/thmb/SI6dn__pfJb9G5eBpYAqkyGCLxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50050-five-minute-ice-cream-DDMFS-4x3-076-fbf49ca6248e4dceb3f43a4f02823dd9.jpg",
  //       },
  //     ],
  //     quantity: 2,
  //     price: 54000,
  //     payment: "BCA Virtual Account",
  //     timeline: [
  //       { status: "created", time: "11:07", completed: true },
  //       { status: "confirmed", time: "11:20", completed: true },
  //       { status: "delivery", time: "11:50", completed: true },
  //       { status: "arrived", time: "11:59", completed: false },
  //     ],
  //     notes: "Kuah dipisah",
  //   },
  //   {
  //     id: 2,
  //     restaurant: "Good Waffle",
  //     date: "3 Mei 2024",
  //     location: "Basement BINUS",
  //     room: "Room 701",
  //     customer: "Jacqueline Audrey Iman",
  //     phone: "(+62) 822-7618-2818",
  //     items: [
  //       {
  //         name: "Chocolate Waffle",
  //         image:
  //           "https://asset.kompas.com/crops/JPWFqwXGVS0lIEkLL3FaxQkxGTM=/0x0:1000x667/1200x800/data/photo/2024/04/01/660ac92b3d984.jpg",
  //       },
  //       {
  //         name: "Cheese Waffle",
  //         image:
  //           "https://upload.wikimedia.org/wikipedia/commons/0/0d/Omurice_by_Taimeiken.jpg",
  //       },
  //     ],
  //     quantity: 2,
  //     price: "Rp24.000",
  //     payment: "",
  //     timeline: [
  //       { status: "created", time: "11:07", completed: true },
  //       { status: "confirmed", time: "11:10", completed: true },
  //       { status: "delivery", time: "11:40", completed: true },
  //       { status: "arrived", time: "11:45", completed: false },
  //     ],
  //     notes: "-",
  //   },
  // ];
  const { role } = roleStore();
  const [orderFiltered, setOrderFiltered] = useState<OrderDetail[]>([]);
  const { data, isLoading, error } = useGetBuyerOrder();

  useEffect(() => {
    if (role === null) {
      navigate("/login");
    }
    if (data?.orders) {
      data.orders.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB.getTime() - dateA.getTime(); // Sort by createdAt in descending order
      });

      let filteredOrders = data.orders;
      console.log(filteredOrders);
      if (filterType === 0) {
        filteredOrders = data.orders.filter(
          (order) =>
            order.status !== "Declined" &&
            order.status_pickup !== "Picked_Up" &&
            order.status !== "refund"
        );
      }
      if (filterType === 1) {
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.status_pickup === "Picked_Up" || order.status === "Accepted"
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
      <Toaster />
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
          {isLoading && <LoadingSpinner />}
          {orderFiltered?.map((order, index) => (
            <NotificationOrderItem order={order} key={index} />
          ))}
        </>
      </div>
    </>
  );
}

export default NotificationPage;
