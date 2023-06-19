import React from "react";
import "./doctor_page.css";
import { adddoctor, viewPatient, profile } from "../../../assets/doctorModule";
import Navigation from "../../navigation/Navigation";
import { useNavigate } from "react-router-dom";

const Doctor_page = () => {
  const navigate = useNavigate();
  const _onClickEvent = (link) => {
    switch (link) {
      case "addbox":
        navigate("/addReport");
        break;
      case "viewPatient":
        navigate("/patientList");
        break;
      case "profile":
        navigate("profile");
        break;
    }
  };
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
        <div className="addReport box" onClick={() => _onClickEvent("addbox")}>
          <img src={profile} alt="image" />
          <p>Add Report</p>
        </div>
        <div
          className="viewPatient box"
          onClick={() => _onClickEvent("viewPatient")}
        >
          <img src={viewPatient} alt="image" />
          <p>View Patient</p>
        </div>
        <div className="profile box" onClick={() => _onClickEvent("profile")}>
          <img src={adddoctor} alt="image" />
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Doctor_page;
