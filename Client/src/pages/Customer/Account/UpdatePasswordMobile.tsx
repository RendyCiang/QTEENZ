import UpdatePassword from "@/components/user/UpdatePassword";
import useFetchData from "@/hooks/useFetchData";
import { roleStore } from "@/store/roleStore";
import { GetBuyerData, GetBuyerDataPayload } from "@/types/types";
import { id } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UpdatePasswordMobile = () => {
  const { roleId } = roleStore();
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
      <div className="px-10 py-10">
        <Link to={`/profile/${roleId}`}>
          <div className="flex items-center gap-5">
            <img src="/user/profileArrow.png" alt="" />
            <h1 className="text-2xl font-bold">Pengaturan</h1>
          </div>
        </Link>

        <div className="flex flex-col gap-3 justify-center items-center mt-10">
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
            {`${userData?.first_name ?? ""} ${
              userData?.last_name ?? ""
            }`.trim()}
          </p>
          <p className="">{userData?.user?.email}</p>
        </div>

        <UpdatePassword />
      </div>
    </>
  );
};
export default UpdatePasswordMobile;
