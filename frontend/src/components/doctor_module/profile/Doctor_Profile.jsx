import React, { useState, useEffect } from "react";
import "./doctor_profile.css";
import { doctor } from "../../../assets/doctorModule";
import doctorServices from "../../../services/doctorServices.js";
import Cookies from "js-cookie";

const Doctor_Profile = (props) => {
  const [doctorInfo, setDoctorInfo] = useState();

  const getDoctorInfo = async () => {
    props.setSpinner(true);
    const account = await requestAccount();
    let data = Cookies.get(account);
    if (!data) {
      data = await doctorServices.getDoctorBywallet(account);
      setDoctorInfo(data);
    } else {
      setDoctorInfo(JSON.parse(data));
    }
    props.setSpinner(false);
  };

  async function requestAccount() {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return account[0];
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <div className="rightProfile">
      <div className="heading"></div>
      <div className="profileImg">
        <img src={doctor} alt="profileInage" />
      </div>
      <div className="personalInfo">
        <div className="name">{doctorInfo?.name}</div>
        <div className="email">{doctorInfo?.email}</div>
        <div className="phone">{doctorInfo?.phoneNo}</div>
      </div>
      <div className="main">
        <div className="mainLeft">
          <div className="gender">Gender : {doctorInfo?.gender}</div>
          <div className="hosp">
            Hospital Name : {doctorInfo?.hospital_name}
          </div>
          <div className="spec">
            Specialization: {doctorInfo?.specialization}
          </div>
          <div className="dor">DOR: {doctorInfo?.DOR}</div>
        </div>
        <div className="mainRight">
          <div className="yrs">Age : {doctorInfo?.age}</div>
          <div className="degree">Degree: {doctorInfo?.degree}</div>
        </div>
      </div>
    </div>
  );
};

export default Doctor_Profile;
