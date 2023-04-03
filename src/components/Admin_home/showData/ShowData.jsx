import React from "react";
import "./showData.css";
import Doctor_data from "./Doctor_data";
import PatientData from "./PatientData";
import { useState } from "react";
const ShowData = (props) => {
  const [btn_active, setBtn_active] = useState("doctor");

  return (
    <div className="show_data">
      {/* <div className="btn_options">
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
      </div> */}

      <div className="options">
        <div
          className="col"
          id={`${btn_active == "doctor" ? "col1" : "removeCol1"}`}
          onClick={() => {
            // setOptionActive("col1");
            // setSubOptions(patient);
            setBtn_active("doctor");
          }}
        >
          {/* <HiOutlineOfficeBuilding className="option_icon" /> */}
          <div className="option_title">Doctor</div>
        </div>
        <div
          className="col"
          id={`${btn_active == "patient" ? "col2" : "removeCol2"}`}
          onClick={() => setBtn_active("patient")}
        >
          {/* <RiBook2Fill className="option_icon" /> */}
          <div className="option_title">Patient</div>
        </div>
      </div>
      {btn_active == "patient" ? (
        <PatientData setSpinner={props.setSpinner} />
      ) : (
        <Doctor_data setSpinner={props.setSpinner} />
      )}
    </div>
  );
};

export default ShowData;
