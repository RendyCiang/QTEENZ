import LoadingSpinner from "@/assets/LoadingSpinner";
import React from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-full max-w-lg min-h-[20vh] mx-4 bg-[#FFF9F8] rounded-xl p-16 text-center shadow-xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-black text-xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-black mb-2">
          {message ? message : "Yakin Ingin Terima?"}
        </h2>
        <p className="text-gray-500 mb-6">Konfirmasi aksi Anda</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-[#FF4B2B] cursor-pointer flex justify-center items-center text-white font-semibold py-3 rounded-lg hover:bg-[#e84325] transition"
          >
            {isLoading ? <LoadingSpinner /> : "Iya"}
          </button>

          <button
            onClick={onClose}
            className="border cursor-pointer border-[#FF4B2B] text-[#FF4B2B] font-semibold py-3 rounded-lg hover:bg-[#ffeae6] transition"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
