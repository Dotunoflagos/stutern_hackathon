import axios from "axios";
import { apiURL } from "../../enivironment";
import { CREATE_INVOICE, GET_ALL_INVOICE } from "../apiUrl";

export const getAllInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${GET_ALL_INVOICE}/?userid=${localStorage.getItem("stageId")}`
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
