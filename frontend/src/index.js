import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Register,
  DetailInfo,
  Admin_home_page,
  Patient_home_page, 
  Spinner,
  Login,
  PatientLogin,
  Patient_register,
  MainPage,
  Services,
  Add_doctor,
  Doctor_page,
  DoctorServices,
  Profile,
  Contact_us,
} from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));

const createRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/doctor_page/:email",
    element: <Doctor_page />,
  },
  {
    path: "/doctor_page/:email/:service",
    element: <DoctorServices />,
  },
  {
    path: "/patientLogin",
    element: <PatientLogin />,
  },
  {
    path: "/adminLogin",
    element: <Login />,
  },
  {
    path: "/adminSignUp",
    element: <Register />,
  },
  {
    //admin Register
    path: "/adminRegister",
    element: <Register />,
  },
  {
    path: "/admin_page/:email",
    element: <Admin_home_page />,
  },
  {
    path: "/patient_page/:role/:patientId/:email",
    element: <Patient_home_page />,
  },
  {
    path: "/patient_page/:role/:patientId/:email/profile",
    element: <Profile />,
  }, 
  {
    path: "/about",
    element: <Services />,
  },
  {
    path: "/home/:id",
    element: <DetailInfo />,
  },
  {
    path: "/patientRegister",
    element: <Patient_register />,
  },
  {
    path: "/spinner",
    element: <Spinner active={true} />,
  },
  {
    path: "/patient_page/:role/:patientId/:email/:id",
    element: <DetailInfo />,
  },
  {
    path: "/admin_page/:email/addDoctor",
    element: <Add_doctor />,
  },
  {
    path: "/contact_us",
    element: <Contact_us />,
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
