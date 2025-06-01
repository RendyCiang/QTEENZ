import { Icon } from "@iconify/react";

import { OrderVendorPayload } from "@/types/types";
import useFetchData from "@/hooks/useFetchData";

export default function DashboardOrderSection() {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useFetchData<OrderVendorPayload>("/orders/get-orders-vendor");

  const processedOrders =
    ordersData?.orders
      ?.filter((order) => {
        const orderDate = new Date(order.createAt);
        const today = new Date();
        return (
          orderDate.getFullYear() === today.getFullYear() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getDate() === today.getDate()
        );
      })
      ?.map((order) => {
        const paymentStatus =
          order.transactionStatus === "Success" ? "Sudah bayar" : "Belum bayar";

        let status = "";
        let statusColor = "";

        if (order.status === "Pending") {
          status = "Pending";
          statusColor = "bg-yellow-100 text-yellow-800";
        } else if (
          order.status === "Accepted" &&
          order.statusPickup === "Read"
        ) {
          status = "Siap";
          statusColor = "bg-green-100 text-green-800";
        } else if (
          order.status === "Accepted" &&
          order.statusPickup === "Picked_Up"
        ) {
          status = "Selesai";
          statusColor = "bg-blue-100 text-blue-800";
        } else if (order.status === "Accepted") {
          status = "Diproses";
          statusColor = "bg-orange-100 text-orange-800";
        } else if (order.status === "Declined") {
          status = "Batal";
          statusColor = "bg-red-100 text-red-800";
        }

        const totalItems =
          order.menuDetails?.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          ) || 0;

        return {
          id: order.orderId,
          customer: order.buyerName || "Unknown Customer",
          avatar: order.userPhoto || "/user/profilePlaceholder.jpg",
          items: totalItems,
          status,
          statusColor,
          paymentStatus,
        };
      }) || [];

  if (ordersLoading) {
    return (
      <div className="bg-white rounded-lg p-5 border border-primary-4th">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Icon icon="ep:list" className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Daftar Orderan</h2>
          </div>
        </div>
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center pb-2 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="bg-white rounded-lg p-5 border border-primary-4th">
        <div className="text-red-600">
          Error: {(ordersError as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-5 border border-primary-4th">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Icon icon="ep:list" className="text-xl mr-2" />
          <h2 className="text-lg font-semibold">Daftar Orderan</h2>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {processedOrders.length === 0 ? (
          <p className="text-gray-500 text-center">Tidak ada order hari ini</p>
        ) : (
          processedOrders.map((order) => (
            <div key={order.id} className="flex items-center pb-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src={order.avatar}
                  alt={order.customer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{order.customer}</h3>
                <p className="text-sm text-gray-500">{order.items} Item</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-lg ${order.statusColor}`}
                >
                  {order.status}
                </span>
                {order.paymentStatus && (
                  <span className="text-xs text-gray-500 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        order.paymentStatus === "Sudah bayar"
                          ? "bg-tosca-element"
                          : "bg-primary-3rd"
                      } mr-1`}
                    ></span>
                    {order.paymentStatus}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
