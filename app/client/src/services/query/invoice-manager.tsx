import { useQuery } from "react-query";
import { getAllInvoice } from "../api/invoice-manager";
import { GET_ALL_INVOICE_KEY } from "../queryKeys";

export const useGetAllInvoice = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_INVOICE_KEY],
    getAllInvoice,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
