import React from "react";
import "./showData.css";
import Doctor_data from "./Doctor_data";
import PatientData from "./PatientData";
import { useState } from "react";
const ShowData = () => {
  const [btn_active, setBtn_active] = useState("doctor");

  return (
    <div className="show_data">
      <div className="btn_options">
        <button
          className={
            btn_active == "doctor" ? "active" : "non_active" + " doctor"
          }
          onClick={() => setBtn_active("doctor")}
        >
          Doctor
        </button>
        <button
          className={
            btn_active == "patient" ? "active" : "non_active" + " patient"
          }
          onClick={() => setBtn_active("patient")}
        >
          Patient
        </button>
      </div>
      {btn_active == "patient" ? <PatientData /> : <Doctor_data />}
    </div>
  );
};

export default ShowData;
