import React from "react";

type RejectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const RejectionModal: React.FC<RejectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-full max-w-md mx-4 bg-[#FFF9F8] rounded-xl p-16 text-center shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl font-bold hover:text-red-500 cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-black mb-2">
          {message ? message : "Yakin Ingin Terima?"}
        </h2>
        <p className="text-gray-500 mb-6">Konfirmasi aksi Anda</p>
        <textarea
          onChange={onChange}
          placeholder="Ketik alasan penolakan disini"
          className="w-full p-4 h-[10vh] bg-white mb-2 outline-primary"
          name=""
          id=""
        ></textarea>
        <div className="flex flex-row w-full gap-4">
          <button
            onClick={onConfirm}
            className="bg-[#FF4B2B] w-full cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-[#e84325] transition"
          >
            Iya
          </button>
          <button
            onClick={onClose}
            className="border w-full cursor-pointer border-[#FF4B2B] text-[#FF4B2B] font-semibold py-3 rounded-lg hover:bg-[#ffeae6] transition"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
