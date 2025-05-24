import { API } from "@/utils/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteMenu() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string | undefined) => {
      await API.delete(`/menus/delete-menu/${id}`);
    },
    onSuccess: () => {
      toast.success("Menu berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      navigate(-1);
    },

    onError: (error) => {
      toast.error("Gagal Menghapus Menu!");
      console.error("Error Detail:", error?.message ?? error);
    },
  });

  return { deleteMenu: mutate, isDeleting: isPending };
}

export default useDeleteMenu;
