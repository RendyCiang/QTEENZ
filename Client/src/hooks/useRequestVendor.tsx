import { MakeRequestPayload } from "@/types/types";
import { API } from "@/utils/API";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";

const useRequestVendor = () => {
  const requestMutation = useMutation({
    mutationFn: async (credentials: MakeRequestPayload) => {
      const response = await API.post("/auths/request-vendor", credentials);
      return { data: response.data };
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message?.[0] || "Login Gagal";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  return {
    requestLoading: requestMutation.isPending,
    requestVendor: requestMutation.mutate,
  };
};

export default useRequestVendor;
