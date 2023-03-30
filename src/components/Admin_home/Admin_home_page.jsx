import React from "react";
import Navigation from "../navigation/Navigation.jsx";
import Add_doctor from "./Add_doctor.jsx";
import Footer from "../footer/Footer.jsx";
import "./admin_home_page.css";
import ShowData from "./showData/ShowData.jsx";
import { useParams } from "react-router";

const Admin_home_page = () => {
  const params = useParams();
  return (
    <div>
      <Navigation email={params.email} />
      <div className="admin_home_container">
        <Add_doctor />
        <ShowData />
      </div>
      <Footer />
    </div>
  );
};

export default Admin_home_page;
