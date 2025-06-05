import LoadingText from "@/assets/LoadingText";
import NavbarMain from "@/components/general/NavbarMain";
import useGetBuyerOrder from "@/hooks/queries/useGetBuyerOrder";
import useFetchData from "@/hooks/useFetchData";
import { APIPayload, OrderDetail, OrderDetailPayload } from "@/types/types";
import { formatDate, formatDateWithOffset } from "@/utils/utils";
// @ts-expect-error
// this worked, amitofo 🙏
import html2pdf from "html2pdf.js";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TransactionReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  // const { data, isLoading, error } = useFetchData<APIPayload<OrderDetail>>(
  //   `/orders/get-order-detail-buyer/${id}`
  // );
  const { data, isLoading, error } = useGetBuyerOrder();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();

  useEffect(() => {
    if (data?.orders) {
      const tempOrderDetail = data.orders.find(
        (order: OrderDetail) => order.id === id
      );

      setOrderDetail(tempOrderDetail);
    }
  }, [data]);

  const handleDownload = () => {
    if (receiptRef.current) {
      html2pdf()
        .set({
          margin: 0,
          filename: "struk-transaksi.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
        })
        .from(receiptRef.current)
        .save();
    }
  };
  return (
    <>
      <NavbarMain />
      <div className="min-h-[93vh] bg-background px-12 py-5">
        <div className="mb-10">
          <p
            onClick={() => navigate(-1)}
            className="text-gray-400 hoveredstate"
          >
            Kembali
          </p>
        </div>

        <div
          ref={receiptRef}
          className="min-h-[75vh] max-md:hidden px-20 py-15 max-md:px-5 max-md:py-3 rounded-lg bg-white"
        >
          <h1 className="text-3xl mb-10 font-bold">Struk Transaksi</h1>

          {/* Data */}
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <p className="text-primary font-bold text-xl mb-2">Pemilik</p>
              <div className=" grid grid-cols-2">
                <div className="flex gap-4 flex-col">
                  <p className="font-bold ">Nama</p>
                  <p className="font-bold ">ID Transaksi</p>
                  <p className="font-bold">Tanggal</p>
                </div>
                <div className="flex gap-4 flex-col">
                  <p>: {orderDetail?.buyerName || <LoadingText />}</p>
                  <p className="">: {orderDetail?.id || <LoadingText />}</p>
                  <p>
                    :{" "}
                    {formatDate(orderDetail?.updatePickedUpAt) || (
                      <LoadingText />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-primary font-bold text-xl mb-2 text-end">
                Vendor
              </p>

              <p className="text-end">
                {orderDetail?.orderItem[0].menuVariant.menu.vendor
                  .vendor_name || <LoadingText />}
              </p>
            </div>
          </div>

          {/* Rincian Transaksi Table */}
          <div className="my-5">
            <p className="text-primary font-bold text-xl mb-2">
              Rincian Transaksi
            </p>

            {/* Header */}
            <div className="grid grid-cols-8 bg-primary-4th py-3 px-5">
              <p className="col-span-1 font-bold text-center">No.</p>
              <p className="col-span-3 font-bold text-center">Menu</p>
              <p className="col-span-1 font-bold text-center">Variant</p>
              <p className="col-span-1 font-bold text-center">Qty</p>
              <p className="col-span-1 font-bold text-center">Price</p>
              <p className="col-span-1 font-bold text-center">Total</p>
            </div>

            {/* Items */}
            {orderDetail?.orderItem.map((item, index) => (
              <>
                <div className="grid grid-cols-8  py-3 px-5">
                  <p className="col-span-1 font-bold text-center">
                    {index + 1}.{" "}
                  </p>
                  <p className="col-span-3 font-bold text-center">
                    {item.menuVariant.menu.name || <LoadingText />}
                  </p>
                  <p className="col-span-1 font-bold text-center">
                    {item.menuVariant.name || <LoadingText />}
                  </p>
                  <p className="col-span-1 font-bold text-center">
                    {item.quantity || <LoadingText />}
                  </p>
                  <p className="col-span-1 font-bold text-center">
                    Rp. {item.pricePerMenu || <LoadingText />}
                  </p>
                  <p className="col-span-1 font-bold text-center">
                    Rp. {item.subtotalPerMenu || <LoadingText />}
                  </p>
                </div>
              </>
            ))}

            {/* Subtotal */}
            <div className="grid grid-cols-8 bg-primary-4th py-3 px-5">
              <p className="col-span-1 font-bold col-end-8 text-center">
                Subtotal
              </p>
              <p className="col-span-1 font-bold text-center">
                Rp. {orderDetail?.total_menu || <LoadingText />}
              </p>
            </div>
          </div>

          {/* Metode Pembayarain */}
          {/* <p className="text-primary font-bold text-xl mb-2">
            Metode Pembayaran
          </p>
          <p>Gopay</p> */}
        </div>

        <div className="flex justify-end items-end ">
          <button
            onClick={handleDownload}
            className="px-8 py-3 mt-4 cursor-pointer hover:opacity-80 rounded-xl text-white bg-primary"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionReceipt;
