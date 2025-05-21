import TextBox from "@/components/general/TextBox";
import ProfileInformation from "@/components/user/ProfileInformation";
import { roleStore } from "@/store/roleStore";
import React from "react";
import { Link } from "react-router-dom";

const UserProfileMobile = () => {
  const { roleId } = roleStore();
  // return (
  //   <div className="px-10 py-10">
  //     <Link to="">
  //       <div className="flex items-center gap-5">
  //         <img src="/user/profileArrow.png" alt="" />
  //         <h1 className="text-2xl font-bold">Pengaturan</h1>
  //       </div>
  //     </Link>

  //     <div className="flex flex-col gap-3 justify-center items-center mt-10">
  //       <img
  //         src="/user/profilePlaceholder.jpg"
  //         alt="Profile Vendor"
  //         className="rounded-full object-cover border border-gray-300 w-[20vh] h-[20vh] max-md:h-[20vh]"
  //       />
  //       <p className="font-bold">Michael Kimeison</p>
  //       <p className="">kanghaerin@gmail.com</p>
  //     </div>

  //     <TextBox
  //       label="Nama Depan"
  //       placeholder={userData?.buyer?.first_name || userData?.vendor?.name}
  //       required={true}
  //       register={register}
  //       errorMsg={errors.first_name?.message}
  //       name="first_name"
  //       disabledState={idleState}
  //     />
  //     <TextBox
  //       label="Nama Belakang"
  //       placeholder={userData?.buyer?.last_name || userData?.vendor?.name}
  //       type="text"
  //       required={true}
  //       register={register}
  //       errorMsg={errors.last_name?.message}
  //       name="last_name"
  //       disabledState={idleState}
  //     />
  //     <TextBox
  //       label="Email"
  //       placeholder={userData?.email}
  //       type="text"
  //       required={true}
  //       register={register}
  //       errorMsg={errors.email?.message}
  //       name="email"
  //       disabledState={idleState}
  //     />

  //     <TextBox
  //       label="Nomor Telepon"
  //       placeholder={userData?.phone}
  //       type="text"
  //       required={true}
  //       register={register}
  //       errorMsg={errors.phone?.message}
  //       name="phone"
  //       disabledState={idleState}
  //     />

  //     <Button
  //       loading={idleState}
  //       type="submit"
  //       variant="tertiary"
  //       className="mt-10"
  //     >
  //       <div className="w-full flex items-center justify-center gap-2">
  //         <p>Simpan</p>
  //       </div>
  //     </Button>
  //   </div>
  // );
  return (
    <>
      <div className="px-10 py-10 max-md:px-4">
        <Link to={`/profile/${roleId}`}>
          <div className="flex items-center gap-5">
            <img src="/user/profileArrow.png" alt="" />
            <h1 className="text-2xl font-bold max-md:text-xl">Pengaturan</h1>
          </div>
        </Link>

        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <img
            src="/user/profilePlaceholder.jpg"
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[20vh] h-[20vh] max-md:h-[20vh]"
          />
          <p className="font-bold">Michael Kimeison</p>
          <p className="">kanghaerin@gmail.com</p>
        </div>

        <ProfileInformation />
      </div>
    </>
  );
};

export default UserProfileMobile;
