import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteFile = () => {
  const deleteFile = useMutation({
    mutationFn: async (public_id: string) => {
      const response = await API.post("/cloudinary/delete-file", {
        public_id: public_id,
      });

      return response.data; // { result: 'ok' } or { result: 'not found' }
    },

    onSuccess: (data) => {
      if (data.result === "ok") {
        toast("File berhasil diganti!");
      } else if (data.result === "not found") {
        toast("File tidak ditemukan.");
      } else {
        toast("Terjadi kesalahan tidak terduga.");
      }
    },

    onError: () => {
      toast("Gagal menghapus file.");
    },
  });

  return {
    isLoading: deleteFile.isPending,
    deleteFile: deleteFile.mutateAsync,
    result: deleteFile.data,
    error: deleteFile.error,
  };
};

export default useDeleteFile;
