import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/API";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userId: string | undefined) => {
      await API.delete(`/users/delete-user/${userId}`);
    },
    onSuccess: () => {
      toast.success("User berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["/users/get-user"] }); // ✅ Trigger refetch
    },
    onError: (error) => {
      toast.error("Gagal Menghapus User!");
      console.error(error);
    },
  });

  return { deleteUser: mutate, isDeleting: isPending };
};

export default useDeleteUser;
