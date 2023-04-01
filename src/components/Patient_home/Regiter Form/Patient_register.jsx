import React, { useState, useEffect } from "react";
import { hospitalABI } from "../../abi";
import { ethers } from "ethers";
import Footer from "../../footer/Footer";
import AddPatient from "../../home/AddPatient";
import "./patient_register.css";
import toast, { Toaster } from "react-hot-toast";

// const contractAddress = "0xfd8593CBe7bca09572E530166Dfe106f737e7b18";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Patient_register = () => {
  const genderVal = ["Select", "Male", "Female", "Other"];
  const bloodGroupVal = [
    "Select",
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];
  const [walletId, setWalletId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(genderVal[0]);
  const [bloodGroup, setBloodGroup] = useState(bloodGroupVal[0]);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const clearStates = () => {
    setName("");
    setAge("");
    setGender("");
    setBloodGroup("");
    setEmail("");
    setPhoneNo("");
  };
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
      case "homeAdderss":
        setHomeAddress(value);
        break;
      default:
        break;
    }
  };

  //   function AddPatient(
  //     address _patientAddress,
  //     string memory name,
  //     string memory email,
  //     string memory phoneNo,
  //     string memory homeAddress
  // )

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, hospitalABI, signer);
  }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletId(account[0]);
  }
  const isValid = () => {
    if (name.length == 0) {
      toast.error("Name invalid!");
      return false;
    }
    return true;
  };
  const handleSubmit1 = async () => {
    if (isValid()) {
      console.log(
        walletId,
        `${name},${age},${gender}`,
        `${email},${bloodGroup}`,
        phoneNo,
        homeAddress
      );
      let contract = await initializeProvider();

      const result = await contract.AddPatient(
        walletId,
        `${name},${age},${gender}`,
        `${email},${bloodGroup}`,
        phoneNo,
        homeAddress
      );
      console.log(result);
      toast.success("Patient Successfully Register!");
    } else {
      console.log("not!");
    }
  };

  useEffect(() => {
    requestAccount();
  }, []);

  return (
    <section className="patient_register_main_container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="patientRegisterContainer">
        <h1>Patient registration </h1>
        <div className="row">
          <div className="element" id="walletid">
            <label>Wallet ID:</label>
            <input
              type="text"
              name="walletId"
              value={walletId}
              onChange={handleInputChange}
              // readOnly
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
        <div className="row">
          <div className="element">
            <label>Address:</label>
            {/* <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            /> */}
            <textarea
              value={homeAddress}
              name="homeAdderss"
              onChange={handleInputChange}
              rows="10"
              cols="60"
            />
          </div>
        </div>
        <button onClick={handleSubmit1}>Register</button>
      </div>
    </section>
  );
};

export default Patient_register;
