import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "@/lib/local_data";

export const useAllActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      return await fetchLocalData("activities");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
