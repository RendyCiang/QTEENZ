import LoadingSpinner from "@/assets/LoadingSpinner";
import useFetchData from "@/hooks/useFetchData";
import useUploadFile from "@/hooks/useUploadFile";
import { APIPayload, GetVendorData } from "@/types/types";
import { updateVendorProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import InputImage from "../general/InputImage";
import TextBox from "../general/TextBox";
import { extractPublicId } from "@/utils/utils";
import useDeleteFile from "@/hooks/User/useDeleteFile";
import useUpdateUser from "@/hooks/User/useUpdateUser";

const dropdownOptionsLocation = [
  { value: "Kantin_Basement", label: "Kantin Basement" },
  { value: "Kantin_Payung", label: "Kantin Payung" },
  { value: "Kantin_Lt5", label: "Kantin Lt5" },
];

const dropdownOptionsBank = [
  { value: "BCA", label: "Bank Central Asia" },
  { value: "Mandiri", label: "Bank Mandiri" },
  { value: "BNI", label: "Bank Negara Indonesia" },
  { value: "BRI", label: "Bank Rakyat Indonesia" },
  { value: "CIMB", label: "Bank CIMB Niaga" },
  { value: "Permata", label: "Bank Permata" },
  { value: "Danamon", label: "Bank Danamon" },
  { value: "Maybank", label: "Bank Maybank" },
  { value: "Panin", label: "Bank Panin" },
  { value: "OCBC", label: "Bank OCBC" },
  { value: "HSBC", label: "Bank HSBC" },
  { value: "UOB", label: "Bank UOB" },
  { value: "Citibank", label: "Bank Citibank" },
];

interface FormProfileProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormFields = z.infer<typeof updateVendorProfileSchema>;

function FormProfile({ isEditing, setIsEditing }: FormProfileProps) {
  // DATA Vendor
  const [vendorData, setVendorData] = useState<GetVendorData | null>(null);
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData<APIPayload<GetVendorData>>(
    `/users/get-user/${id}`
  );
  const { deleteFile } = useDeleteFile();
  const { uploadFile } = useUploadFile();
  const { updateUser, updateLoading } = useUpdateUser();

  useEffect(() => {
    if (data?.data) {
      setVendorData(data.data);
      console.log(data.data);
    }
  }, [data]);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  //Handle Form
  const [imageUpdate, setImageUpdate] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updateVendorProfileSchema),
  });

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    let imgUrl;
    console.log("clicked");

    console.log(data, imageUpdate);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-[1440px] bg-white w-full mt-6 py-10 rounded-[8px] shadow-md px-5 md:px-10 lg:px-20">
      <form onSubmit={handleSubmit(handleSubmitForm)} action="">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Bagian Gambar */}
          <div className="w-1/2 flex flex-col items-center">
            <img
              src={`${
                vendorData?.user?.photo
                  ? vendorData?.user?.photo
                  : "/user/profilePlaceholder.jpg"
              }`}
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
              placeholder={vendorData?.name}
              register={register}
              errorMsg={errors.namaGerai?.message}
              name="namaGerai"
              disabledState={isEditing}
            />

            {/* Nama Pemilik */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nama Pemilik"
              placeholder={vendorData?.vendor_name}
              register={register}
              errorMsg={errors.namaPemilik?.message}
              name="namaPemilik"
              disabledState={isEditing}
            />

            {/* Lokasi Gerai */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full mb-3">
              <p className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
                Lokasi
              </p>
              <select
                {...register("lokasiGerai", {
                  required: true,
                })}
                name="lokasi"
                className="border-1 border-gray py-3 px-3 rounded-[8px] w-full"
              >
                <option value="" disabled>
                  Pilih Lokasi
                </option>
                {dropdownOptionsLocation.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.lokasiGerai && (
                <p className="text-red-500 text-sm">
                  {errors.lokasiGerai.message}
                </p>
              )}
            </div>

            {/* Alamat Email */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Email"
              placeholder={vendorData?.user?.email}
              register={register}
              errorMsg={errors.email?.message}
              name="email"
              disabledState={isEditing}
            />

            {/* Nomor Telepon */}
            <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Nomor Telepon"
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
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full "
              label="Nomor Rekening"
              placeholder={vendorData?.bank_account}
              register={register}
              errorMsg={errors.norek?.message}
              name="norek"
              disabledState={isEditing}
            />

            {/* Bank Pemilik Rekening */}
            {/* <TextBox
              className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full"
              label="Bank Pemilik Rekening"
              placeholder={vendorData?.bank_type}
              register={register}
              errorMsg={errors.bankType?.message}
              name="bankType"
              disabledState={isEditing}
            /> */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 items-center max-md:flex max-md:flex-col max-md:items-start max-md:w-full">
              <p className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
                Bank Pemilik Rekening
              </p>
              <select
                {...register("bankType", {
                  required: true,
                })}
                name="bankPemilikRekening"
                className="border-1 border-gray py-3 px-3 rounded-[8px] w-full"
              >
                <option value="" disabled>
                  Pilih Bank
                </option>
                {dropdownOptionsBank.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.bankType && (
                <p className="text-red-500 text-sm">
                  {errors.bankType.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5"></div>
        <button
          type="submit"
          disabled={isEditing}
          onClick={handleEdit}
          className={`mt-5 w-full text-white font-medium py-2 px-6 rounded-lg transition h-12 cursor-pointer hover:opacity-80 ${
            isEditing
              ? "bg-primary-2nd cursor-not-allowed opacity-50"
              : "bg-primary"
          }`}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default FormProfile;
