import React from "react";
import { useState, useRef } from "react";
import "./inputBox.css";

const InputBox = (props) => {
  const [nameValidationMessage, setNameValidationMessage] = useState(null);

  const infoValidation = (input, input_id) => {
    switch (input_id) {
      case "Name":
        if (input.includes("@") || input.includes("!") || input.includes("#")) {
          setNameValidationMessage("Not contains any special Character!");
        }
        break;
      case "Age":
        console.log(input);
        if (parseInt(input) < 18 || parseInt(input) > 80) {
          setNameValidationMessage("Age should be between 18 to 80!");
        }
        break;
      case "Phone_No":
        if (input.length != 10 && input.length > 0) {
          setNameValidationMessage("Invalid Phone Number!");
        }
        break;
      case "Address":
        if (input.length == 0) {
        }
      case "Qualificaion":
        break;
      case "Specialization":
        if (input.length == 0) {
          console.log(input.length);
          setNameValidationMessage("Please fill this field!");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          console.log("not");
          setNameValidationMessage("Not contains any special Character!");
        }
        break;
      case "Degree":
        console.log("0");
        if (input.length == 0) {
          setNameValidationMessage("Please fill this field!");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          setNameValidationMessage("Not contains any special Character!");
        }
        break;
    }
  };

  const removeInfoValidation1 = (input, input_id) => {
    switch (input_id) {
      case "Name":
        if (
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setNameValidationMessage(null);
        }
        break;
      case "Phone_No":
        if (input.length == 10 || input.length == 0) {
          setNameValidationMessage(null);
        }
        break;
      case "Age":
        if ((parseInt(input) >= 18 && parseInt(input) <= 80) || input == "") {
          setNameValidationMessage(null);
        }
        break;
      case "Specialization":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setNameValidationMessage(null);
        }
        break;
      case "Degree":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setNameValidationMessage(null);
        }
        break;
    }
  };

  return (
    // <div>
    <div className="doctor_form_element" id={props.title}>
      <label>{props.title}</label>

      {props.title == "Id" ? (
        <input type={props.type} id={props.title + "1"} readOnly value={1} />
      ) : (
        <input
          type={props.type}
          required
          id={props.title + "1"}
          onChange={(e) => {
            if (props.title == "Name") {
              // props.setName(e.target.value);
              infoValidation(e.target.value, "Name");
              removeInfoValidation1(e.target.value, "Name");
            } else if (props.title == "Email") {
              // props.setEmail(e.target.value);
            } else if (props.title == "Phone_No") {
              infoValidation(e.target.value, "Phone_No");
              removeInfoValidation1(e.target.value, "Phone_No");
              // console.log(e.target.value);
              // props.setPhone(e.target.value);
            } else if (props.title == "Age") {
              infoValidation(e.target.value, "Age");
              removeInfoValidation1(e.target.value, "Age");
              // props.setAge(e.target.value);
            } else if (props.title == "Address") {
              infoValidation(e.target.value, "Address");
              removeInfoValidation1(e.target.value, "Address");
              // props.setAddress(e.target.value);
            } else if (props.title == "Gender") {
              console.log(e.target.value + " sdf");
              infoValidation(e.target.value, "Gender");
              removeInfoValidation1(e.target.value, "Gender");
              // props.setGender(e.target.value);
            } else if (props.title == "Specialization") {
              infoValidation(e.target.value, "Specialization");
              removeInfoValidation1(e.target.value, "Specialization");
            } else if (props.title == "Degree") {
              infoValidation(e.target.value, "Degree");
              removeInfoValidation1(e.target.value, "Degree");
            } else if (props.title == "Disease") {
              // props.setDisease(e.target.value);
            } else if (props.title == "Symptoms") {
              // props.setSymptoms(e.target.value);
            } else if (props.title == "Medicine_Name") {
              // props.setMedicine_name(e.target.value);
            } else if (props.title == "Report") {
              // props.setReport(e.target.files[0]);
            }
          }}
        />
      )}
      <span>{nameValidationMessage}</span>
    </div>
    // </div>
  );
};

export default InputBox;
