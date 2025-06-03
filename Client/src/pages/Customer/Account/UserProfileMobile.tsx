import LoadingText from "@/assets/LoadingText";
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
      <div className=" max-md:px-4 bg-background max-md:py-5">
        <Link to={`/profile/${roleId}`}>
          <div className="px-5 py-10 flex items-center gap-5">
            <img src="/user/profileArrow.png" alt="" />
            <h1 className="text-2xl font-bold max-md:text-lg">Pengaturan</h1>
          </div>
        </Link>

        <div className="flex flex-col gap-3 justify-center items-center mt-10 bg-background ">
          <img
            src={
              userData?.user?.photo
                ? userData?.user?.photo
                : "/user/profilePlaceholder.jpg"
            }
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[20vh] h-[20vh] max-md:h-[20vh]"
          />
          <p className="font-bold">
            {" "}
            {`${userData?.first_name ?? ""} ${
              userData?.last_name ?? ""
            }`.trim() || <LoadingText />}
          </p>
          <p className="">{userData?.user?.email || <LoadingText />}</p>
        </div>

        <ProfileInformation />
      </div>
    </>
  );
};

export default UserProfileMobile;
