import { OrderDetailVendorPayload } from "@/types/types";
import { API } from "@/utils/API";
import { useQuery } from "@tanstack/react-query";

const useGetVendorOrder = () => {
  return useQuery<OrderDetailVendorPayload>({
    queryKey: ["vendorOrder"],
    queryFn: async () => {
      const res = await API.get<OrderDetailVendorPayload>(
        "/orders/get-orders-vendor/"
      );
      return res.data;
    },
  });
};

export default useGetVendorOrder;
