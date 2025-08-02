import { useState } from "react";
import {
  createItem,
  updateItem,
  deleteItem,
  getItemById,
} from "@/lib/local_data";

export const useTransactionActions = () => {
  const [isMutating, setIsMutating] = useState(false);

  /**
   * @param {string} transactionId
   * @param {string} status
   */
  const updateTransactionStatus = async (transactionId, status) => {
    setIsMutating(true);
    try {
      const response = await api.post(
        `/update-transaction-status/${transactionId}`,
        { status }
      );
      return response.data;
    } finally {
      setIsMutating(false);
    }
  };

  /**
   * @param {string} transactionId
   */
  const cancelTransaction = async (transactionId) => {
    setIsMutating(true);
    try {
      const response = await api.post(`/cancel-transaction/${transactionId}`);
      return response.data;
    } finally {
      setIsMutating(false);
    }
  };

  return { updateTransactionStatus, cancelTransaction, isMutating };
};
