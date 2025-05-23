import { UpdateUserProfile } from "@/types/types";
import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateUser = () => {
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      credentials,
    }: {
      id: string | undefined;
      credentials: Partial<UpdateUserProfile>;
    }) => {
      if (!id) {
        throw new Error("User ID is required");
      }
      await API.put(`/users/edit-user/${id}`, credentials);
      return { id };
    },

    onSuccess: ({ id }) => {
      toast.success("User updated successfully!");
      navigate(0);
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
    updateLoading: updateMutation.isPending,
    updateUser: updateMutation.mutate,
  };
};

export default useUpdateUser;
