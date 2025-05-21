import { API } from "@/utils/API";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useArchivedMenu() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string | undefined) => {
      await API.put(`/menus/archived-menu/${id}`, {
        isArchived: true,
      });
      console.log(`Id: ${id}`);
    },

    onSuccess: () => {
      toast.success("Menu berhasil diarsipkan");
      queryClient.invalidateQueries({ queryKey: ["menus", "archived"] });
    },

    onError: () => {
      toast.error("Gagal mengarsipkan menu!");
    },
  });

  return { archiveMenu: mutate, isArchived: isPending };
}

export default useArchivedMenu;
