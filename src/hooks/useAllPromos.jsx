import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "@/lib/local_data";

export const useAllPromos = () => {
  return useQuery({
    queryKey: ["promos"],
    queryFn: async () => {
      return await fetchLocalData("promos");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
