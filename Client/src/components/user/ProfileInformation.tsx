import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextBox from "../general/TextBox";
import { z } from "zod";
import { updateUserProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  GetBuyerDataPayload,
  GetBuyerData,
  UpdateUserProfile,
} from "@/types/types";
import useFetchData from "@/hooks/useFetchData";
import toast, { Toaster } from "react-hot-toast";
import Button from "../general/Button";
import InputImage from "../general/InputImage";
import useUploadFile from "@/hooks/useUploadFile";
import { roleStore } from "@/store/roleStore";
import useUpdateUser from "@/hooks/User/useUpdateUser";
import { extractPublicId } from "@/utils/utils";
import useDeleteFile from "@/hooks/User/useDeleteFile";
import LoadingText from "@/assets/LoadingText";

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

  const [userData, setUserData] = useState<GetBuyerData | null>(null);
  const { id } = useParams();
  const { role } = roleStore();
  const { data, isLoading, error } = useFetchData<GetBuyerDataPayload>(
    `/users/get-user/${id}`
  );

  const { updateUser, updateLoading } = useUpdateUser();
  const { deleteFile } = useDeleteFile();

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
    if (imageUpdate) {
      imgUrl = await uploadFile({
        file: imageUpdate,
        folderDestination: "Buyer",
        name: (userData?.first_name ?? "") + (userData?.last_name ?? ""),
      });

      if (userData?.user?.photo) {
        const oldImage = extractPublicId(userData?.user?.photo);

        await deleteFile(oldImage);
      }
    }

    // dont forget to remove old image !!

    const credentials: Partial<UpdateUserProfile> = {
      role: role,
      first_name: data.first_name ? data.first_name : userData?.first_name,
      last_name: data.last_name ? data.last_name : userData?.last_name,
      email: data.email ? data.email : userData?.user?.email,
      phone: data.phone ? data.phone : userData?.user?.phone,
      photo: imgUrl ? imgUrl : userData?.user?.photo,
    };

    updateUser({ credentials: credentials, id: id });
  };

  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5 max-md:shadow-none">
      <Toaster />
      <p className="text-3xl font-bold max-md:hidden">Profil Saya</p>
      <div className="flex justify-between items-center max-md:hidden">
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

      <div className="max-md:hidden w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <div className="grid grid-cols-4 gap-5 ">
        <div className="col-span-1 items-center flex flex-col justify-center max-md:hidden">
          {isLoading ? (
            <div className="flex justify-center items-center w-full min-w-[20vw] min-h-[30vh] max-h-[50vh] max-md:h-[35vh]">
              <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            <img
              // src={`${
              //   userData.photo
              //     ? userData.photo
              //     : "/admin/temporaryVendorPicture.png"
              // }`}
              src={`${
                userData?.user?.photo
                  ? userData?.user?.photo
                  : "/user/profilePlaceholder.jpg"
              }`}
              alt="Profile Vendor"
              className="rounded-lg object-cover border border-gray-300 w-full min-w-[20vw] min-h-[30vh] max-h-[50vh] max-md:h-[35vh]"
            />
          )}

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
          className="col-span-3 flex flex-col max-md:col-span-4"
        >
          <p className="text-3xl font-semibold max-md:hidden">
            {`${userData?.first_name} ${userData?.last_name}`}
          </p>
          <p className="max-md:hidden text-sm mt-1 mb-3">
            {userData?.user?.email || "Email tidak tersedia"}
          </p>

          <p className="text-sm mt-1 hidden max-md:block mb-3 text-primary">
            Mengganti profil hanya dapat dilakukan pada desktop
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
            <TextBox
              label="Nama Depan"
              placeholder={userData?.first_name}
              register={register}
              errorMsg={errors.first_name?.message}
              name="first_name"
              disabledState={idleState}
            />
            <TextBox
              label="Nama Belakang"
              placeholder={userData?.last_name}
              type="text"
              register={register}
              errorMsg={errors.last_name?.message}
              name="last_name"
              disabledState={idleState}
            />
          </div>

          <TextBox
            label="Email"
            placeholder={userData?.user?.email || "-"}
            type="text"
            register={register}
            errorMsg={errors.email?.message}
            name="email"
            disabledState={idleState}
          />

          <TextBox
            label="Nomor Telepon"
            placeholder={userData?.user?.phone || "-"}
            type="text"
            register={register}
            errorMsg={errors.phone?.message}
            name="phone"
            disabledState={idleState}
          />

          <Button
            loading={idleState || updateLoading}
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
