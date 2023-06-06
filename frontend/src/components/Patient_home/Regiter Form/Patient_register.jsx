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
import connectToInfura from "../../Connection";
import Web3 from "web3";
// import { Navigate } from "react-router";
import { useNavigate } from "react-router";

// const web3 = new Web3(process.env.REACT_APP_INFURA_HTTPURL);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  )
);
const private_key = process.env.REACT_APP_WALLET_PRIVATE_ADDRESS;
const contarct_address = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contarct_address = "0x444FcD545168031c8C9ec0db8F4dd2349b2b64ac";

const account1 = web3.eth.accounts.privateKeyToAccount("0x" + private_key);
web3.eth.accounts.wallet.add(account1);

const Patient_register = () => {
  const navigate = useNavigate();
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
  const [bloodGroup, setBloodGroup] = useState(bloodGroupVal[1]);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  // const [_web3, setWeb3] = useState(null);

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
    // setName("");
    // setAge("");
    // setGender(genderVal[0]);
    // setBloodGroup(bloodGroupVal[0]);
    // setEmail("");
    // setPhoneNo("");
    // setHomeAddress("");
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

  // // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract

  // // Displays a prompt for the user to select which accounts to connect

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
  async function requestAccount() {
    const _account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return _account[0];
  }

  const handleSubmit1 = async () => {
    setSpinner(true);
    try {
      console.log("dsf", contarct_address, walletId);
      if (isValid()) {
        const adr = await requestAccount();
        const contract = new web3.eth.Contract(hospitalABI, contarct_address);

 
        // Create the transaction object
        const txObject = {
          to: contarct_address,
          from: adr,
          // nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
          gasLimit: web3.utils.toHex(300000),
          data: contract.methods
            .AddPatient(
              walletId,
              `${name},${age},${gender}`,
              `${email},${bloodGroup},${todayDate()}`,
              phoneNo,
              homeAddress
            )
            .encodeABI(),
        };

        const signedTransaction = await web3.eth.accounts.signTransaction(
          txObject,
          "0x" + private_key /* Replace with your private key */
        );
        const rawTransaction = signedTransaction.rawTransaction;
        const result = await web3.eth
          .sendSignedTransaction(rawTransaction)
          .then((res) => {
            toast.success("Patient Successfully Register!");
            clearStates();
            setSpinner(false);
            setTimeout(() => {
              navigate(-1);
            }, 3000);
          });
        console.log("test2");
      } else {
        console.log("not!");
      }
    } catch (error) {
      setSpinner(false);

      console.log(error);
    }
  };

  // useEffect(() => {
  //   requestAccount();
  // }, []);

  useEffect(() => {
    connectWallet();
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
