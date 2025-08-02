import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "@/lib/local_data";

export const useAllBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      return await fetchLocalData("banners");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
