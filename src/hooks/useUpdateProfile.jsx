import { useState } from "react";
import { updateItem } from "@/lib/local_data";
import { getCookie } from "cookies-next";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    setData(null);

    const userId = getCookie("userId");
    if (!token) {
      setError(new Error("No authentication token found. Please login again."));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/update-profile`,
        profileData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, data };
};
