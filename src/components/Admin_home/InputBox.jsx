import React from "react";
import { useState } from "react";
import "./inputBox.css";

const InputBox = (props) => {
  const [ValidationMessage, setValidationMessage] = useState(null);

  //-----------add validation errors
  const infoValidation = (input, input_id) => {
    switch (input_id) {
      case "Name":
        if (input.includes("@") || input.includes("!") || input.includes("#")) {
          setValidationMessage("Not contains any special Character!");
          // props.setname("");
        }
        break;
      case "Age":
        console.log(input);
        if (parseInt(input) < 18 || parseInt(input) > 80) {
          setValidationMessage("Age should be between 18 to 80!");
          // props.setAge("");
        }
        break;
      case "Phone_No":
        if (input.length != 10 && input.length > 0) {
          setValidationMessage("Invalid Phone Number!");
          // props.setPhoneNo("");
        }
        break;
      case "Email":
        if (!input.includes("@")) {
          setValidationMessage("Invalid Email!");
          // props.setEmail("");
        }
      case "Qualificaion":
        break;
      case "Specialization":
        if (input.length == 0) {
          setValidationMessage("Please fill this field!");
          // props.setQualification("");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          setValidationMessage("Not contains any special Character!");
          // props.setQualification("");
        }
        break;
      case "Degree":
        if (input.length == 0) {
          setValidationMessage("Please fill this field!");
          // props.setD_degree("");
        } else if (
          input.includes("@") ||
          input.includes("!") ||
          input.includes("#")
        ) {
          setValidationMessage("Not contains any special Character!");
          // props.setD_degree("");
        }
        break;
      case "Hospital_Name":
        if (input.includes("@") || input.includes("!") || input.includes("#")) {
          setValidationMessage("Not contains any special Character!");
        }
        break;
      case "Wallet_Address":
        if (!input.includes("0x") || input.length != 42) {
          setValidationMessage("Invalid Wallet Address");
        }
        break;
    }
  };

  //-----------remove validation errors
  const removeInfoValidation1 = (input, input_id) => {
    switch (input_id) {
      case "Name":
        if (
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setValidationMessage(null);
        }
        break;
      case "Phone_No":
        if (input.length == 10 || input.length == 0) {
          setValidationMessage(null);
        }
        break;
      case "Age":
        if ((parseInt(input) >= 18 && parseInt(input) <= 80) || input == "") {
          setValidationMessage(null);
        }
        break;
      case "Specialization":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setValidationMessage(null);
        }
        break;
      case "Degree":
        if (
          input.length != 0 &&
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setValidationMessage(null);
        }
        break;
      case "Email":
        if (input.length == 0 || input.includes("@")) {
          setValidationMessage(null);
        }
        break;
      case "Wallet_Address":
        if (input.includes("0x") && input.length == 42) {
          setValidationMessage(null);
        }
        break;
      case "Hospital_Name":
        if (
          !input.includes("@") &&
          !input.includes("!") &&
          !input.includes("#")
        ) {
          setValidationMessage(null);
        }
        break;
    }
  };

  return (
    <div className="doctor_form_element" id={"d_" + props.title}>
      <label>{props.title}</label>

      {/* {props.title == "Id" ? (
        <input type={props.type} id={props.title + "1"} readOnly value={1} />
      ) : ( */}
      <input
        type={props.type}
        required
        id={props.title + "1"}
        value={props.value}
        onChange={(e) => {
          if (props.title == "Id") {
            props.setContractAddress(e.target.value);
          } else if (props.title == "Name") {
            props.setName(e.target.value);
            infoValidation(e.target.value, "Name");
            removeInfoValidation1(e.target.value, "Name");
          } else if (props.title == "Phone_No") {
            props.setPhoneNo(e.target.value);
            infoValidation(e.target.value, "Phone_No");
            removeInfoValidation1(e.target.value, "Phone_No");
          } else if (props.title == "Age") {
            props.setAge(e.target.value);
            infoValidation(e.target.value, "Age");
            removeInfoValidation1(e.target.value, "Age");
          } else if (props.title == "Email") {
            props.setEmail(e.target.value);
            infoValidation(e.target.value, "Email");
            removeInfoValidation1(e.target.value, "Email");
          } else if (props.title == "Specialization") {
            props.setOtherQualification(e.target.value);
            infoValidation(e.target.value, "Specialization");
            removeInfoValidation1(e.target.value, "Specialization");
          } else if (props.title == "Degree") {
            props.setOtherD_degree(e.target.value);
            infoValidation(e.target.value, "Degree");
            removeInfoValidation1(e.target.value, "Degree");
          } else if (props.title == "Wallet_Address") {
            props.setDoctorWalletAddress(e.target.value);
            infoValidation(e.target.value, "Wallet_Address");
            removeInfoValidation1(e.target.value, "Wallet_Address");
          } else if (props.title == "Hospital_Name") {
            props.setHospitalName(e.target.value);
            infoValidation(e.target.value, "Hospital_Name");
            removeInfoValidation1(e.target.value, "Hospital_Name");
          }
        }}
      />
      {/* )} */}
      <span className="inputError">{ValidationMessage}</span>
    </div>
  );
};

export default InputBox;
