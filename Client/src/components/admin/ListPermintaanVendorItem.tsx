import LoadingSpinner from "@/assets/LoadingSpinner";
import useDeleteVendorRequest from "@/hooks/queries/admin/useDeleteVendorRequest";
import { AdminPageDashboardItems, RequestsPayload } from "@/types/types";
import { formatDateWithOffset, formatUpdateDate } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface ListPermintaanVendorItemProps {
  data?: RequestsPayload;
  index: number;
  isLoading?: boolean;
  onStatusChange?: (id: string, newStatus: string) => void;
}

const ListPermintaanVendorItem: React.FC<ListPermintaanVendorItemProps> = ({
  data,
  index,
  isLoading = false,
  onStatusChange,
}) => {
  const [shopStatus, setShopStatus] = useState<string>("Ditinjau");
  const [isOpen, setIsOpen] = useState(false);

  const { deleteRequest, isDeleting } = useDeleteVendorRequest();

  const deleteVendorRequest = () => {
    try {
      deleteRequest(data?.id);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

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
        <p className="text-center py-4 max-md:text-[12px]">{index + 1}</p>
      </div>
      <div className="col-span-2 flex items-center gap-4 max-md:col-span-4">
        {/* <img src="/admin/bakmieTemp.png" alt="" className="w-10 h-10" /> */}
        <p className="py-4 max-md:text-[12px] max-md:pl-2">{data?.vendor_name || "Tidak tersedia"}</p>
      </div>
      <div className="col-span-1 max-md:col-span-0 max-md:hidden">
        <p className="py-4 max-md:text-[12px]">{formatDateWithOffset(data?.createAt, 10)}</p>
      </div>
      <div className="col-span-2 max-md:col-span-0 max-md:hidden flex justify-center items-center">
        <p className="py-4 max-md:text-[12px]">{formatUpdateDate(data?.status, data?.updateAt)}</p>
      </div>

      <div className="col-span-2 flex justify-center w-full">
        {data?.status === "Pending" && (
          <p className=" max-md:text-[12px] max-w-fit max-md:min-w-[86px] min-w-[150px] rounded-[8px] max-md:px-3 max-md:py-1 px-10 bg-secondary-2nd py-2 text-center">
            Ditinjau
          </p>
        )}
        {data?.status === "Accepted" && (
          <p className=" max-md:text-[12px] max-w-fit max-md:min-w-[86px] min-w-[150px]  rounded-[8px] max-md:px-3 max-md:py-1 px-10 bg-green-500 py-2 text-center">
            Diterima
          </p>
        )}
        {data?.status === "Declined" && (
          <p className="max-md:text-[12px] max-w-fit max-md:min-w-[86px] min-w-[150px]  rounded-[8px]  max-md:px-3 max-md:py-1 px-10 bg-primary text-white py-2 text-center">
            Ditolak
          </p>
        )}
      </div>
      <div className="col-span-1 max-md:col-span-2 flex items-center justify-center gap-2">
        {/* <button
          className="py-4 font-bold text-2xl text-gray text-center w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ...
        </button> */}

        {/* Dropdown Menu */}
        {isDeleting ? (
          <LoadingSpinner />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none items-center py-4 font-bold text-2xl text-gray text-center ">
              <p className="rotate-180 max-md:text-[12px] ">...</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-none shadow-md bg-white rounded-lg w-[200px] "
              style={{ zIndex: 9999 }}
            >
              <Link to={`/admin/permintaan/${data.id}`}>
                <DropdownMenuItem className="cursor-pointer  p-2 rounded-lg hover:bg-primary hover:text-white max-md:text-[12px]">
                  Edit
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={deleteVendorRequest}
                className="cursor-pointer  p-2 rounded-lg hover:bg-primary hover:text-white max-md:text-[12px]"
              >
                Tolak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default ListPermintaanVendorItem;
