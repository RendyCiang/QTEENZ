import { OrderDetailPayload } from "@/types/types";
import { API } from "@/utils/API";
import { useQuery } from "@tanstack/react-query";

const useGetBuyerOrder = () => {
  return useQuery<OrderDetailPayload>({
    queryKey: ["buyerOrder"],
    queryFn: async () => {
      const res = await API.get<OrderDetailPayload>(
        "/orders/get-orders-buyer/"
      );
      return res.data;
    },
    refetchInterval: 5000,
  });
};

export default useGetBuyerOrder;
