import { Suspense } from "react";
import axios from "axios";
import { DetailCategoryClient } from "@/components/ui/user/DetailCategoryClient";
import { Skeleton } from "@/components/ui/skeleton";

const DetailCategorySkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Skeleton className="w-1/2 h-5 mb-6 rounded-lg" />
      <div className="relative w-full mb-6">
        <Skeleton className="w-full h-48 sm:h-64 border border-gray-200 bg-white rounded-lg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 rounded-lg">
          <Skeleton className="w-1/2 h-6 mb-3 rounded" />
          <Skeleton className="w-2/3 h-4 rounded" />
        </div>
      </div>
      <div className="mt-8">
        <Skeleton className="w-1/3 h-5 mb-4 rounded" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-40 sm:h-48 border border-gray-200 bg-white rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

async function getCategoryData(id) {
  if (!id) return null;
  try {
    const { getItemById } = await import("@/lib/local_data");
    console.log("Fetching category with ID:", id);
    const response = await getItemById("categories", id);
    console.log("Category data:", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch category detail:", error);
    return null;
  }
}

async function getActivitiesByCategory(id) {
  if (!id) return [];
  try {
    const { fetchLocalData } = await import("@/lib/local_data");
    console.log("Fetching activities for category:", id);
    const response = await fetchLocalData("activities");
    console.log("All activities:", response.data);

    const parsedId = parseInt(id);
    const filteredActivities = response.data.filter((activity) => {
      const match = activity.category_id === parsedId;
      console.log("Checking activity:", {
        id: activity.id,
        category_id: activity.category_id,
        parsedId,
        matches: match,
      });
      return match;
    });

    console.log("Filtered activities:", filteredActivities);
    return filteredActivities;
  } catch (error) {
    console.error("Failed to fetch activities by category:", error);
    return [];
  }
}

export default async function DetailCategoryPage({ params }) {
  const { id } = params;

  const [initialCategory, initialActivities] = await Promise.all([
    getCategoryData(id),
    getActivitiesByCategory(id),
  ]);

  if (!initialCategory) {
    return (
      <div className="container py-8 mx-auto text-center">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl tracking-tight">
            Category Not Found
          </h1>
          <p className="text-gray-600">Category detail not found.</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<DetailCategorySkeleton />}>
      <DetailCategoryClient
        initialCategory={initialCategory}
        initialActivities={initialActivities}
      />
    </Suspense>
  );
}
