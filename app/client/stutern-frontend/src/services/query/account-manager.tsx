import { useMutation, useQuery } from "react-query";
import {
  getCustomerDetailMutate,
  getCustomerDetails,
  getCustomerSubscription,
  getStores,
  getUsers,
  postLogin,
} from "../api/account-manager";
import {
  CUSTOMER_DETAILS,
  CUSTOMER_DETAILS_MUTATE,
  CUSTOMER_DETAILS_SUBSCRIPTION,
  FETCH_USERS,
  LOGIN,
  STORE_LIST,
} from "../queryKeys";

export const usePostLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(postLogin, {
    mutationKey: LOGIN,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetUsers = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [FETCH_USERS, page, itemPerPage],
    getUsers,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetCustomerDetail = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [CUSTOMER_DETAILS, page, itemPerPage],
    getCustomerDetails,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetCustomerDetailMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getCustomerDetailMutate, {
    mutationKey: CUSTOMER_DETAILS_MUTATE,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetCustomerSubscription = (options = {}) => {
  const { mutate, isLoading } = useMutation(getCustomerSubscription, {
    mutationKey: CUSTOMER_DETAILS_SUBSCRIPTION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetStores = (options = {}) => {
  const { data, isLoading, refetch } = useQuery([STORE_LIST], getStores, {
    ...options,
  });
  return { data, isLoading, refetch };
};
