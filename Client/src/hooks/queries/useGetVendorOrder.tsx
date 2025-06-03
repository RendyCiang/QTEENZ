import { OrderDetailVendorPayload } from "@/types/types";
import { API } from "@/utils/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetVendorOrder = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["vendorOrder"],
    queryFn: async () => {
      const res = await API.get<OrderDetailVendorPayload>(
        "/orders/get-orders-vendor/"
      );
      return res.data;
    },
    select: (data: OrderDetailVendorPayload) => ({
      ...data,
      orders: data.orders.filter((d) => d.transactionStatus === "Success"),
    }),
    // onSuccess: (newFilteredData: OrderDetailVendorPayload) => {
    //   const oldFilteredData =
    //     queryClient.getQueryData<OrderDetailVendorPayload>(["vendorOrder"]);
    //   if (
    //     oldFilteredData &&
    //     oldFilteredData.orders.length !== newFilteredData.orders.length
    //   ) {
    //     console.log("🆕 New successful vendor order detected!");
    //   }
    // },
    refetchInterval: 3000,
  });
};

export default useGetVendorOrder;
