import NavbarMain from "@/components/general/NavbarMain";
// @ts-expect-error
// this worked, amitofo 🙏
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";

const TransactionReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (receiptRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: "struk-transaksi.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
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
          <p className="text-gray-400 ">Kembali</p>
        </div>

        <div
          ref={receiptRef}
          className="min-h-[75vh] px-20 py-15 max-md:px-5 max-md:py-3 rounded-lg bg-white"
        >
          <h1 className="text-3xl mb-10 font-bold">Struk Transaksi</h1>

          {/* Data */}
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <p className="text-primary font-bold text-xl mb-2">Pemilik</p>
              <div className=" grid grid-cols-2">
                <div>
                  <p className="font-bold">Nama</p>
                  <p className="font-bold">ID Transaksi</p>
                  <p className="font-bold">Tanggal</p>
                </div>
                <div>
                  <p>: Haerin</p>
                  <p>: HaerinKangKang</p>
                  <p>: 2025-04-25</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-primary font-bold text-xl mb-2 text-end">
                Vendor
              </p>

              <p className="text-end">Bakmi Effata</p>
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
            <div className="grid grid-cols-8  py-3 px-5">
              <p className="col-span-1 font-bold text-center">1. </p>
              <p className="col-span-3 font-bold text-center">
                Bakmi Ayam Jamur
              </p>
              <p className="col-span-1 font-bold text-center">Regular</p>
              <p className="col-span-1 font-bold text-center">2</p>
              <p className="col-span-1 font-bold text-center">25,000</p>
              <p className="col-span-1 font-bold text-center">50,000</p>
            </div>
            {/* Subtotal */}
            <div className="grid grid-cols-8 bg-primary-4th py-3 px-5">
              <p className="col-span-1 font-bold col-end-8 text-center">
                Subtotal
              </p>
              <p className="col-span-1 font-bold text-center">50,000</p>
            </div>
          </div>

          {/* Metode Pembayarain */}
          <p className="text-primary font-bold text-xl mb-2">
            Metode Pembayaran
          </p>
          <p>Gopay</p>
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
