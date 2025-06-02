import { API } from "@/utils/API";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetBuyerOrder from "../queries/useGetBuyerOrder";

const useHandleUserOrder = () => {
  const [isLoadingHandleOrder, setIsLoadingHandleOrder] =
    useState<boolean>(false);
  const { refetch: refetchBuyer } = useGetBuyerOrder();

  const handleDeclineOrder = async (orderId: string) => {
    setIsLoadingHandleOrder(true);
    try {
      // Simulate API call to accept order
      await API.put(`/orders/update-order-status/${orderId}`, {
        status: "Declined",
      });
      toast.success("Pesanan telah dibatalkan!");
      // await api.acceptOrder(orderId);
      // Handle success response
    } catch (error) {
      toast.error("Pesanan telah dibatalkan");
      // Handle error response
    } finally {
      setIsLoadingHandleOrder(false);
      refetchBuyer();
    }
  };

  const handleSelesaikanPesanan = async (orderId: string) => {
    setIsLoadingHandleOrder(true);
    try {
      // Simulate API call to accept order
      await API.put(`/orders/update-order-pick-up/${orderId}`, {
        status_pickup: "Picked_Up",
      });
      toast.success("Pesanan Selesai!");
      // await api.acceptOrder(orderId);
      // Handle success response
    } catch (error) {
      toast.error("Gagal perbarui pesanan");
      // Handle error response
    } finally {
      setIsLoadingHandleOrder(false);
      refetchBuyer();
    }
  };

  return { isLoadingHandleOrder, handleDeclineOrder, handleSelesaikanPesanan };
};

export default useHandleUserOrder;
