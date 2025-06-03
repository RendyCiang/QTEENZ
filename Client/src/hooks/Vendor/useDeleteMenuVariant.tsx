import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteMenuVariant = () => {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (variantId: any) => {
      const response = await API.post(`/menus/delete-variant/${variantId}`);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Menu added successfully!");
      navigate(-1);
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.message) {
        console.error("❌ Error Response:", e.message);
        const errorMessage = e.message || "Gagal Hapus Menu";
        toast.error(errorMessage);
      } else {
        console.error("❌ Unknown Error:", e);
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });
  return {
    deleteMenuVariant: deleteMutation.mutate,
    deleteLoadingVariant: deleteMutation.isPending,
  };
};

export default useDeleteMenuVariant;
