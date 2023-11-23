import axios, {
  AxiosInstance,
  // AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { apiURL } from "../enivironment";
// import { getAccessToken } from "../utils/helpers";

// export const baseURL = "http://tfapstaging.trustedpartners.software/api/";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});
// const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
//   const access = JSON.parse(localStorage.getItem("accessToken") as string);
//   request.headers!.Authorization = `${access}` || "";
//   // console.log(access);
//   return request;
// };

// const onRequestError = (error: AxiosError): Promise<AxiosError> => {
//   return Promise.reject(error);
// };

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const user: any = JSON.parse(localStorage.getItem("user") as string);

  const statusCode = error.response!.status;
  const originalRequest: any = error.config;
  if (statusCode === 403 && user) {
    // const { data }: any = await getAccessToken();

    // const newData = { ...user, access: data.access };

    // localStorage.setItem("user", JSON.stringify(newData));

    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
};

// axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
