import useFetchData from "@/hooks/useFetchData";
import {
  GetAllVendorRequestData,
  GetAllVendorRequestPayload,
} from "@/types/types";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const RincianPermintaanForm = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData<GetAllVendorRequestData>(
    `/requests/get-request/${id}`
  );
  if (error) {
    toast.error("Terdapat Kesalahan. Coba Lagi.");
  }

  return (
    <>
      <Toaster />
      <div className="w-full min-h-[70vh]  px-4 rounded-lg bg-white py-10 overflow-hidden">
        <div className="grid grid-cols-3 gap-10 max-md:flex max-md:flex-col">
          {/* Gambar */}
          <div className="col-span-1">
            <img
              src={`${
                data?.photo ? data?.photo : "/vendor/penggunaDisabled.svg"
              }`}
              alt="Profile Vendor"
              className="rounded-lg object-cover border border-gray-300 w-full h-[50vh] max-md:h-[35vh]"
            />

            <div className="my-5">
              <p className="text-center text-sm text-gray">
                Ukuran gambar: maks 1 MB
              </p>
              <p className="text-center text-sm text-gray">
                Format gambar: JPEG, PNG
              </p>
            </div>

            <div>
              <button className="cursor-pointer hover:opacity-80 w-full mb-5 flex items-center text-center bg-primary text-white rounded-lg py-2 max-md:mb-2">
                <div className="w-full flex items-center justify-center gap-2">
                  <Link to={`/admin/permintaan`}>
                    <p>Terima</p>
                  </Link>
                  <img src="/admin/centangRincian.svg" alt="" />
                </div>
              </button>

              <button className="cursor-pointer hover:opacity-80 w-full flex items-center text-center border-1 border-gray text-gray rounded-lg py-2">
                <div className="w-full flex items-center justify-center gap-2">
                  <Link to={`/admin/permintaan`}>
                    <p>Tolak</p>
                  </Link>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-2 max-md:flex max-md:flex-col">
            {/* Nama Gerai */}
            <div className="w-full mb-5 flex justify-between items-center max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium max-md:mb-2 max-md:text-[14px]">
                Nama Gerai
              </p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                {data?.data.vendor_name}
              </p>
            </div>
            {/* Nama Pemilik */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Nama Pemilik</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                Bakmie Effata
              </p>
            </div>
            {/* Lokasi Gerai */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Lokasi Gerai</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                Bakmie Effata
              </p>
            </div>
            {/* Email */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Email</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                Bakmie Effata
              </p>
            </div>
            {/* Nomor Telpon */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Nomor Telepon</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                Bakmie Effata
              </p>
            </div>

            {/* Jam Operasional */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Jam Operasional</p>
              <div className="flex gap-2 max-md:w-full w-full max-w-[375px] items-center justify-center">
                <div className="max-w-[375px] border-1 border-gray py-2 px-5 rounded-lg w-full">
                  <p className="text-center">07.00</p>
                </div>
                <span>-</span>
                <div className="max-w-[375px] border-1 border-gray py-2 px-5 rounded-lg w-full">
                  <p className="text-center">17.00</p>
                </div>
              </div>
            </div>

            {/* KTP */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">KTP</p>
              <div className=" flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]">
                <p>ktp.jpg</p>
                <img src="/admin/downloadIcon.svg" alt="" />
              </div>
            </div>
            {/* Surat Permohonan */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Surat Permohonan</p>
              <div className=" flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]">
                <p>suratpermohonankerjasama.jpg</p>
                <img src="/admin/downloadIcon.svg" alt="" />
              </div>
            </div>
            {/* Proposal Usaha */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Proposal Usaha</p>
              <div className=" flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]">
                <p>proposalusaha.pdf</p>
                <img src="/admin/downloadIcon.svg" alt="" />
              </div>
            </div>
            {/*Keterangan */}
            <div className="w-full mb-5 flex justify-between items-start  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
                Keterangan
              </p>
              <div className="flex justify-between items-center w-full max-w-[375px]">
                <textarea
                  name="keterangan"
                  className="rounded-lg px-3 py-2 w-full border-1 border-gray text-[14px] focus:outline-primary resize-none pt-3"
                  placeholder="Masukkan Keterangan"
                  cols={5}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RincianPermintaanForm;
