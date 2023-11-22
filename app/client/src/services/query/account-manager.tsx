import { useMutation, useQuery } from "react-query";
import { postLogin } from "../api/account-manager";
import { LOGIN_KEY } from "../queryKeys";

export const usePostLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(postLogin, {
    mutationKey: LOGIN_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
