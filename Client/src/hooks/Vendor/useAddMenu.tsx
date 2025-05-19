import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/API";
import toast from "react-hot-toast";
import axios from "axios";

function useAddMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (payload: any) => {
      console.log("Payload to Post: ", payload);
      const response = await API.post("menus/create-menu", payload);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Menu added successfully!");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      navigate(-1);
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.message) {
        console.error("❌ Error Response:", e.message);
        const errorMessage = e.message || "Add Menu Gagal";
        toast.error(errorMessage);
      } else {
        console.error("❌ Unknown Error:", e);
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });
  return { addMenu: addMutation.mutate, addLoading: addMutation.isPending };
}

export default useAddMenu;
