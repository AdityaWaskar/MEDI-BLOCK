import React, { useState, useEffect } from "react";
import "./patient_register.css";
import FromInput from "./FromInput";

const Patient_register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneno: "",
    address: "",
    walletaddress: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "name",
      errorMessage:
        "Name should be 3 to 20 character. & shouldn't include any special character!",
      label: "Name",
      pattern: "([A-Za-z])+( [A-Za-z]+)",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phoneno",
      type: "text",
      placeholder: "Phone_No",
      errorMessage: "Number should be of 10 digits!",
      label: "Phone No.",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 5,
      name: "walletaddress",
      type: "text",
      placeholder: "Wallet Address",
      errorMessage: "Should be a valid wallet address!",
      label: "Wallet Address",
      pattern: "^0x[a-fA-F0-9]{40}$",
      required: true,
    },
    {
      id: 6,
      name: "age",
      type: "text",
      placeholder: "Age",
      label: "Age",
      required: true,
    },
    {
      id: 7,
      name: "gender",
      type: "text",
      placeholder: "Gender",
      label: "Gender",
      required: true,
    },
    {
      id: 8,
      name: "bloodgr",
      type: "text",
      placeholder: "Blood Group",
      label: "Blood Group",
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target)
    // console.log(Object.fromEntries(data.entries()));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="patientRegisterContainer">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FromInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Patient_register;
