import { OrderItems } from "@/types/types";
import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CreateOrderPayload {
  items: OrderItems;
  // deliveryCriteria: string;
}

const useCreateOrder = () => {
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: async (orderPayload: CreateOrderPayload) => {
      const response = await API.post("/orders/create-order", orderPayload);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Order created successfully!");
      console.log(data);
      //   navigate("/customer/notification")
      // window.open('https://example.com', '_blank', 'noopener,noreferrer');
      // navigate("/orders/success"); // Optional redirect
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message || "Gagal membuat order";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    createOrderLoading: createOrderMutation.isPending,
  };
};

export default useCreateOrder;
