import axios from "axios";
import { apiURL } from "../../enivironment";
import { LOGIN } from "../apiUrl";
// import axiosInstance from "../axiosInstance";

export const postLogin = async (body: any) => {
  const res = await axios.post(`${apiURL}${LOGIN}`, body);
  return res.data;
};
