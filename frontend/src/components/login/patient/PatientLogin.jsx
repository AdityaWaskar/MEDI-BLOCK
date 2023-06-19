import React, { useState, useEffect } from "react";
import MetamaskLogo from "../MetamaskLogo";
import "./patient.css";
import Wave from "react-wavify";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Main_Page/Navigation";
import { AiOutlineUserAdd } from "react-icons/ai";

const PatientLogin = () => {
  const [account, setAccount] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [patientExist, setPatientExist] = useState(null);
  const [doctorExist, setDoctorExist] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account[0]);

      //check patient exists or not.
      const response1 = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/patient/isexist/${account[0]}`,
        { mode: "cors" }
      );
      const patient = await response1.json();

      //check doctor exists or not.
      let response2 = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/doctor/isexist/${account[0]}`,
        { mode: "cors" }
      );
      const doctor = await response2.json();

      // if patient exists than set role = patient and name = patient_name
      if (patient == true) {
        setPatientExist(true);

        let patientInformation = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/patient/wallet=${account[0]}`,
          { mode: "cors" }
        );
        patientInformation = await patientInformation.json();
        setName(patientInformation["name"]);
        setEmail(patientInformation["email"]);
        setPhone(patientInformation["phoneNo"]);
        setRole("Patient");
      }

      // if doctor exists than set role = doctor and name = doctor_name
      else if (doctor == true) {
        setDoctorExist(true);
        let doctorInformation = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/doctor/wallet=${account[0]}`,
          { mode: "cors" }
        );
        doctorInformation = await doctorInformation.json();
        setName(doctorInformation["name"]);
        setEmail(doctorInformation["email"]);
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
        setAccount("removeErr");
      }, 2000);
    }
  }

  const patientLogin = async () => {
    if (patientExist == false || doctorExist == false) {
      setErrMsg("ID not register. Kindly contact to the admin.");
      // if (patientExist == false) {
      //   setPatientExist(false);
      //   setTimeout(() => {
      //     setPatientExist(null);
      //     setName("");
      //     setRole("");
      //   }, 2000);
      // } else if (doctorExist == false) {
      //   setDoctorExist(false);
      //   setTimeout(() => {
      //     setDoctorExist(null);
      //     setName("");
      //     setRole("");
      //   }, 2000);
      // }
    } else {
      if (role == "Patient") {
        navigate(`/patient_page/true/${phone}/${email}`);
      } else if (role == "Doctor") {
        navigate(`/doctor_page/${email}`);
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
        Copyright &#9400; hsm.com 2023 | Privacy Policy
      </div>
      {/* <div className="addpatient"> */}
      <div className="addIcon" onClick={() => navigate("/patientRegister")}>
        <AiOutlineUserAdd />
      </div>
    </section>
  );
};

export default PatientLogin;
