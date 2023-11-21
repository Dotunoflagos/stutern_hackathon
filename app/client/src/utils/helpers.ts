import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { apiURL } from "../enivironment";
// import { REFRESH_TOKEN } from "../services/apiUrl";

interface SavedToken {
  refresh: string;
}

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// export const getAccessToken = async () => {
//   const user: any = localStorage.getItem("user");
//   const savedToken: SavedToken = JSON.parse(user);

//   try {
//     const res = await axios.post(`${apiURL}${REFRESH_TOKEN}`, {
//       refresh: savedToken.refresh,
//     });
//     return res;
//   } catch (error) {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }
// };

export const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
    borderRadius: "8px",
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
};

export const arrayOfObj = (
  objOfObjs: { [s: string]: unknown } | ArrayLike<unknown>
) => objOfObjs && Object.entries(objOfObjs).map((e) => ({ [e[0]]: e[1] }));

export const useLogOut = () => {
  return () => {
    localStorage.removeItem("user");

    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };
};

export const useIsNavActive = () => {
  const location = useLocation();
  return (str: string) => location.pathname.includes(str);
};

export const formatDate = (d: number) => {
  const date = new Date(d * 1000);
  return (
    +date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

export const dateFormat = (date: string | number | Date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleString();
};

export const formatError = (
  err: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  const result = Object.entries(err).map(([k, v]) => ({ [k]: v }));
  return result;
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const getDiffInTime = (date: any): string => {
  if (!date) {
    return "";
  }
  const diffInSeconds: number = (Date.now() - new Date(date).getTime()) / 1000;
  if (diffInSeconds >= 0 && diffInSeconds <= 59) {
    return String(diffInSeconds) + "s ago";
  } else if (diffInSeconds > 60 && diffInSeconds < 3600) {
    return String(Math.round(diffInSeconds / 60)) + "mins ago";
  } else if (diffInSeconds > 3600 && diffInSeconds < 86400) {
    return Math.round(diffInSeconds / 3600) > 1
      ? `${String(Math.round(diffInSeconds / 3600))} hrs ago`
      : `${String(Math.round(diffInSeconds / 3600))} hr ago`;
  } else if (diffInSeconds > 86400 && diffInSeconds < 2073600) {
    return Math.round(diffInSeconds / 86400) > 1
      ? `${String(Math.round(diffInSeconds / 86400))} days ago`
      : String(Math.round(diffInSeconds / 86400)) + "day ago";
  } else if (diffInSeconds > 2073600 && diffInSeconds < 62_208_000) {
    return Math.round(diffInSeconds / 2073600) > 1
      ? `${String(Math.round(diffInSeconds / 2073600))} weeks ago`
      : `${Math.round(diffInSeconds / 2073600)} week ago`;
  } else if (diffInSeconds > 62_208_000 && diffInSeconds < 31_536_000) {
    return Math.round(diffInSeconds / 62_208_000) > 1
      ? `${String(Math.round(diffInSeconds / 62_208_000))} months ago`
      : `${String(Math.round(diffInSeconds / 62_208_000))} month ago`;
  } else {
    return Math.round(diffInSeconds / 31_536_000) > 1
      ? `${String(Math.round(diffInSeconds / 31_536_000))} years ago`
      : `${Math.round(diffInSeconds / 31_536_000)} year ago`;
  }
};

export const useCustomMediaQuery = () => {
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  return {
    isMobile,
  };
};

export const cut = (str: string) => {
  return str?.length > 23 ? str.substring(0, 23) + "..." : str;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
