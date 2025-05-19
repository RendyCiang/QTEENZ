import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateUserPassword = () => {
  const navigate = useNavigate();
  const changeMutation = useMutation({
    mutationFn: async ({
      id,
      oldPassword,
      newPassword,
    }: {
      id: string | undefined;
      oldPassword: string;
      newPassword: string;
    }) => {
      if (!id) {
        throw new Error("User ID is required");
      }

      await API.put(`/users/change-password/${id}`, {
        oldPassword,
        newPassword,
      });

      return { id };
    },

    onSuccess: ({ id }) => {
      toast.success("User updated successfully!");
      navigate(`/profile/${id}`);
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message || "Update Profile Gagal";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  return {
    changeLoading: changeMutation.isPending,
    changePassword: changeMutation.mutate,
  };
};

export default useUpdateUserPassword;
