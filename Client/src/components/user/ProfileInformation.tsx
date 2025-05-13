import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextBox from "../general/TextBox";
import { z } from "zod";
import { updateUserProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetAllUsersData, GetUserPayload } from "@/types/types";
import useFetchData from "@/hooks/useFetchData";
import toast, { Toaster } from "react-hot-toast";
import Button from "../general/Button";
import InputImage from "../general/InputImage";
import useUploadFile from "@/hooks/useUploadFile";
export type FormFields = z.infer<typeof updateUserProfileSchema>;
const ProfileInformation = () => {
  const [idleState, setIdleState] = useState<boolean>(true);
  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updateUserProfileSchema),
  });

  const [imageUpdate, setImageUpdate] = useState<File | null>(null);

  const [userData, setUserData] = useState<GetAllUsersData | null>(null);
  const { id } = useParams();

  const { data, error } = useFetchData<GetUserPayload>(`/users/get-user/${id}`);

  const { uploadFile } = useUploadFile();

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  if (error) {
    toast("Error fetching data. Please try again.");
  }

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    let imgUrl;
    if (imageUpdate && userData?.photo) {
      imgUrl = await uploadFile({
        file: imageUpdate,
        folderDestination: userData?.buyer ? "Buyer" : "Vendor",
        name: userData?.buyer
          ? `${userData.buyer.first_name} ${userData.buyer.last_name}`
          : userData?.vendor?.name,
      });
    }

    // dont forget to remove old image
  };

  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5">
      <Toaster />
      <p className="text-3xl font-bold">Profil Saya</p>
      <div className="flex justify-between items-center">
        <p>
          Kelola informasi profil Anda untuk mengontrol, melindungi, dan
          mengamankan akun
        </p>
        <div
          onClick={() => setIdleState(!idleState)}
          className={`${
            !idleState ? "opacity-40" : "opacity-100"
          } cursor-pointer hover:opacity-80 flex items-center justify-center gap-3`}
        >
          <img src="/user/ubahProfil.svg" alt="" />
          <p className="text-primary">Ubah Profil</p>
        </div>
      </div>

      <div className="w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 items-center flex flex-col justify-center">
          <img
            src="/user/profilePlaceholder.jpg"
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[30vh] h-[30vh] max-md:h-[35vh] max-lg:w-[20vh] max-lg:h-[20vh]"
          />

          {/* <button
            disabled={idleState}
            className="px-10 rounded-lg py-2 border-1 border-gray-200 mt-4 cursor-pointer"
          > */}
          <InputImage
            name="imgUpdate"
            label=""
            value={imageUpdate}
            onChange={setImageUpdate}
            errorMsg=""
            disabledState={idleState}
          />
          {/* </button> */}

          <div className="my-5">
            <p className="text-center text-sm text-gray">
              Ukuran gambar: maks 1 MB
            </p>
            <p className="text-center text-sm text-gray">
              Format gambar: JPEG, PNG
            </p>
          </div>
        </div>

        {/* DATA */}
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="col-span-3 flex flex-col "
        >
          <p className="text-3xl font-semibold">
            {userData?.buyer
              ? `${userData.buyer.first_name} ${userData.buyer.last_name}`
              : userData?.vendor?.name || "Nama tidak tersedia"}
          </p>
          <p className="text-sm mt-1 mb-3">
            {userData?.email || "Email tidak tersedia"}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
            <TextBox
              label="Nama Depan"
              placeholder={
                userData?.buyer?.first_name || userData?.vendor?.name
              }
              required={true}
              register={register}
              errorMsg={errors.first_name?.message}
              name="first_name"
              disabledState={idleState}
            />
            <TextBox
              label="Nama Belakang"
              placeholder={userData?.buyer?.last_name || userData?.vendor?.name}
              type="text"
              required={true}
              register={register}
              errorMsg={errors.last_name?.message}
              name="last_name"
              disabledState={idleState}
            />
          </div>

          <TextBox
            label="Email"
            placeholder={userData?.email}
            type="text"
            required={true}
            register={register}
            errorMsg={errors.email?.message}
            name="email"
            disabledState={idleState}
          />

          <TextBox
            label="Nomor Telepon"
            placeholder={userData?.phone}
            type="text"
            required={true}
            register={register}
            errorMsg={errors.phone?.message}
            name="phone"
            disabledState={idleState}
          />

          <Button
            loading={idleState}
            type="submit"
            variant="tertiary"
            className="mt-10"
          >
            <div className="w-full flex items-center justify-center gap-2">
              <p>Simpan</p>
            </div>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
