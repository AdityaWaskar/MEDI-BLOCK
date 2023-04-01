import React from "react";
import { useState, useEffect } from "react";
import MetamaskLogo from "../MetamaskLogo";
import "./patient.css";
import Wave from "react-wavify";
import { hospitalABI } from "../../abi";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Main_Page/Navigation";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PatientLogin = () => {
  const [account, setAccount] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [patientExist, setPatientExist] = useState(null);
  const [doctorExist, setDoctorExist] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, hospitalABI, signer);
  }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account[0]);

      let contract = await initializeProvider();
      console.log(account[0]);

      //check patient exists or not.
      let patient = await contract.PatientExists(account[0]);
      //check doctor exists or not.
      let doctor = await contract.DoctorExists(account[0]);

      // if patient exists than set role = patient and name = patient_name
      if (patient == true) {
        setPatientExist(true);
        let patientInformation = await contract.GetPatient(account[0]);
        setName(patientInformation[2].split(",")[0]);
        console.log(patientInformation[2]);
        setRole("Patient");
      }
      // if doctor exists than set role = doctor and name = doctor_name
      else if (doctor == true) {
        setDoctorExist(true);
        let doctorInformation = await contract.GetDoctor(account[0]);
        console.log(doctorInformation);
        setName(doctorInformation[1].split(",")[0]);
        console.log(doctorInformation[2]);
        setRole("Doctor");
      }
      // if both patient and doctor not exists than set err message ID not register...
      else {
        setErrMsg("ID not register. Kindly contact to the admin.");
        if (doctor == false) {
          setDoctorExist(false);

          // After 3s err message gets disappear
          setTimeout(() => {
            setDoctorExist(null);
            setName("");
            setRole("");
          }, 3000);
        }
        if (patient == false) {
          setPatientExist(false);
          // After 3s err message gets disappear
          setTimeout(() => {
            setPatientExist(null);
            setName("");
            setRole("");
          }, 3000);
        }
      }
    }
    // if metamask not installed than set err msg
    else {
      setAccount("err");
      setErrMsg("Please install Metamask Extenstion!");
      setTimeout(() => {
        console.log("hei");
        setAccount("removeErr");
      }, 2000);
    }
  }
  // }

  const patientLogin = async () => {
    if (patientExist == false || doctorExist == false) {
      setErrMsg("ID not register. Kindly contact to the admin.");
      if (patientExist == false) {
        setPatientExist(false);
        setTimeout(() => {
          setPatientExist(null);
          setName("");
          setRole("");
        }, 2000);
      } else if (doctorExist == false) {
        setDoctorExist(false);
        setTimeout(() => {
          setDoctorExist(null);
          setName("");
          setRole("");
        }, 2000);
      }
    } else {
      if (role == "Patient") {
        navigate("/patient_page/true/qirjfjfvh");
      } else if (role == "Doctor") {
        navigate("/doctor_page");
      }
    }
  };

  return (
    <section className="mainPatientContainer navType1">
      {/* <h1 className="projectTitle" data-aos="fade-down">
        HSM Using Blockchain
      </h1> */}
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
      <div className="patientLoginContainer" data-aos="slide-left">
        <div className="patientLoginSubContainer" data-aos="fade">
          <div className="MetamaskLogoContainer">
            <MetamaskLogo />
            <div className="metamaskName">Metamask</div>
          </div>
          <button className="connectButton" onClick={() => requestAccount()}>
            Connect With Metamask
          </button>
          {account && account != "err" && account != "removeErr" ? (
            <div className="loingInfo" data-aos="slide-up">
              <div className="wallentInformation">
                <div className="row">
                  <span>Wallet ID :</span>
                  <span className="accountNo">{account}</span>
                </div>
                {name != "" ? (
                  <div className="row">
                    <span>Name :</span>
                    <span>{name}</span>
                  </div>
                ) : null}
                {role != "" ? (
                  <div className="row">
                    <span>Role :</span>
                    <span>{role}</span>
                  </div>
                ) : null}
              </div>
              <div className="loginBtn">
                <button onClick={patientLogin}>Login</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {account == "err" || patientExist == false ? (
        <div data-aos="slide-up" className="metamaskErrMsg">
          {errMsg}
        </div>
      ) : null}
      {/* <div className="footer">
        Copyright &#9400; lalanboy's 2022 | Privacy Policy
      </div> */}
      <div className="footer">
        Copyright &#9400; lalanboy's 2022 | Privacy Policy
      </div>
    </section>
  );
};

export default PatientLogin;
