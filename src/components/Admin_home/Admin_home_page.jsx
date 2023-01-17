import React from "react";
import Navigation from "../navigation/Navigation.jsx";
import Add_doctor from "./Add_doctor.jsx";
import Footer from "../footer/Footer.jsx";
import "./admin_home_page.css";
import ShowData from "./showData/ShowData.jsx";
const Admin_home_page = () => {
  return (
    <div>
      <Navigation />
      <div className="admin_home_container">
        <Add_doctor />
        <ShowData />
        {/* <div style={{ width: "50%" }}>asdf</div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Admin_home_page;
