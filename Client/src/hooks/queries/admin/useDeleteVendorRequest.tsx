import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/API";
import toast from "react-hot-toast";

const useDeleteVendorRequest = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (requestId: string | undefined) => {
      await API.post(`/requests/delete-request/${requestId}`);
    },
    onSuccess: () => {
      toast.success("Permintaan berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: ["/requests/get-requests"],
      });
    },
    onError: (error) => {
      toast.error("Gagal Menghapus Permintaan!");
      console.error(error);
    },
  });

  return { deleteRequest: mutate, isDeleting: isPending };
};

export default useDeleteVendorRequest;
