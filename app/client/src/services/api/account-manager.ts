import axios from "axios";
import { apiURL } from "../../enivironment";
import { ACCOUNT_MANAGER } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const postLogin = async (body: any) => {
  const res = await axios.post(`${apiURL}${ACCOUNT_MANAGER}/login`, body);
  return res.data;
};

export const getUsers = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${ACCOUNT_MANAGER}/fetchusers/?page=${page}&itemsPerPage=${itemsPerPage}`
  );
  return res.data;
};

export const getCustomerDetails = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${ACCOUNT_MANAGER}/customerdetails?phoneNumber=08036975694&page=${page}&itemsPerPage=${itemsPerPage}`
  );
  return res.data;
};

export const getCustomerDetailMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${ACCOUNT_MANAGER}/customerdetails?phoneNumber=${body.phoneNumber}&page=1&itemsPerPage=100`
  );
  return res?.data;
};

export const getCustomerSubscription = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${ACCOUNT_MANAGER}/customeractivesubscription?phoneNumber=${body.phoneNumber}`
  );
  return res?.data;
};

export const getStores = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${ACCOUNT_MANAGER}/fetchstores?page=1&itemsPerPage=100`
  );
  return res.data;
};
