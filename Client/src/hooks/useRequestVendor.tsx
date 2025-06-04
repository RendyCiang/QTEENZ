import { MakeRequestPayload } from "@/types/types";
import { API } from "@/utils/API";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useRequestVendor = () => {
  const navigate = useNavigate();

  const requestMutation = useMutation({
    mutationFn: async (credentials: MakeRequestPayload) => {
      const response = await API.post("/auths/request-vendor", credentials);
      return { data: response.data };
    },

    onSuccess: ({ data }) => {
      toast.success("Permintaan Vendor Berhasil!");
      navigate("/");
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage =
          e.response.data?.message?.[0] || "Permintaan Gagal";
        console.log(e);

        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  return {
    requestLoading: requestMutation.isPending,
    requestVendor: requestMutation.mutateAsync,
  };
};

export default useRequestVendor;
