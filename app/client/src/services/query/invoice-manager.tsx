import { useQuery, useMutation } from "react-query";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoice,
  getCompletedInvoice,
  getPendingInvoice,
  getTotalInvoice,
  getVerifyInvoice,
  searchInvoice,
  searchInvoiceByID,
} from "../api/invoice-manager";
import {
  COMPLETED_INVOICE_KEY,
  CREATE_INVOICE_KEY,
  DELETE_INVOICE_KEY,
  GET_ALL_INVOICE_KEY,
  PENDING_INVOICE_KEY,
  SEARCH_INVOICE_KEY,
  SEARCH_INVOICE_KEY_BY_ID,
  TOTAL_INVOICE_KEY,
  VERIFY_INVOICE_KEY,
} from "../queryKeys";

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
export const useGetPendingInvoice = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [PENDING_INVOICE_KEY],
    getPendingInvoice,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
export const useGetTotalInvoice = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [TOTAL_INVOICE_KEY],
    getTotalInvoice,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
export const useGetCompletedInvoice = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [COMPLETED_INVOICE_KEY],
    getCompletedInvoice,
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

export const useSearchInvoice = (options = {}) => {
  const { mutate, isLoading } = useMutation(searchInvoice, {
    mutationKey: SEARCH_INVOICE_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const useSearchInvoiceById = (options = {}) => {
  const { mutate, isLoading } = useMutation(searchInvoiceByID, {
    mutationKey: SEARCH_INVOICE_KEY_BY_ID,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteInvoice = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteInvoice, {
    mutationKey: DELETE_INVOICE_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const useVerifyInvoice = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [VERIFY_INVOICE_KEY],
    getVerifyInvoice,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
