import useFetchData from "@/hooks/useFetchData";
import {
  GetAllVendorRequestData,
  GetVendorRequestPayload,
} from "@/types/types";
import { getFileName } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../general/ConfirmModal";
import { API } from "@/utils/API";
import RejectionModal from "./RejectionModal";

const RincianPermintaanForm = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  const [rejectionMessage, setRejectionMessage] = useState<string>("");

  const navigate = useNavigate();

  const { id } = useParams();
  const [requestData, setRequestData] = useState<GetAllVendorRequestData>(
    {} as GetAllVendorRequestData
  );
  const { data, isLoading, error } = useFetchData<GetVendorRequestPayload>(
    `/requests/get-request/${id}`
  );

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);

      setRequestData(data.data);
    }
  }, [requestData, data]);

  if (error) {
    toast.error("Terdapat Kesalahan. Coba Lagi.");
  }

  const handleAccept = async () => {
    const credentials = {
      status: "Accepted",
      message: "",
    };

    try {
      await API.put(`requests/update-request/${id}`, credentials);
      toast.success("Permintaan Berhasil Diterima");
      navigate(`/admin/permintaan`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui permintaan");
    }
  };

  const handleReject = async () => {
    const credentials = {
      status: "Declined",
      message: rejectionMessage,
    };

    try {
      await API.post(`requests/delete-request/${id}`, credentials);
      toast.success("Permintaan Berhasil Ditolak");
      navigate(`/admin/permintaan`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menolak permintaan");
    }
  };

  return (
    <>
      <Toaster />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleAccept}
      />
      <RejectionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        onChange={(e) => setRejectionMessage(e.target.value)}
      />
      <div className="w-full min-h-[70vh] px-4 rounded-lg bg-white py-10 overflow-hidden">
        <div className="grid grid-cols-3 gap-10 max-xl:flex max-xl:flex-col">
          {/* Gambar */}
          <div className="col-span-1">
            {isLoading ? (
              <div className="flex justify-center items-center w-full min-w-[20vw] min-h-[30vh] max-h-[50vh] max-md:h-[35vh]">
                <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : (
              <img
                src={`${
                  requestData.photo
                    ? requestData.photo
                    : "/admin/temporaryVendorPicture.png"
                }`}
                alt="Profile Vendor"
                className="rounded-lg object-cover border border-gray-300 w-full min-w-[20vw] min-h-[30vh] max-h-[50vh] max-md:h-[35vh]"
              />
            )}

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
                <div
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <p>Terima</p>
                  <img src="/admin/centangRincian.svg" alt="" />
                </div>
              </button>

              <button className="cursor-pointer hover:opacity-80 w-full flex items-center text-center border-1 border-gray text-gray rounded-lg py-2">
                <div
                  onClick={() => {
                    setIsRejectModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <p>Tolak</p>
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
                {requestData.name}
              </p>
            </div>
            {/* Nama Pemilik */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Nama Pemilik</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                {requestData.vendor_name}
              </p>
            </div>
            {/* Lokasi Gerai */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Lokasi Gerai</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                {requestData.location}
              </p>
            </div>
            {/* Email */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Email</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                {requestData.email}
              </p>
            </div>
            {/* Nomor Telpon */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Nomor Telepon</p>
              <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
                {requestData.phone}
              </p>
            </div>

            {/* Jam Operasional */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Jam Operasional</p>
              <div className="flex gap-2 max-md:w-full w-full max-w-[375px] items-center justify-center">
                <div className="max-w-[375px] border-1 border-gray py-2 px-5 rounded-lg w-full">
                  <p className="text-center">{requestData.open_hour}</p>
                </div>
                <span>-</span>
                <div className="max-w-[375px] border-1 border-gray py-2 px-5 rounded-lg w-full">
                  <p className="text-center">{requestData.close_hour}</p>
                </div>
              </div>
            </div>

            {/* KTP */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">KTP</p>
              <a
                href={requestData.photo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]"
              >
                <p>{getFileName(requestData.photo)}</p>
                <img src="/admin/downloadIcon.svg" alt="Download Icon" />
              </a>
            </div>

            {/* Surat Permohonan */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Surat Permohonan</p>
              <a
                href={requestData.document}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]"
              >
                <p>{getFileName(requestData.document)}</p>
                <img src="/admin/downloadIcon.svg" alt="Download Icon" />
              </a>
            </div>
            {/* Proposal Usaha */}
            <div className="w-full mb-5 flex justify-between items-center  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
              <p className="text-[14px] font-medium">Proposal</p>
              <a
                href={requestData.proposal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]"
              >
                <p>{getFileName(requestData.proposal)}</p>
                <img src="/admin/downloadIcon.svg" alt="Download Icon" />
              </a>
            </div>
            {/*Keterangan */}
            {/* <div className="w-full mb-5 flex justify-between items-start  max-md:flex max-md:flex-col max-md:items-start max-md:mb-5">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RincianPermintaanForm;
