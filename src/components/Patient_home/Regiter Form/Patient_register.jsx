import React, { useState } from "react";
import Footer from "../../footer/Footer";
import "./patient_register.css";
const Patient_register = () => {
  const genderVal = ["Male", "Female", "Other"];
  const bloodGroupVal = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const [walletId, setWalletId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "walletId":
        setWalletId(value);
        break;
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "bloodGroup":
        setBloodGroup(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server here
    console.log({ walletId, name, age, gender, email, phoneNo, bloodGroup });
  };

  return (
    <section className="patient_register_main_container">
      <form onSubmit={handleSubmit} className="patientRegisterContainer">
        <h1>Patient registration </h1>
        <div className="row">
          <div className="element" id="walletid">
            <label>Wallet ID:</label>
            <input
              type="text"
              name="walletId"
              value={walletId}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="element">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="element">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="element" id="gender">
            <label>Gender:</label>
            <select name="gender" value={gender} onChange={handleInputChange}>
              {genderVal.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="element" id="bloodgrp">
            <label>Blood Group:</label>
            <select
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleInputChange}
            >
              {bloodGroupVal.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="element">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="element">
            <label>Phone No:</label>
            <input
              type="tel"
              name="phoneNo"
              value={phoneNo}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Patient_register;
