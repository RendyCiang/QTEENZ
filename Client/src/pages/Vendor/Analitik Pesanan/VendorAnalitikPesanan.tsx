import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import Button from "@/components/general/Button";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const VendorAnalitikPesanan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const { id } = useParams();
  return (
    <>
      <Sidebar props={vendorMenuList} />

      <div className=" bg-white justify-between flex max-md:hidden pl-70 pr-10">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/pesanan/${id}`}> Pesanan </Link>
          </span>
        </div>
        <h1 className="font-bold pt-8">Admin</h1>
      </div>
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Analitik Pesanan</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            {/* Pilihan */}
            <div className="cursor-pointer">
              <p className=" text-primary  max-md:text-sm">
                Semua{" "}
                <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal">
                  200
                </span>
              </p>
            </div>

            <div className="cursor-pointer">
              <p className=" text-primary  max-md:text-sm">
                Diproses{" "}
                <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal">
                  200
                </span>
              </p>
            </div>

            <div className="cursor-pointer">
              <p className=" text-primary  max-md:text-sm">
                Pengambilan{" "}
                <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal">
                  200
                </span>
              </p>
            </div>

            <div className="cursor-pointer">
              <p className=" text-primary  max-md:text-sm">Selesai </p>
            </div>
            <div className="flex items-center gap-4">
              {!showInputBox && (
                <img
                  src="/admin/searchIcon.svg"
                  className="p-3 bg-white border-gray-200 border-1 rounded-xl"
                  alt=""
                  onClick={() => setShowInputBox(!showInputBox)}
                />
              )}

              {showInputBox && (
                <input
                  type="text"
                  placeholder="Find Vendor"
                  className="p-2 rounded-xl outline-none border-gray border-1"
                />
              )}

              <button className="px-6 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
                + Tambah
              </button>
            </div>
          </div>
        </div>

        {/* <AdminVendorDashboard /> */}

        <div className="max-md:border-1 max-md:border-gray-300 rounded-lg py-4  max-h-[70vh] bg-white grid grid-cols-7 overflow-y-scroll">
          <Toaster />
          {/* Table Header */}
          <div className="col-span-1 max-md:text-sm">
            <p className=" text-gray text-center py-4">Id Pesanan</p>
          </div>
          <div className="col-span-2 max-md:text-sm">
            <p className="text-gray py-4">Waktu</p>
          </div>
          <div className="col-span-1 max-md:hidden max-md:col-span-0">
            <p className="text-gray py-4">Status</p>
          </div>
          <div className="col-span-1 max-md:col-span-2  max-md:text-sm">
            <p className="text-gray py-4">Pesanan</p>
          </div>
          <div
            className="col-span-1 max-md:col-span-2 flex items-center gap-2 justify-around cursor-pointer hover:opacity-80 "
            // onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <p className="text-gray py-4 max-md:text-sm">Total (Rp)</p>

            <div className="absolute "></div>
          </div>
          <div className="col-span-1"></div>

          {/* Data */}
          <div className="col-span-1 max-md:text-sm">
            <p className=" text-center py-4">ORD001</p>
          </div>
          <div className="col-span-2 max-md:text-sm">
            <p className=" py-4">03 Mar 2025, 12</p>
          </div>
          <div className="col-span-1 max-md:hidden max-md:col-span-0">
            <p className=" py-4">Status</p>
          </div>
          <div className="col-span-1 max-md:col-span-2  max-md:text-sm">
            <p className=" py-4">Pesanan</p>
          </div>
          <div
            className="col-span-1 max-md:col-span-2 flex items-center gap-2 justify-around cursor-pointer hover:opacity-80 "
            // onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <p className=" py-4 max-md:text-sm">Total (Rp)</p>

            <div className="absolute "></div>
          </div>
          <div className="col-span-1">
            <p>panah</p>
          </div>

          {/* Detail */}
          <div className="h-[500px] col-span-7 px-16 py-6 grid grid-cols-6 w-full">
            {/* Detail Item */}
            <div className="col-span-3 w-full gap-4 flex flex-col">
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
            <div className="col-span-3 grid grid-cols-3 gap-4 ">
              <div className="col-span-2">
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

                <div className="flex flex-col mt-2">
                  <h1 className="text-primary font-bold">Metode Pembayaran</h1>
                  <h1 className=" font-bold">QRIS BCA</h1>
                </div>

                <Button>Lihat Bukti</Button>
              </div>

              {/* State Makanan*/}
              <div></div>
            </div>
          </div>
        </div>

        {/* Pagination*/}
        <div className="justify-between flex my-2 max-md:justify-center">
          <p className="max-md:hidden">
            Menampilkan <span className="font-bold">1</span> dari{" "}
            <span className="font-bold">10</span> halaman
          </p>

          <div className="flex gap-4 ">
            <span className="text-xl ">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold">&#62;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAnalitikPesanan;
