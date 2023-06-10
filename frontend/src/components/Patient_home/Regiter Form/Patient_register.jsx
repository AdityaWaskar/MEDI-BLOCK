import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./patient_register.css";
import Footer from "../../footer/Footer";
import Navigation from "../../Main_Page/Navigation";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../spinner/Spinner";
import Wave from "react-wavify";
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

const Patient_register = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(genderVal[0]);
  const [bloodGroup, setBloodGroup] = useState(bloodGroupVal[0]);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      try {
        const acc = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletId(acc[0]);
        return ethereum;
      } catch (error) {
        //throw
      }
    }
  }

  const clearStates = () => {
    setName("");
    setAge("");
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

  const handleInputChange = (stateName, value) => {
    stateName(value);
  };

  const isValid = () => {
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
        fetch(`${process.env.REACT_APP_API_BASE_URL}/patient/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient_wallet_address: walletId,
            name: name,
            phoneNo: phoneNo,
            email: email,
            gender: gender,
            age: age,
            blood_group: bloodGroup,
            DOR: todayDate(),
          }),
        }).then((res) => {
          toast.success("Patient Successfully Register!");
          clearStates();
          setSpinner(false);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        });
      } else {
        console.log("not!");
      }
    } catch (error) {
      setSpinner(false);

      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="navType1">
      <Navigation />
      <Wave
        className="wave"
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
                onChange={(e) => handleInputChange(setWalletId, e.target.value)}
                readOnly
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
                onChange={(e) => handleInputChange(setName, e.target.value)}
              />
            </div>
            <div className="element">
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => handleInputChange(setAge, e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="element" id="gender">
              <label>Gender:</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => handleInputChange(setGender, e.target.value)}
              >
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
                onChange={(e) =>
                  handleInputChange(setBloodGroup, e.target.value)
                }
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
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
              />
            </div>
            <div className="element">
              <label>Phone No:</label>
              <input
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => handleInputChange(setPhoneNo, e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="element" id="homeAddress">
              <label>Address:</label>
              <textarea
                value={homeAddress}
                name="homeAdderss"
                onChange={(e) =>
                  handleInputChange(setHomeAddress, e.target.value)
                }
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
