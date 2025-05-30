import { API } from "@/utils/API";
import { useState } from "react";
import toast from "react-hot-toast";

const useHandleVendorOrder = () => {
  const [isLoadingHandleOrder, setIsLoadingHandleOrder] =
    useState<boolean>(false);

  const handleAcceptOrder = async (orderId: string) => {
    setIsLoadingHandleOrder(true);
    try {
      // Simulate API call to accept order
      await API.put(`/orders/update-order-status/${orderId}`, {
        status: "Accepted",
      });
      toast.success("Pesanan telah diterima!");
      // await api.acceptOrder(orderId);
      // Handle success response
    } catch (error) {
      toast.error("Gagal menerima pesanan");
      // Handle error response
    } finally {
      setIsLoadingHandleOrder(false);
    }
  };

  return { isLoadingHandleOrder, handleAcceptOrder };
};

export default useHandleVendorOrder;
