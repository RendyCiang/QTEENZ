import { API } from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

      console.log("Payload before PUT:", payload);
      await API.put(`menus/edit-menu/${id}`, payload);
      return { id };
    },

    onSuccess: ({ id }) => {
      toast.success("Menu updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      navigate(-1);
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        console.error("❌ Error Response:", e.response);
        const errorMessage = e.response.data?.message || "Update Menu Gagal";
        toast.error(errorMessage);
      } else {
        console.error("❌ Unknown Error:", e);
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
