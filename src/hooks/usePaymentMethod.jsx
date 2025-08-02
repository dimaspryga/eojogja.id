import { useState, useEffect, useCallback } from "react";
import { fetchLocalData } from "@/lib/local_data";

export const usePaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPaymentMethod = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchLocalData("payment_methods");
      setPaymentMethod(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPaymentMethod();
  }, [getPaymentMethod]);

  return {
    paymentMethod,
    isLoading,
    getPaymentMethod,
  };
};
