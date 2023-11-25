import axios from "axios";
import { apiURL } from "../../enivironment";
import {
  GET_ALL_CLIENT,
  CREATE_CLIENT,
  DELETE_CLIENT,
  SEARCH_CLIENT,
} from "../apiUrl";

export const getAllClients = async ({ queryKey }: any) => {
  const [,] = queryKey;
  const res = await axios.get(
    `${apiURL}${GET_ALL_CLIENT}/?userid=${localStorage.getItem("stageId")}`
  );
  return res.data;
};

export const createClient = async (body: any) => {
  const res = await axios.post(
    `${apiURL}${CREATE_CLIENT}/?userid=${localStorage.getItem("stageId")}`,
    body
  );
  return res;
};

export const deleteClient = async (body: any) => {
  const res = await axios.delete(
    `${apiURL}${DELETE_CLIENT}/${body.id}/?userid=${localStorage.getItem(
      "stageId"
    )}`
  );
  return res.data;
};

export const searchClient = async (body: any) => {
  const res = await axios.post(
    `${apiURL}${SEARCH_CLIENT}/?name=${body.name}&userid=${localStorage.getItem(
      "stageId"
    )}`
  );
  return res.data;
};
