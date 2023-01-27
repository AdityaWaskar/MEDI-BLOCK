import React from "react";
import "./report_form.css";
import Inputbox from "./InputBox/InputBox";
import { useState } from "react";

const genderVal = ["Male", "Female", "Other"];
const bloodGroupVal = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Report_form = (params) => {
  return (
    <div className="report_form_container">
      <div className="form_title">Report</div>
      <div className="name">Aditya Prakash Waskar</div>
      <hr />
      <div className="form_sub_title">Personal Information</div>
      <div className="input_group">
        <div className="row">
          <Inputbox title={"Email"} type={"text"} />
          <div className="element" id="Gender">
            <label>Gender</label>
            <select>
              {genderVal.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <Inputbox title={"Age"} type={"text"} />
          <Inputbox title={"Phone_No"} type={"text"} />
        </div>
        <div className="row">
          <Inputbox title={"Address"} type={"text"} />
          <div className="element" id="Blood_Group">
            <label>Blood Group</label>
            <select>
              {bloodGroupVal.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div className="form_sub_title">Medical Information</div>
      <div className="input_group">
        <div className="row">
          <Inputbox title={"Doctor_Name"} type={"text"} />
          <Inputbox title={"Disease"} type={"text"} />
        </div>
        <div className="row">
          <Inputbox title={"Phone_No"} type={"text"} />
          <Inputbox title={"Symptoms"} type={"text"} />
        </div>
        <Inputbox title={"Report"} type={"file"} />
      </div>
      <hr />
      <div className="form_sub_title">Date of Consultancy</div>
      <div className="input_group">
        <Inputbox title={"Date"} type={"date"} />
      </div>

      <div className="report_btn">
        <button className="cancel_btn" onClick={() => params.setCancel(false)}>
          Cancel
        </button>
        <button className="submit_btn">Submit</button>
      </div>
    </div>
  );
};

export default Report_form;
