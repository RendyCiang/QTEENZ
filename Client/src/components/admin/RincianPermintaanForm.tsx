import React from "react";

const RincianPermintaanForm = () => {
  return (
    <div className="min-h-[70vh] py-5 px-20 rounded-lg bg-white">
      <div className="grid grid-cols-3 gap-10">
        {/* Gambar */}
        <div className="col-span-1">
          <img src="/haerinTemp.jpg" className="w-full h-[40vh]" alt="" />

          <div className="my-5">
            <p className="text-center text-sm text-gray">
              Ukuran gambar: maks 1 MB
            </p>
            <p className="text-center text-sm text-gray">
              Format gambar: JPEG, PNG
            </p>
          </div>

          <div>
            <button className="cursor-pointer w-full mb-5 flex items-center text-center bg-primary text-white rounded-lg py-2">
              <div className="w-full flex items-center justify-center gap-2">
                <p>Terima</p>
                <img src="/admin/centangRincian.svg" alt="" />
              </div>
            </button>

            <button className="cursor-pointer w-full flex items-center text-center border-1 border-gray text-gray rounded-lg py-2">
              <div className="w-full flex items-center justify-center gap-2">
                <p>Tolak</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="col-span-2">
          <div className="w-full mb-5 flex justify-between items-center">
            <p className="font-semibold">Nama Gerai</p>
            <p className="py-2 border-gray-400 border-1 px-4 rounded-lg w-full max-w-[375px]">
              Bakmie Effata
            </p>
          </div>
          <div className="w-full mb-5 flex justify-between items-center">
            <p className="font-semibold">Jam Operasional</p>
            <div className="max-w-[375px]"></div>
          </div>

          {/* KTP */}
          <div className="w-full mb-5 flex justify-between items-center">
            <p className="font-semibold">KTP</p>
            <div className=" flex justify-between items-center py-2 bg-gray-200 px-4 rounded-lg w-full max-w-[375px]">
              <p>ktp.jpg</p>
              <img src="/admin/downloadIcon.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RincianPermintaanForm;
