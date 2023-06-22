import React from "react";
import "./doctor_navigation.css";
import {
  dashboard,
  doctor,
  profile,
  viewPatient,
} from "../../../assets/doctorModule";
import { useParams } from "react-router";

const Doctor_navigation = ({ onPageChange }) => {
  const params = useParams();
  return (
    <div className="left doctor_navigation_container">
      <div className="up">
        <div className="profile">
          <img src={doctor} alt="profile" />
          <p>{params.email}</p>
        </div>
        <div className="function">
          <span>Function</span>
          <div className="items">
            <div className="list">
              <img src={dashboard} alt="image" />
              <button onClick={() => onPageChange("dashboard")}>
                Dashboard
              </button>
            </div>
            <div className="list">
              <img src={viewPatient} alt="image" />
              <button onClick={() => onPageChange("patientList")}>
                Patient List
              </button>
            </div>
            <div className="list">
              <img src={profile} alt="image" />
              <button onClick={() => onPageChange("addReport")}>
                Add Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="down">
        <div className="function">
          <span>OTHER</span>
          <div className="items">
            <div className="list">
              <img src={doctor} alt="image" />
              <button onClick={() => onPageChange("profile")}>Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor_navigation;
