import LoadingText from "@/assets/LoadingText";
import useFetchData from "@/hooks/useFetchData";
import { GetAllUsersPayload, GetAllUsersData } from "@/types/types";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const TotalPengguna = () => {
  const [vendorCount, setVendorCount] = useState<number | null>(null);
  const [buyerCount, setBuyerCount] = useState<number | null>(null);
  const { data, isLoading, error } =
    useFetchData<GetAllUsersPayload>("/users/get-user");

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      setVendorCount(data.data.filter((u) => u.role === "Seller").length);
      setBuyerCount(data.data.filter((u) => u.role === "Buyer").length);
    }
  }, [data]);

  if (error) {
    toast.error("Error fetching total pengguna data:");
  }

  return (
    <>
      <Toaster />
      <p className="font-bold max-md:mt-5 text-xl">Total Pengguna</p>
      <div className="min-h-[22vh] rounded-xl row-span-1 p-6 bg-white shadow-md　">
        <div className="flex gap-2 max-md:hidden">
          <img className="" src="/admin/totalPengguna.svg" alt="" />
          <p>Total Pengguna</p>
        </div>

        <div className="grid grid-cols-3 py-2 pt-4">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="flex gap-2 items-center">
              <div>
                <h1 className="text-6xl font-semibold text-primary">
                  {data?.data.length || <LoadingText />}
                </h1>
                <p className="font-bold">Pengguna</p>
              </div>
              <div>
                <Link to={"/admin/pengguna"}>
                  <img
                    className=" py-4 px-5 bg-primary-3rd rounded-full"
                    src="/admin/arrowPrimaryKanan.svg"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            {/* Lihat selengkapnya */}
            <Link to={"/admin/pengguna"}>
              <button className="cursor-pointer hover:opacity-80 px-4 py-1 mt-4 text-sm max-w-fit border-gray-300 border-1 rounded-lg">
                Lihat Selengkapnya
              </button>
            </Link>
          </div>

          {/*  */}
          <div className="flex flex-col gap-2 col-span-1">
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">
                {buyerCount || <LoadingText />}
              </h1>
              <p>Pembeli</p>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">
                {vendorCount || <LoadingText />}
              </h1>
              <p>Vendor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalPengguna;
