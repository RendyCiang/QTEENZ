import LoadingSpinner from "@/assets/LoadingSpinner";
import useFetchData from "@/hooks/useFetchData";
import useUploadFile from "@/hooks/useUploadFile";
import { APIPayload, GetVendorData } from "@/types/types";
import { updateVendorProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import InputImage from "../general/InputImage";
import TextBox from "../general/TextBox";

interface FormProfileProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormFields = z.infer<typeof updateVendorProfileSchema>;

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

  // DATA Vendor
  const [vendorData, setVendorData] = useState<GetVendorData | null>(null);
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData<APIPayload<GetVendorData>>(
    `/users/get-user/${id}`
  );

  useEffect(() => {
    if (data?.data) {
      setVendorData(data.data);
    }
  }, [data]);

  //Handle Form
  const [imageUpdate, setImageUpdate] = useState<File | null>(null);
  const { uploadFile } = useUploadFile();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updateVendorProfileSchema),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              className="rounded-lg object-cover border border-gray-300 w-full h-[40vh]"
            />
            <InputImage
              name="imgUpdate"
              label=""
              value={imageUpdate}
              onChange={setImageUpdate}
              errorMsg=""
              disabledState={isEditing}
            />
            <p className="text-gray-500 text-sm mt-5 max-md:text-[12px] text-nowrap">
              Ukuran gambar: maks. 1 MB
            </p>
            <p className="text-gray-500 text-sm max-md:text-[12px] text-nowrap">
              Format gambar: JPEG, PNG
            </p>
          </div>

          {/* Bagian Form */}
          <div className="w-full mx-auto gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start">
            {/* Nama Gerai */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.nameGerai}
              register={register}
              errorMsg={errors.namaGerai?.message}
              name="namaGerai"
              disabledState={isEditing}
            />

            {/* Nama Pemilik */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.namaPemilik}
              register={register}
              errorMsg={errors.namaPemilik?.message}
              name="namaPemilik"
              disabledState={isEditing}
            />

            {/* Lokasi Gerai */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.location}
              register={register}
              errorMsg={errors.lokasiGerai?.message}
              name="lokasiGerai"
              disabledState={isEditing}
            />

            {/* Alamat Email */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.user?.email}
              register={register}
              errorMsg={errors.email?.message}
              name="email"
              disabledState={isEditing}
            />

            {/* Nomor Telepon */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.user?.phone}
              register={register}
              errorMsg={errors.phone?.message}
              name="phone"
              disabledState={isEditing}
            />

            {/* Jam Operasional */}
            <TextBox
              label="Jam Buka"
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              placeholder={vendorData?.open_hour}
              register={register}
              errorMsg={errors.jamBuka?.message}
              name="jamBuka"
            />
            <TextBox
              label="Jam Tutup"
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              placeholder={vendorData?.close_hour}
              type="text"
              register={register}
              errorMsg={errors.jamTutup?.message}
              name="jamTutup"
            />

            {/* Nomor Rekening */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.bank_account}
              register={register}
              errorMsg={errors.norek?.message}
              name="norek"
              disabledState={isEditing}
            />

            {/* Bank Pemilik Rekening */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Gerai"
              placeholder={vendorData?.bank_account}
              register={register}
              errorMsg={errors.bankType?.message}
              name="bankType"
              disabledState={isEditing}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5"></div>
        <button
          type="submit"
          disabled={!isEditing}
          onClick={handleEdit}
          className={`mt-5 w-full text-white font-medium py-2 px-6 rounded-lg transition h-12 cursor-pointer hover:opacity-80 ${
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
