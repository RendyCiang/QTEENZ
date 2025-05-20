import UpdatePassword from "@/components/user/UpdatePassword";
import { roleStore } from "@/store/roleStore";
import { Link } from "react-router-dom";

const UpdatePasswordMobile = () => {
  const { roleId } = roleStore();
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
            src="/user/profilePlaceholder.jpg"
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[20vh] h-[20vh] max-md:h-[20vh]"
          />
          <p className="font-bold">Michael Kimeison</p>
          <p className="">kanghaerin@gmail.com</p>
        </div>

        <UpdatePassword />
      </div>
    </>
  );
};
export default UpdatePasswordMobile;
