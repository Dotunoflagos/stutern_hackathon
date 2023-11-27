import { useMutation } from "react-query";
import { postLogin, postRegister, putUpdateUser } from "../api/account-manager";
import { LOGIN_KEY, REGISTER_KEY, UPDATE_USER_KEY } from "../queryKeys";

export const usePostLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(postLogin, {
    mutationKey: LOGIN_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const usePostRegister = (options = {}) => {
  const { mutate, isLoading } = useMutation(postRegister, {
    mutationKey: REGISTER_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const usePutUpdateUser = (options = {}) => {
  const { mutate, isLoading } = useMutation(putUpdateUser, {
    mutationKey: UPDATE_USER_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
