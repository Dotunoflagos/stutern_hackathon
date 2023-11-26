import { useQuery, useMutation } from "react-query";
import { createInvoice, getAllInvoice } from "../api/invoice-manager";
import { CREATE_INVOICE_KEY, GET_ALL_INVOICE_KEY } from "../queryKeys";

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

export const useCreateInvoice = (options = {}) => {
  const { mutate, isLoading } = useMutation(createInvoice, {
    mutationKey: CREATE_INVOICE_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
