import { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "./constants";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../types";

const { LOGIN, SIGNUP, PERSONALINFO } = PUBLIC_PATHS;

const { DASHBOARD, CLIENT, INVOICE, VIEW_INVOICE, ADD_INVOICE } = PRIVATE_PATHS;

// const Home = WithSuspense(lazy(() => import("../pages/Home/Home")));
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard"))
);
const Login = WithSuspense(lazy(() => import("../pages/Login/Login")));
const Signup = WithSuspense(lazy(() => import("../pages/SignUp/Signup")));
const PersonalInfo = WithSuspense(
  lazy(() => import("../pages/SignUp/PersonalInfo"))
);
const Client = WithSuspense(lazy(() => import("../pages/Dashboard/Client")));
const Invoice = WithSuspense(lazy(() => import("../pages/Dashboard/Invoices")));
const ViewInvoice = WithSuspense(
  lazy(() => import("../pages/Dashboard/ViewInvoice"))
);
const AddInvoice = WithSuspense(
  lazy(() => import("../pages/Dashboard/AddInvoice"))
);

export const PUBLIC_ROUTES: AppRoute[] = [
  // { path: HOME, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: SIGNUP, element: <Signup /> },
  { path: PERSONALINFO, element: <PersonalInfo /> },

  { path: "*", element: <Navigate to="/login" replace /> },

  // non existing url will redirect to home page
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: CLIENT, element: <Client /> },
  { path: INVOICE, element: <Invoice /> },
  { path: VIEW_INVOICE, element: <ViewInvoice /> },
  { path: ADD_INVOICE, element: <AddInvoice /> },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
