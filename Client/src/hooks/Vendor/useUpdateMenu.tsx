import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateMenu = () => {
  const navigate = useNavigate();
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string | undefined;
      payload: any;
    }) => {
      if (!id) {
        throw new Error("Menu ID is required");
      }

      await API.put(`menus/edit-menu/${id}`);
      return { id };
    },

    onSuccess: ({ id }) => {
      toast.success("Menu updated successfully!");
      navigate(`/vendor/menu/listmenu/${id}`);
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message || "Update Menu Gagal";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });
  return {
    updateMenu: updateMutation.mutate,
    updateLoading: updateMutation.isPending,
  };
};

export default useUpdateMenu;
