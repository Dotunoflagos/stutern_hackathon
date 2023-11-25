import { useQuery, useMutation } from "react-query";

import {
  CREATE_CLIENT_KEY,
  DELETE_CLIENT_KEY,
  GET_ALL_CLIENT_KEY,
  SEARCH_CLIENT_KEY,
} from "../queryKeys";
import {
  createClient,
  deleteClient,
  getAllClients,
  searchClient,
} from "../api/client-manager";

export const useGetAllClient = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_CLIENT_KEY],
    getAllClients,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useCreateClient = (options = {}) => {
  const { mutate, isLoading } = useMutation(createClient, {
    mutationKey: CREATE_CLIENT_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteClient = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteClient, {
    mutationKey: DELETE_CLIENT_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
export const useSearchClient = (options = {}) => {
  const { mutate, isLoading } = useMutation(searchClient, {
    mutationKey: SEARCH_CLIENT_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
