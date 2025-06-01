import { API } from "@/utils/API";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetBuyerOrder from "../queries/useGetBuyerOrder";
import useGetVendorOrder from "../queries/useGetVendorOrder";

const useHandleVendorOrder = () => {
  const [isLoadingHandleOrder, setIsLoadingHandleOrder] =
    useState<boolean>(false);
  // const { refetch: refetchBuyer } = useGetBuyerOrder();
  const { refetch: refetchVendor } = useGetVendorOrder();

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
      // refetchBuyer();
      refetchVendor();
    }
  };

  const handleDeclineOrder = async (orderId: string) => {
    setIsLoadingHandleOrder(true);
    try {
      // Simulate API call to accept order
      await API.put(`/orders/update-order-status/${orderId}`, {
        status: "Declined",
      });
      toast.success("Pesanan telah diterima!");
      // await api.acceptOrder(orderId);
      // Handle success response
    } catch (error) {
      toast.error("Gagal menerima pesanan");
      // Handle error response
    } finally {
      setIsLoadingHandleOrder(false);
      refetchVendor();
    }
  };

  const handleChangeStatusPickUp = async (
    orderId: string,
    pickupStatus: string
  ) => {
    setIsLoadingHandleOrder(true);
    try {
      // Simulate API call to accept order
      await API.put(`/orders/update-order-pick-up/${orderId}`, {
        status_pickup: pickupStatus,
      });
      toast.success("Status pesanan telah diperbarui!");
      // await api.acceptOrder(orderId);
      // Handle success response
    } catch (error) {
      toast.error("Gagal perbarui pesanan");
      // Handle error response
    } finally {
      setIsLoadingHandleOrder(false);
      refetchVendor();
    }
  };

  return {
    isLoadingHandleOrder,
    handleAcceptOrder,
    handleDeclineOrder,
    handleChangeStatusPickUp,
  };
};

export default useHandleVendorOrder;
