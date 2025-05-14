import { API } from "@/utils/API";
import { useQuery } from "@tanstack/react-query";

function useFetchData<T>(url: string) {
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const res = await API.get<T>(url);
      return res.data;
    },
  });
}

export default useFetchData;
