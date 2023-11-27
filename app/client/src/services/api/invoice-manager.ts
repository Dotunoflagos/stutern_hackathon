import axios from "axios";
import { apiURL } from "../../enivironment";
import {
  COMPLETED_INVOICE,
  CREATE_INVOICE,
  DELETE_INVOICE,
  GET_ALL_INVOICE,
  PENDING_INVOICE,
  SEARCH_INVOICE,
  TOTAL_INVOICE,
  VERFIY_INVOICE,
} from "../apiUrl";

export const getAllInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${GET_ALL_INVOICE}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};
export const getPendingInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${PENDING_INVOICE}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};
export const getTotalInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${TOTAL_INVOICE}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};
export const getCompletedInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${COMPLETED_INVOICE}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};

export const createInvoice = async (body: any) => {
  const res = await axios.post(
    `${apiURL}${CREATE_INVOICE}/?userid=${localStorage.getItem("stageId")}`,
    body
  );
  return res;
};

export const searchInvoice = async (body: any) => {
  const res = await axios.post(
    `${apiURL}${SEARCH_INVOICE}/?name=${
      body.name
    }&userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};

export const searchInvoiceByID = async (body: any) => {
  const res = await axios.post(
    `${apiURL}${SEARCH_INVOICE}/?invoiceNumber=${
      body.invId
    }&userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};

export const deleteInvoice = async (body: any) => {
  const res = await axios.delete(
    `${apiURL}${DELETE_INVOICE}/${body.id}/?userid=${localStorage.getItem(
      "stageId"
    )}`
  );
  return res.data;
};

export const getVerifyInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${VERFIY_INVOICE}?trxref=INV-100&reference=INV-100&userid=${localStorage.getItem(
      "stageId"
    )}`
  );
  return res.data;
};
