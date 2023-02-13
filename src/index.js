import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Connection from "./components/Connection";
import DetailInfo from "./components/detailInfo/DetailInfo";
import Admin_home_page from "./components/Admin_home/Admin_home_page";
import Patient_home_page from "./components/Patient_home/Patient_home_page";
import Doctor_home_page from "./components/Doctor_home/Doctor_home_page";
import Spinner from "./components/spinner/Spinner";

const root = ReactDOM.createRoot(document.getElementById("root"));

const createRoute = createBrowserRouter([
  {
    path: "/",
    element: <Spinner  />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/admin_page",
    element: <Admin_home_page />,
  },
  {
    path: "/patient_page/:role",
    element: <Patient_home_page />,
  },
  {
    path: "/doctor_page",
    element: <Doctor_home_page />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/:id",
    element: <DetailInfo />,
  },
  {
    path: "/contract",
    element: <Connection />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={createRoute} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
