import axios from "axios";
import { apiURL } from "../../enivironment";
import { GET_ALL_INVOICE } from "../apiUrl";

export const getAllInvoice = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${GET_ALL_INVOICE}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};
