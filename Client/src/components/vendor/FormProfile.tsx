import React, { useState } from "react";

interface FormProfileProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormProfile({ isEditing, setIsEditing }: FormProfileProps) {
  const [formData, setFormData] = useState({
    namaGerai: "Bakmi Effata",
    namaPemilik: "Cici Effata",
    lokasiGerai: "Kantin Payung",
    email: "bakmieffata@gmail.com",
    nomorTelepon: "086512498791",
    jamOperasionalStart: "07:00",
    jamOperasionalEnd: "17:00",
    nomorRekening: "133018213421",
    bankPemilikRekening: "Bank Central Asia",
  });

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-[1440px] bg-white w-full mt-6 py-10 rounded-[8px] shadow-md px-5 md:px-10 lg:px-20">
      <form action="">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Bagian Gambar */}
          <div className="w-1/2 flex flex-col items-center">
            <img
              src="/haerinTemp.jpg"
              alt="Profile Vendor"
              width={300}
              height={300}
              className="rounded-lg object-cover border border-gray-300"
            />
            <p className="text-gray-500 text-sm mt-2 max-md:text-[12px] text-nowrap">
              Ukuran gambar: maks. 1 MB
            </p>
            <p className="text-gray-500 text-sm max-md:text-[12px] text-nowrap">Format gambar: JPEG, PNG</p>
          </div>

          {/* Bagian Form */}
          <div className="w-full mx-auto grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start">
            {/* Nama Gerai */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Nama Gerai
            </label>
            <input
              type="text"
              name="namaGerai"
              value={formData.namaGerai}
              onChange={handleChange}
              className={`border-1 rounded-lg h-10 px-3 py-2 w-full text-[14px] transition-all duration-200 
${
  isEditing
    ? " focus:outline-primary"
    : "border-gray-200 bg-gray-100 cursor-not-allowed"
}
`}
              disabled={!isEditing}
            />

            {/* Nama Pemilik */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1 ">
              Nama Pemilik
            </label>

            <input
              type="text"
              name="namaPemilik"
              value={formData.namaPemilik}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />

            {/* Lokasi Gerai */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Lokasi Gerai
            </label>

            <input
              type="text"
              name="lokasiGerai"
              value={formData.lokasiGerai}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />

            {/* Alamat Email */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1 ">
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />

            {/* Nomor Telepon */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />

            {/* Jam Operasional */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Jam Operasional
            </label>
            <div className="flex gap-2 items-center justify-center max-md:w-full">
              <input
                type="time"
                name="jamOperasionalStart"
                value={formData.jamOperasionalStart}
                onChange={handleChange}
                className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full  ${
                  isEditing
                    ? "focus:outline-primary"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
                disabled={!isEditing}
              />
              <span className="flex items-center">-</span>
              <input
                type="time"
                name="jamOperasionalEnd"
                value={formData.jamOperasionalEnd}
                onChange={handleChange}
                className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                  isEditing
                    ? "focus:outline-primary"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
                disabled={!isEditing}
              />
            </div>

            {/* Nomor Rekening */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Nomor Rekening
            </label>
            <input
              type="text"
              name="nomorRekening"
              value={formData.nomorRekening}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />

            {/* Bank Pemilik Rekening */}
            <label className="text-[14px] font-medium whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1">
              Bank Pemilik Rekening
            </label>
            <input
              type="text"
              name="bankPemilikRekening"
              value={formData.bankPemilikRekening}
              onChange={handleChange}
              className={`text-[14px] border-1 border-gray rounded-lg h-10 px-3 py-2 w-full ${
                isEditing
                  ? "focus:outline-primary"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5"></div>
        <button
          type="submit"
          disabled={!isEditing}
          onClick={handleEdit}
          className={`mt-5 w-full text-white font-medium py-2 px-6 rounded-lg transition h-12 cursor-pointer ${
            isEditing
              ? "bg-primary"
              : "bg-primary-2nd cursor-not-allowed opacity-50"
          }`}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default FormProfile;
