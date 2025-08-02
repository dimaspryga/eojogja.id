import useSWR from "swr";
import { fetchLocalData } from "@/lib/local_data";

const fetcher = async (categoryId) => {
  console.log("Fetching activities for category:", categoryId);
  const response = await fetchLocalData("activities");
  const filteredActivities = response.data.filter(
    (activity) => activity.category_id === parseInt(categoryId)
  );
  console.log("Found activities:", filteredActivities.length);
  return filteredActivities;
};

export const useSWRActivityByCategory = (categoryId, fallbackData) => {
  console.log("useSWRActivityByCategory called with:", {
    categoryId,
    fallbackData,
  });

  const { data, error, isLoading } = useSWR(
    categoryId ? `/activities/category/${categoryId}` : null,
    () => fetcher(categoryId),
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
    }
  );

  console.log("useSWRActivityByCategory result:", { data, error, isLoading });

  return {
    activityByCategory: data || [],
    isLoading,
    error,
  };
};
