import { useMutation } from "react-query";
import {
  postLogin,
  postRegister,
  postResendOtp,
  postVerifyOtp,
  putUpdateUser,
} from "../api/account-manager";
import {
  LOGIN_KEY,
  REGISTER_KEY,
  RESEND_OTP_KEY,
  UPDATE_USER_KEY,
  VERIFY_OTP_KEY,
} from "../queryKeys";

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
export const usePostVerifyOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(postVerifyOtp, {
    mutationKey: VERIFY_OTP_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
export const usePostResendOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(postResendOtp, {
    mutationKey: RESEND_OTP_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
