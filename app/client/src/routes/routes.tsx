import { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "./constants";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../types";

const { LOGIN, HOME, SIGNUP, PERSONALINFO } = PUBLIC_PATHS;

const { DASHBOARD } = PRIVATE_PATHS;

const Home = WithSuspense(lazy(() => import("../pages/Home/Home")));
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard"))
);
const Login = WithSuspense(lazy(() => import("../pages/Login/Login")));
const Signup = WithSuspense(lazy(() => import("../pages/SignUp/Signup")));
const PersonalInfo = WithSuspense(
  lazy(() => import("../pages/SignUp/PersonalInfo"))
);

export const PUBLIC_ROUTES: AppRoute[] = [
  { path: HOME, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: SIGNUP, element: <Signup /> },
  { path: PERSONALINFO, element: <PersonalInfo /> },

  { path: "*", element: <Navigate to="/" replace /> },

  // non existing url will redirect to home page
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { path: DASHBOARD, element: <Dashboard /> },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
