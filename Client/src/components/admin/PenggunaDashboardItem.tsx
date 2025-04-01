import { AdminPageDashboardItems, GetAllUsersData } from "@/types/types";
import { maskString } from "@/utils/utils";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { API } from "@/utils/API";
import toast, { Toaster } from "react-hot-toast";
import useDeleteUser from "@/hooks/queries/admin/useDeleteUser";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { Link, Navigate } from "react-router-dom";

const PenggunaDashboardItem: React.FC<
  Partial<AdminPageDashboardItems<GetAllUsersData>>
> = ({ key, isLoading, data, index }) => {
  const { deleteUser, isDeleting } = useDeleteUser();

  const deleteUserFn = () => {
    try {
      deleteUser(data?.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (data?.role == "Seller") {
    return (
      <>
        <Toaster />
        <div className="col-span-1">
          <p className=" max-md:text-sm text-center py-4">
            {index ? index + 1 : 1}
          </p>
        </div>
        <div className="col-span-2 max-md:text-sm max-md:col-span-4 flex items-center gap-4">
          <img
            className="w-[35px] h-[35px] rounded-full"
            src={data.photo ? data.photo : "/admin/bakmieTemp.png"}
            alt=""
          />
          <p className=" py-4">{data.vendor?.name}</p>
        </div>
        <div className="col-span-1 max-md:col-span-2">
          <p className="max-w-[150px] text-center rounded-xl py-2 bg-primary-2nd">
            Vendor
          </p>
        </div>
        <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
          <p className="py-4">{maskString(data.email)}</p>
        </div>
        <div className="col-span-2 max-md:hidden max-md:col-span-0">
          <p className="py-4 text-center ">{maskString(data.phone)}</p>
        </div>
        <div className="col-span-1 max-md:col-span-2 flex items-center justify-center gap-2">
          {isDeleting ? (
            <LoadingSpinner />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer hover:opacity-80 outline-none items-center py-4 font-bold text-2xl text-gray text-center">
                <p className="rotate-180 ">...</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none shadow-md bg-white rounded-lg w-[200px] p-2">
                <Link to={`/profile/${data.id}`}>
                  <DropdownMenuItem className="cursor-pointer hover:opacity-80 hover:bg-primary hover:text-white">
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={deleteUserFn}
                  className="cursor-pointer hover:opacity-80 hover:bg-primary hover:text-white"
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </>
    );
  }

  if (isLoading || !data) {
    return (
      <>
        <div className="col-span-1">
          <p className=" text-center max-md:hidden block py-4">
            <Skeleton width={50} height={20} />
          </p>
          <p className=" text-center max-md:block hidden py-4">
            <Skeleton width={20} height={20} />
          </p>
        </div>
        <div className="col-span-3 max-md:text-sm flex items-center gap-4 max-md:col-span-4">
          <Skeleton width={150} height={20} className="max-md:hidden block" />
        </div>
        <div className="col-span-1 max-md:hidden">
          <p className=" py-4">
            <Skeleton width={55} height={20} />
          </p>
        </div>
        <div className="col-span-2 max-md:text-sm max-md:col-span-3 max-md:text-start">
          <p className="py-4 flex">
            <Skeleton width={40} height={20} /> -{" "}
            <Skeleton width={40} height={20} />
          </p>
        </div>
        <div className="col-span-1 flex items-center gap-2 max-md:hidden">
          <Skeleton width={100} height={30} />
        </div>
        <div className="col-span-1 text-md">
          <p className="cursor-pointer hover:opacity-80 py-4 font-bold text-2xl text-gray text-center max-md:hidden">
            <Skeleton width={30} height={20} />
          </p>
          <p className=" py-4 font-bold text-2xl max-md:text-xl text-gray text-center rotate-180 hidden max-md:block">
            <Skeleton width={30} height={20} />
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-1">
        <p className=" max-md:text-sm text-center py-4">
          {index ? index + 1 : 1}
        </p>
      </div>
      <div className="col-span-2 max-md:text-sm max-md:col-span-4 flex items-center gap-4">
        <img
          className="w-[35px] h-[35px] rounded-full"
          src={data.photo ? data.photo : "/admin/bakmieTemp.png"}
          alt=""
        />
        <p className=" py-4">
          {data.buyer?.first_name + (data.buyer?.last_name || "")}
        </p>
      </div>
      <div className="col-span-1 max-md:col-span-2">
        <p className="max-w-[150px] text-center rounded-xl py-2 bg-secondary">
          Pembeli
        </p>
      </div>
      <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
        <p className="py-4">{maskString(data.email)}</p>
      </div>
      <div className="col-span-2 max-md:hidden max-md:col-span-0">
        <p className="py-4 text-center ">{maskString(data.phone)}</p>
      </div>
      <div className="col-span-1 max-md:col-span-2 flex items-center justify-center gap-2">
        {isDeleting ? (
          <LoadingSpinner />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer hover:opacity-80 outline-none items-center py-4 font-bold text-2xl text-gray text-center">
              <p className="rotate-180 ">...</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none shadow-md bg-white rounded-lg w-[200px] p-2">
              <Link to={`/profile/${data.id}`}>
                <DropdownMenuItem className="cursor-pointer hover:opacity-80 hover:bg-primary hover:text-white">
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={deleteUserFn}
                className="cursor-pointer hover:opacity-80 hover:bg-primary hover:text-white"
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default PenggunaDashboardItem;
