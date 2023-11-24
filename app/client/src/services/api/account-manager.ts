import axios from "axios";
import { apiURL } from "../../enivironment";
import {
  LOGIN,
  RESEND_OTP,
  RESGISTER,
  UPDATEUSER,
  VERIFY_OTP,
} from "../apiUrl";
// import axiosInstance from "../axiosInstance";

export const postLogin = async (body: any) => {
  const res = await axios.post(`${apiURL}${LOGIN}`, body);
  return res;
};

export const postRegister = async (body: any) => {
  const res = await axios.post(`${apiURL}${RESGISTER}`, body);
  return res;
};

export const putUpdateUser = async (body: any) => {
  const res = await axios.put(
    `${apiURL}${UPDATEUSER}/?userid=${localStorage.getItem("stageId")}`,
    body
  );
  return res;
};

export const postVerifyOtp = async (body: any) => {
  const res = await axios.post(`${apiURL}${VERIFY_OTP}`, body);
  return res;
};

export const postResendOtp = async (body: any) => {
  const res = await axios.post(`${apiURL}${RESEND_OTP}`, body);
  return res;
};
