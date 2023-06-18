import React from "react";
import "./doctor_page.css";
import { adddoctor, viewPatient, profile } from "../../../assets/doctorModule";
import Navigation from "../../navigation/Navigation";
const Doctor_page = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="bgcontain">
        <p className="midHeading">
          High Innovative <br /> Profession Dentists
        </p>
        <p className="midSubHeading">Welcome, Aditya Waskar</p>
      </div>
      <div className="bottom">
        <div className="addReport box">
          <img src={profile} alt="image" />
          <p>Add Report</p>
        </div>
        <div className="viewPatient box">
          <img src={viewPatient} alt="image" />
          <p>View Patient</p>
        </div>
        <div className="profile box">
          <img src={adddoctor} alt="image" />
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Doctor_page;
