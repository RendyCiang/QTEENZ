import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Button from "../general/Button";
import { OrderDetailVendor } from "@/types/types";

type Step = {
  title: string;
  time: string;
  note?: string;
  status: "done" | "active" | "upcoming";
};

const statusColorMap: Record<string, string> = {
  Diproses: "bg-secondary-3rd",
  Pengambilan: "bg-purple-element",
  Batal: "bg-primary-2nd",
  Selesai: "bg-primary-3rd",
};

const steps: Step[] = [
  {
    title: "Diproses",
    time: "03 Mar 2025, 12:00 WIB",
    status: "done",
  },
  {
    title: "Pengambilan",
    time: "03 Mar 2025, 12:20 WIB",
    note: "Diantar Rina",
    status: "active",
  },
  {
    title: "Selesai",
    time: "03 Mar 2025, 12:30 WIB",
    status: "upcoming",
  },
];

const getStatusStyles = (status: Step["status"]) => {
  switch (status) {
    case "done":
      return "bg-orange-400";
    case "active":
      return "bg-red-500";
    case "upcoming":
      return "bg-gray-300";
    default:
      return "";
  }
};

const ItemPemesananAnalitik = ({
  orderDetail,
}: {
  orderDetail: OrderDetailVendor;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const status = "Diproses"; // Example status, replace with actual status
  return (
    <>
      {/* Data */}
      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-2 max-md:text-sm `}
      >
        <p className="text-center py-4 max-w-[250px]">{orderDetail.orderId}</p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:text-sm max-md:col-span-1`}
      >
        <p className="py-4">Tanggal</p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:hidden max-md:col-span-1`}
      >
        <p
          className={`text-center rounded-lg w-full ${statusColorMap[status]} max-w-[150px] py-2 mt-2`}
        >
          {status}
        </p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:text-sm `}
      >
        <p className="py-4">Pesanan</p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:col-span-1  hover:opacity-80`}
      >
        <p className="py-2 mt-2 max-md:text-sm">Total (Rp)</p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:col-span-2 flex items-center justify-center`}
      >
        <Icon
          onClick={() => setIsOpen(!isOpen)}
          icon="weui:arrow-outlined"
          className={`${
            isOpen ? "rotate-270" : "rotate-90"
          } text-3xl cursor-pointer text-center transition-transform duration-300`}
        />
      </div>

      {/* Detail */}
      <div
        className={` col-span-7 max-md:col-span-6 px-16 py-6 max-lg:px-4 grid grid-cols-7 w-full transition-all duration-200  ${
          isOpen
            ? "h-fit opacity-100 "
            : "h-0 opacity-0 hidden pointer-events-none "
        }`}
      >
        {/* Detail Item */}
        <div className="col-span-4 w-full gap-4 flex flex-col">
          <h1 className="text-primary font-bold">Detail Item</h1>

          {/* Makanan dibeli */}
          <div className="grid grid-cols-3 min-h-[100px]">
            <p className="col-span-2">Bakmie + Pangsit rebut</p>
            <p className="col-span-1">10</p>
          </div>

          {/* Catatan */}
          <div className="flex gap-3 items-center">
            <div className="w-1 rounded-full h-10 bg-gray-700"></div>

            <div className="flex flex-col">
              <p className="font-bold">Catatan</p>
              <p>skibidi</p>
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="col-span-3 grid grid-cols-3  max-lg:flex max-lg:flex-col gap-4">
          <div className="col-span-2 gap-5">
            <h1 className="text-primary font-bold">Profil Pengguna</h1>

            <div className="flex gap-3 items-center mt-2">
              <img
                src="/haerinTemp.jpg"
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div className="flex flex-col">
                <p className="font-medium">Michael kimeison</p>
                <p className="text-gray-400">mhaisias</p>
              </div>
            </div>

            <div className="flex flex-col mt-5 mb-5">
              <h1 className="text-primary font-bold">Metode Pembayaran</h1>
              <h1 className=" font-bold">QRIS BCA</h1>
            </div>

            <button className="rounded-md bg-primary px-4 py-2 mt-2 text-white">
              Lihat Bukti
            </button>
          </div>

          {/* State Makanan*/}
          <div className="flex flex-col gap-6 ">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start relative">
                {/* Dot and Line */}
                <div className="flex flex-col items-center mr-4">
                  {/* Dot */}
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusStyles(
                      step.status
                    )} z-10`}
                  />

                  {/* Line */}
                  {idx < steps.length - 1 && (
                    <div className="flex-1 w-1 bg-gray-400" />
                  )}
                </div>

                {/* Text Content */}
                <div>
                  <div className="font-semibold">{step.title}</div>
                  <div className="text-gray-500 text-sm">{step.time}</div>
                  {step.note && (
                    <div className="text-gray-400 italic text-sm">
                      {step.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPemesananAnalitik;
