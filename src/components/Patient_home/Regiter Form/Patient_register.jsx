import React, { useState, useEffect } from "react";
import { hospitalABI } from "../../abi";
import { ethers } from "ethers";
import Footer from "../../footer/Footer";
import Navigation from "../../Main_Page/Navigation";
import AddPatient from "../../home/AddPatient";
import "./patient_register.css";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../spinner/Spinner";
import Wave from "react-wavify";

// const contractAddress = "0xfd8593CBe7bca09572E530166Dfe106f737e7b18";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Patient_register = () => {
  const [spinner, setSpinner] = useState(false);
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
    setAge(null);
    setGender(genderVal[0]);
    setBloodGroup(bloodGroupVal[0]);
    setEmail("");
    setPhoneNo("");
    setHomeAddress("");
  };

  const todayDate = () => {
    // Date Limit till today (can't enter the tomorrow's date)
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
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
    console.log(age, typeof age);
    if (name.length == 0) {
      toast.error("Name invalid!");
      return false;
    } else if (email.length === 0 && !email.includes("@")) {
      toast.error("Email Invalid!");
      return false;
    } else if (age.length < 1 && parseInt(age) < 1 && age > 100) {
      toast.error("Invalid Age!");
      return false;
    } else if (gender === "Select") {
      toast.error("Please select Gender!");
      return false;
    } else if (bloodGroup === "Select") {
      toast.error("Please select BloodGroup!");
      return false;
    } else if (phoneNo.length !== 10) {
      toast.error("Invalid Phone Number!");
      return false;
    } else if (homeAddress.length < 1) {
      toast.error("Invalid Address!");
      return false;
    }
    return true;
  };
  const handleSubmit1 = async () => {
    setSpinner(true);
    try {
      if (isValid()) {
        let contract = await initializeProvider();
        await contract
          .AddPatient(
            walletId,
            `${name},${age},${gender}`,
            `${email},${bloodGroup},${todayDate()}`,
            phoneNo,
            homeAddress
          )
          .then((res) => {
            toast.success("Patient Successfully Register!");
            clearStates();
          });
      } else {
        console.log("not!");
      }
    } catch (error) {
      console.log(error);
    }
    setSpinner(false);
  };

  useEffect(() => {
    requestAccount();
  }, []);

  return (
    <div className="navType1">
      <Navigation />
      <Wave
        className="wave"
        // fill="#ee82ee"
        fill="#b598f9"
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <Spinner active={spinner} />
      <section className="patient_register_main_container">
        <Toaster position="bottom-center" reverseOrder={false} />
        <h1>Patient registration </h1>
        <div className="patientRegisterContainer">
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
                type="text"
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
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="element" id="homeAddress">
              <label>Address:</label>
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
      <Footer />
    </div>
  );
};

export default Patient_register;
