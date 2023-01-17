import React from "react";
import { useState, useEffect } from "react";
import "./add_doctor.css";
import InputBox from "./InputBox";
var today;

const Add_doctor = () => {
  const [addDoctorForm, setAddDoctorForm] = useState(false);
  const [cancelBtnFlag, setCancelBtnFlag] = useState(true);
  const [otherOption, setOtherOption] = useState(false);
  const [otherOption1, setOtherOption1] = useState(false);

  useEffect(() => {
    // Date Limit till today (can't enter the tomorrow's date)
    today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
  }, []);

  const cancel_btn = (value) => {
    setCancelBtnFlag(value);
    console.log(cancelBtnFlag);
  };

  const Specialization = [
    "select",
    "Orthopedics",
    "Obstetrics and Gynecology",
    "Dermatology",
    "Pediatrics",
    "Radiology",
    "General Surgery",
    "Ophthalmology",
    "Family Medicine",
    "Chest Medicine",
    "Anesthesia",
    "Pathology",
    "ENT",
    "other",
  ];

  const degree = [
    "select",
    "MBBS",
    "MS",
    "MD",
    "BAMS",
    "BPT",
    "B.VSc",
    "BUMS",
    "BSMS",
    "other",
  ];
  return (
    <section className="add_doctor_container">
      <button className="add_doctor_button">Add Doctor</button>
      <div className="add_doctor_image">
        <img src="img/add_doctor_image.svg" alt="" />
      </div>
      <div className="buttons">
        <img
          className={
            cancelBtnFlag == true ? "add_button add_form_active" : "add_button"
          }
          onClick={() => {
            setAddDoctorForm(true);
            cancel_btn(false);
          }}
          src="img/add_symbol.svg"
        />
      </div>

      <div
        className={
          cancelBtnFlag ? "add_doctor_form doctor_active" : "add_doctor_form"
        }
      >
        <InputBox title={"Id"} type={"text"} setName={true} />
        <div className="row">
          <InputBox title={"Name"} type={"text"} setName={true} />
          <InputBox title={"Age"} type={"number"} setName={true} />
        </div>
        <div className="row">
          <InputBox title={"Address"} type={"text"} setName={true} />
          <InputBox title={"Phone_No"} type={"text"} setName={true} />
        </div>
        <div className="doctor_form_element" id="Gender">
          <label>Gender</label>
          <div className="gender_option">
            <div className="option">
              <input type="radio" name="male" id="male" />
              <span>Male</span>
            </div>
            <div className="option">
              <input type="radio" name="male" id="male" />
              <span>Female</span>
            </div>
            <div className="option">
              <input type="radio" name="male" id="male" />
              <span>Other</span>
            </div>
          </div>
        </div>
        <div className="doctor_form_element" id="Qualificaton">
          <label>Qualification/Specialization</label>
          <select
            onChange={(e) => {
              e.target.value == "other"? setOtherOption(true): setOtherOption(false);
            }}
          >
            {Specialization.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {otherOption ? (
            <InputBox title={"Specialization"} type={"text"} setName={true} />
          ) : null}
        </div>
        <div className="doctor_form_element" id="degree">
          <label>Degree</label>
          <select
            onChange={(e) => {
              e.target.value == "other"? setOtherOption1(true): setOtherOption1(false);
            }}
          >
            {degree.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {otherOption1 ? (
            <InputBox title={"Degree"} type={"text"} setName={true} />
          ) : null}
        </div>
        {/* <InputBox title={"Degree"} type={"text"} setName={true} /> */}
        <hr />
        <div className="doctor_form_element" id="doctor_register_date">
          <label>Data of Registration</label>
          <input type="date" max={today} id="date" />
        </div>
        <div className="doctor_register_btn">
          <button id="cancel_btn" onClick={() => cancel_btn(true)}>
            Cancel
          </button>
          <button id="register_btn">Register</button>
        </div>
      </div>
    </section>
  );
};

export default Add_doctor;
