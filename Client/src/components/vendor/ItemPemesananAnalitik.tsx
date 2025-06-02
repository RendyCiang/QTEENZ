import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Button from "../general/Button";
import { OrderDetailVendor } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import useHandleVendorOrder from "@/hooks/Vendor/useHandleVendorOrder";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { formatToIndoTime, formatUpdateDate } from "@/utils/utils";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-secondary-3rd"; // Soft yellow
    case "Accepted":
      return "bg-secondary-3rd"; // Light orange
    case "Declined":
      return "bg-gray"; // Light orange
    case "Cooking":
      return "bg-secondary-2nd"; // Brighter orange
    case "Ready":
      return "bg-primary"; // Strong orange
    case "Picked_Up":
      return "bg-secondary-4th"; // Neutral gray
    default:
      return "";
  }
};

const getDisplayStatus = (orderDetail: {
  status: string;
  statusPickup: string;
}) => {
  if (orderDetail.status === "Pending") return "Pending";
  if (orderDetail.status === "Declined") return "Declined";
  return orderDetail.statusPickup;
};

const ItemPemesananAnalitik = ({
  orderDetail,
}: {
  orderDetail: OrderDetailVendor;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const orderStatus = {
    status: orderDetail.status,
    statusPickup: orderDetail.statusPickup,
  };
  const displayStatus = getDisplayStatus(orderStatus);

  const {
    isLoadingHandleOrder,
    handleAcceptOrder,
    handleDeclineOrder,
    handleChangeStatusPickUp,
  } = useHandleVendorOrder();

  return (
    <>
      {/* Data */}
      <div
        className={`${
          isOpen ? "bg-primary-4th bg-sec" : "bg-none"
        } col-span-2 max-md:text-sm `}
      >
        <p className="text-center py-4  max-w-[250px]">{orderDetail.orderId}</p>
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
          className={`text-center rounded-lg w-full ${
            getStatusStyles(displayStatus) || ""
          } max-w-[150px] py-2 mt-2`}
        >
          {displayStatus}
        </p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:text-sm `}
      >
        <p className="py-4">
          {orderDetail.menuDetails.reduce(
            (sum, order) => sum + order.quantity,
            0
          )}
        </p>
      </div>

      <div
        className={`${
          isOpen ? "bg-primary-4th" : "bg-none"
        } col-span-1 max-md:col-span-1  hover:opacity-80`}
      >
        <p className="py-2 mt-2 max-md:text-sm">{orderDetail.totalPrice}</p>
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
            {orderDetail.menuDetails.map((item) => (
              <>
                <p className="col-span-2">
                  {item.menuName + " " + item.variantName}
                </p>
                <p className="col-span-1">{item.quantity}x</p>
              </>
            ))}
          </div>

          {/* Catatan */}
          {/* <div className="flex gap-3 items-center">
            <div className="w-1 rounded-full h-10 bg-gray-700"></div>

            <div className="flex flex-col">
              <p className="font-bold">Catatan</p>
              <p>skibidi</p>
            </div>
          </div> */}

          <div className="flex gap-3 items-center">
            {/* Buttons Menerima dan menolak*/}
            {orderDetail.status === "Pending" && (
              <>
                <div onClick={() => handleAcceptOrder(orderDetail.orderId)}>
                  <Button loading={isLoadingHandleOrder} variant={"primaryRed"}>
                    <p>Terima</p>
                  </Button>
                </div>
                <div onClick={() => handleDeclineOrder(orderDetail.orderId)}>
                  <Button loading={isLoadingHandleOrder} variant={"secondary"}>
                    <p>Tolak</p>
                  </Button>
                </div>
              </>
            )}

            {/* Button ready dan pickup */}
            <>
              {orderDetail.status === "Accepted" && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    disabled={isLoadingHandleOrder}
                    className={`flex justify-center cursor-pointer px-4 items-center py-2 font-bold text-xl border-primary border text-gray text-center rounded-md gap-2 ${
                      isLoadingHandleOrder
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoadingHandleOrder ? (
                      <LoadingSpinner />
                    ) : (
                      <p>Ganti Status</p>
                    )}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="border-none shadow-md bg-white rounded-lg w-[200px]"
                    style={{ zIndex: 9999 }}
                  >
                    <DropdownMenuItem
                      disabled={isLoadingHandleOrder}
                      onClick={() => handleDeclineOrder(orderDetail.orderId)}
                      className={`cursor-pointer p-2 rounded-lg hover:bg-primary hover:text-white ${
                        isLoadingHandleOrder
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Ditolak
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      disabled={isLoadingHandleOrder}
                      onClick={() =>
                        handleChangeStatusPickUp(orderDetail.orderId, "Ready")
                      }
                      className={`cursor-pointer p-2 rounded-lg hover:bg-primary hover:text-white ${
                        isLoadingHandleOrder
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Pesanan Siap
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      disabled={
                        isLoadingHandleOrder ||
                        orderDetail.statusPickup !== "Ready"
                      }
                      onClick={() =>
                        handleChangeStatusPickUp(
                          orderDetail.orderId,
                          "Picked_Up"
                        )
                      }
                      className={`p-2 rounded-lg ${
                        orderDetail.statusPickup === "Ready" &&
                        !isLoadingHandleOrder
                          ? "cursor-pointer hover:bg-primary hover:text-white"
                          : "cursor-not-allowed text-gray-400"
                      } ${isLoadingHandleOrder ? "opacity-50" : ""}`}
                    >
                      Diambil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          </div>
        </div>

        {/* Profil */}
        <div className="col-span-3 grid grid-cols-3  max-lg:flex max-lg:flex-col gap-4">
          <div className="col-span-2 gap-5">
            <h1 className="text-primary font-bold">Profil Pengguna</h1>

            <div className="flex gap-3 items-center mt-2">
              {/* <img
                src="/haerinTemp.jpg"
                className="w-10 h-10 rounded-full"
                alt=""
              /> */}
              <div className="flex flex-col">
                <p className="font-medium text-gray-400">Nama Pengguna:</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">{orderDetail.buyerName}</p>
              </div>
            </div>

            {/* <div className="flex flex-col mt-5 mb-5">
              <h1 className="text-primary font-bold">Metode Pembayaran</h1>
              <h1 className=" font-bold">QRIS BCA</h1>
            </div> */}

            <button className="rounded-md bg-primary px-4 py-2 mt-2 text-white cursor-pointer">
              Lihat Bukti
            </button>
          </div>

          {/* State Makanan*/}
          <div className="flex flex-col gap-6 ">
            <div className="flex items-start relative">
              {/* Dot and Line */}
              <div className="flex flex-col items-center mr-4">
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full z-10`} />

                {/* Line */}
                {/* {idx < steps.length - 1 && (
                    <div className="flex-1 w-1 bg-gray-400" />
                  )} */}
              </div>

              {/* Text Content */}
              <div>
                <div className="font-semibold">Diproses</div>
                <div className="text-gray-500 text-sm">
                  {formatUpdateDate("Accepted", orderDetail.updateAcceptedAt) +
                    " - " +
                    formatToIndoTime(orderDetail.updateAcceptedAt)}
                </div>
              </div>
            </div>

            <div className="flex items-start relative">
              {/* Dot and Line */}
              <div className="flex flex-col items-center mr-4">
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full z-10`} />

                {/* Line */}
                {/* {idx < steps.length - 1 && (
                    <div className="flex-1 w-1 bg-gray-400" />
                  )} */}
              </div>

              {/* Text Content */}
              <div>
                <div className="font-semibold">Pengambilan</div>
                <div className="text-gray-500 text-sm">
                  {formatUpdateDate("Accepted", orderDetail.updateReadyAt) +
                    " - " +
                    formatToIndoTime(orderDetail.updateReadyAt)}
                </div>
              </div>
            </div>

            <div className="flex items-start relative">
              {/* Dot and Line */}
              <div className="flex flex-col items-center mr-4">
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full z-10`} />

                {/* Line */}
                {/* {idx < steps.length - 1 && (
                    <div className="flex-1 w-1 bg-gray-400" />
                  )} */}
              </div>

              {/* Text Content */}
              <div>
                <div className="font-semibold">Selesai</div>
                <div className="text-gray-500 text-sm">
                  {formatUpdateDate("Accepted", orderDetail.updatePickedUpAt) +
                    " - " +
                    formatToIndoTime(orderDetail.updatePickedUpAt) || "**"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPemesananAnalitik;
