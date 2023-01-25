import React, { useState } from "react";
import "./inputBox.css";

const Inputbox = (props) => {
  const [errMsg, setErrMsg] = useState(null);

  const infoValidation = (input, input_id) => {
    switch (input_id) {
      case "Email":
        if (
          !input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          setErrMsg("Invalid Email Address!");
        }
        break;
      case "Age":
        if (parseInt(input) < 18 || parseInt(input) > 80) {
          setErrMsg("Age should be between 18 to 80!");
        }
        break;
      case "Phone_No":
        if (input.length != 10 && input.length > 0) {
          setErrMsg("Invalid Phone Number!");
        }
        break;
      case "Address":
        if (input.length == 0) {
        }
      case "Doctor_Name" || "Disease" || "Symptoms":
        if (input.includes("@") || input.includes("!") || input.includes("#")) {
          setErrMsg("Not contains any special Character!");
        }
        break;
      case "Specialization":
        if (input.length == 0) {
          console.log(input.length);
          setErrMsg("Please fill this field!");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          console.log("not");
          setErrMsg("Not contains any special Character!");
        }
        break;
      case "Degree":
        console.log("0");
        if (input.length == 0) {
          setErrMsg("Please fill this field!");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          setErrMsg("Not contains any special Character!");
        }
        break;
    }
  };

  //-----------remove validation errors
  const removeInfoValidation1 = (input, input_id) => {
    switch (input_id) {
      case "Email":
        if (
          input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setErrMsg(null);
        }
        break;
      case "Doctor_Name" || "Disease" || "Symptoms":
        if (
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setErrMsg(null);
        }
        break;

      case "Phone_No":
        if (input.length == 10 || input.length == 0) {
          setErrMsg(null);
        }
        break;
      case "Age":
        if ((parseInt(input) >= 18 && parseInt(input) <= 80) || input == "") {
          setErrMsg(null);
        }
        break;
      case "Specialization":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setErrMsg(null);
        }
        break;
      case "Degree":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setErrMsg(null);
        }
        break;
    }
  };

  return (
    // <div>
    <div className="element" id={props.title}>
      <label>{props.title}</label>
      <input
        type={props.type}
        required
        onChange={(e) => {
          if (props.title == "Name") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setName(e.target.value);
          } else if (props.title == "Email") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setEmail(e.target.value);
          } else if (props.title == "Phone_No") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setPhone(e.target.value);
          } else if (props.title == "Age") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setAge(e.target.value);
          } else if (props.title == "Address") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setAddress(e.target.value);
          } else if (props.title == "Gender") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setGender(e.target.value);
          } else if (props.title == "Blood_Group") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setBloodGroup(e.target.value);
          } else if (props.title == "Doctor_Name") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setDoctorName(e.target.value);
          } else if (props.title == "Disease") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setDisease(e.target.value);
          } else if (props.title == "Symptoms") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setSymptoms(e.target.value);
          } else if (props.title == "Medicine_Name") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setMedicine_name(e.target.value);
          } else if (props.title == "Report") {
            infoValidation(e.target.value, props.title);
            removeInfoValidation1(e.target.value, props.title);
            props.setReport(e.target.files[0]);
          }
        }}
      />
      <span>{errMsg}</span>
    </div>
    // </div>
  );
};

export default Inputbox;