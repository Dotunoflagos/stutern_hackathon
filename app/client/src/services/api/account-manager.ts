import axios from "axios";
import { apiURL } from "../../enivironment";
import { LOGIN, RESGISTER, UPDATEUSER } from "../apiUrl";
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
  const res = await axios.put(`${apiURL}${UPDATEUSER}`, body);
  return res;
};