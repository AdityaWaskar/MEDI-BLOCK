import React from "react";
import { useState, useEffect } from "react";
import MetamaskLogo from "../MetamaskLogo";
import "./patient.css";
import { CgLogIn } from "react-icons/cg";

const PatientLogin = () => {
  const [account, setAccount] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [patientExist, setPatientExist] = useState(null);

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account[0]);
    } else {
      setAccount("err");
      setErrMsg("Please install Metamask Extenstion!");
      setTimeout(() => {
        console.log("hei");
        setAccount("removeErr");
      }, 2000);
    }
  }
  const patientLogin = () => {
    setPatientExist(false);
    setErrMsg("Patient not register. Kindly contact to the admin.");
    setTimeout(() => {
      console.log("hei2");
      setPatientExist(null);
    }, 2000);
  };

  return (
    <section className="mainPatientContainer">
      <h1 className="projectTitle" data-aos="fade-down">
        HSM Using Blockchain
      </h1>
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
                <span>Wallent Id : </span>
                <span>{account}</span>
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
    </section>
  );
};

export default PatientLogin;
