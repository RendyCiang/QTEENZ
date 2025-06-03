import TextBox from "@/components/general/TextBox";
import ProfileInformation from "@/components/user/ProfileInformation";
import useFetchData from "@/hooks/useFetchData";
import { roleStore } from "@/store/roleStore";
import { GetBuyerData, GetBuyerDataPayload } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserProfileMobile = () => {
  const { roleId } = roleStore();
  const { id } = useParams();
  const [userData, setUserData] = useState<GetBuyerData | null>(null);
  const { data, isLoading, error } = useFetchData<GetBuyerDataPayload>(
    `/users/get-user/${id}`
  );

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

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
