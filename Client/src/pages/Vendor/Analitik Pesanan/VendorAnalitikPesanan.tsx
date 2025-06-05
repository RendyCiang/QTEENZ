import vendorMenuList from "@/assets/Admin/vendorDashboard";
import LoadingSpinner from "@/assets/LoadingSpinner";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import ItemPemesananAnalitik from "@/components/vendor/ItemPemesananAnalitik";
import ModalNotification from "@/components/vendor/ModalNotification";
import useGetVendorOrder from "@/hooks/queries/useGetVendorOrder";
import { OrderDetailVendor } from "@/types/types";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};
const VendorAnalitikPesanan = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<number>(1);
  const { id } = useParams();
  // const { data, isLoading, error } = useFetchData<OrderDetailVendorPayload>(
  //   `/orders/get-orders-vendor`
  // );
  const { data, isLoading, error } = useGetVendorOrder();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [diprosesCount, setDiprosesCount] = useState<number>(0);
  const [pengambilanCount, setPengambilanCount] = useState<number>(0);

  const [allOrder, setAllOrder] = useState<OrderDetailVendor[]>([]);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.orders) {
      const sortedData = [...data.orders].sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );

      const latestOrderId = sortedData[0]?.orderId;
      if (latestOrderId && latestOrderId !== lastOrderId) {
        toast.success("Pesanan baru telah masuk!");
        setLastOrderId(latestOrderId);
      }

      // Order Filtering
      let filteredOrders = sortedData.filter(
        (d) => d.transactionStatus === "Success"
      );

      filteredOrders = filteredOrders.filter((item) => {
        const orderDate = new Date(item.createAt);
        return (
          item.transactionStatus === "Success" &&
          dateRange?.from &&
          dateRange?.to &&
          orderDate >= dateRange.from &&
          orderDate <= dateRange.to
        );
      });

      // let filteredOrders = data.orders;

      if (filterType === 2) {
        filteredOrders = data.orders.filter(
          (order) =>
            order.status !== "Declined" && order.statusPickup === "Cooking"
        );
      } else if (filterType === 3) {
        filteredOrders = data.orders.filter(
          (order) =>
            order.status !== "Declined" && order.statusPickup === "Ready"
        );
      } else if (filterType === 4) {
        filteredOrders = data.orders.filter(
          (order) =>
            order.status !== "Declined" && order.statusPickup === "Picked_Up"
        );
      }

      // Set Counts
      setTotalCount(data.orders.length);
      setDiprosesCount(
        data.orders.filter(
          (order) =>
            order.status !== "Declined" && order.statusPickup === "Cooking"
        ).length
      );
      setPengambilanCount(
        data.orders.filter(
          (order) =>
            order.status !== "Declined" && order.statusPickup === "Picked_Up"
        ).length
      );
      setAllOrder(filteredOrders);
    }
  }, [data, filterType, dateRange]);

  return (
    <>
      <Sidebar props={vendorMenuList} />

      <div className=" bg-white justify-between flex max-md:hidden pl-70 pr-10">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/pesanan/${id}`}> Pesanan </Link>
          </span>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Notification
            count={0}
            onClick={() => setNotifOpen(true)}
            apiEndpoint="orders/get-orders-vendor"
          />
          <h1 className="font-bold">Vendor</h1>
        </div>
        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:text-2xl max-md:pb-5">
            Analitik Pesanan
          </h1>
          <div className=" flex justify-between items-center mt-7 max-md:mb-5 max-md:mt-0">
            <div className="flex gap-4 max-md:gap-2">
              {/* Pilihan */}
              <div className="cursor-pointer" onClick={() => setFilterType(1)}>
                <p
                  className={`${
                    filterType === 1 ? "text-primary" : "text-black"
                  }   max-md:text-sm`}
                >
                  Semua{" "}
                  <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal max-md:hidden">
                    {totalCount}
                  </span>
                </p>
              </div>

              <div className="cursor-pointer" onClick={() => setFilterType(2)}>
                <p
                  className={`${
                    filterType === 2 ? "text-primary" : "text-black"
                  }   max-md:text-sm`}
                >
                  Diproses{" "}
                  <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal max-md:hidden">
                    {diprosesCount}
                  </span>
                </p>
              </div>

              <div className="cursor-pointer" onClick={() => setFilterType(3)}>
                <p
                  className={`${
                    filterType === 3 ? "text-primary" : "text-black"
                  }   max-md:text-sm`}
                >
                  Pengambilan{" "}
                  <span className="py-1 px-2 bg-primary rounded-full text-white ml-2 max-md:text-sm font-normal max-md:hidden">
                    {pengambilanCount}
                  </span>
                </p>
              </div>

              <div className="cursor-pointer" onClick={() => setFilterType(4)}>
                <p
                  className={`${
                    filterType === 4 ? "text-primary" : "text-black"
                  }   max-md:text-sm`}
                >
                  Selesai{" "}
                </p>
              </div>
            </div>

            {/* Order By Date */}
            {/* <div></div> */}
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>

        {/* <AdminVendorDashboard /> */}

        <div className="max-md:border-1 max-md:border-gray-300 rounded-lg py-4  max-h-[70vh] bg-white grid grid-cols-7 overflow-y-scroll max-md:grid-cols-6">
          <Toaster />
          {/* Table Header */}
          <div className="col-span-2 max-md:text-sm max-md:col-span-1">
            <p className=" text-gray text-center max-w-[250px] py-4 max-md:text-[12px] max-md:py-2">
              Id
            </p>
          </div>
          <div className="col-span-1 max-md:text-sm max-md:col-span-1">
            <p className="text-gray py-4 max-md:text-[12px] max-md:py-2">
              Waktu
            </p>
          </div>
          <div className="col-span-1 max-md:text-sm  max-md:col-span-1">
            <p className="text-gray py-4 max-md:text-[12px] max-md:py-2">
              Status
            </p>
          </div>
          <div className="col-span-1 max-md:col-span-1  max-md:text-sm">
            <p className="text-gray py-4 max-md:text-[12px] max-md:py-2">
              Pesanan
            </p>
          </div>
          <div
            className="col-span-1 max-md:col-span-2  cursor-pointer hover:opacity-80 "
            // onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <p className="text-gray py-4 max-md:text-[12px] max-md:py-2">
              Total (Rp)
            </p>

            <div className="absolute "></div>
          </div>
          <div className="col-span-1 max-md:col-span-0 max-md:hidden"></div>

          {isLoading && (
            <>
              <div className="col-span-2 max-md:text-sm">
                <p className=" text-gray text-center py-4">
                  <Skeleton width={150} height={20} />
                </p>
              </div>
              <div className="col-span-1 max-md:text-sm max-md:col-span-1">
                <p className="text-gray py-4">
                  <Skeleton width={70} height={20} />
                </p>
              </div>
              <div className="col-span-1 max-md:col-span-1">
                <p className="text-gray py-4">
                  <Skeleton width={150} height={20} />
                </p>
              </div>
              <div className="col-span-1 max-md:col-span-1  max-md:text-sm">
                <p className="text-gray py-4">
                  <Skeleton width={70} height={20} />
                </p>
              </div>
              <div
                className="col-span-1 max-md:col-span-2  cursor-pointer hover:opacity-80 "
                // onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <p className="text-gray py-4 max-md:text-sm">
                  <Skeleton width={70} height={20} />
                </p>

                <div className="absolute max-md:hidden"></div>
              </div>
              <div className="col-span-1 max-md:col-span-0 max-md:hidden"></div>
            </>
          )}
          {allOrder.map((order, index) => (
            <ItemPemesananAnalitik orderDetail={order} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorAnalitikPesanan;
