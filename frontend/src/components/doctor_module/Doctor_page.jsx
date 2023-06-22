import React, { useState, useEffect } from "react";
import "./doctor_page.css";
import { doctor, viewPatient, profile } from "../../assets/doctorModule";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { doctorServices } from "../../services";
import Cookies from "js-cookie";

const Doctor_page = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [doctorData, setDoctorData] = useState();
  const _onClickEvent = (link) => {
    switch (link) {
      case "addbox":
        navigate("./addReport");
        break;
      case "viewPatient":
        navigate("./patientList");
        break;
      case "profile":
        navigate("./profile");
        break;
    }
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

  const getDoctorData = async () => {
    const account = await requestAccount();
    const data = Cookies.get(account);
    if (!data) {
      const doctorInfo = await doctorServices.fetchData(`wallet=${account}`);
      setDoctorData(doctorInfo);

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000); // Set expiration to 15 minutes from now
      Cookies.set(account, JSON.stringify(doctorInfo), {
        expires: expirationDate,
        path: "/doctor_page",
      });
    } else {
      setDoctorData(JSON.parse(data));
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div className="container">
      <Navigation email={params.email} />
      <div className="bgcontain">
        <p className="midHeading">
          High Innovative <br /> Profession Dentists
        </p>
        <p className="midSubHeading">Welcome, {doctorData?.name}</p>
      </div>
      <div className="bottom">
        <div className="addReport box" onClick={() => _onClickEvent("addbox")}>
          <img src={profile} alt="image" />
          <p>Add Report</p>
        </div>
        <div
          className="viewPatient box"
          onClick={() => _onClickEvent("viewPatient")}
        >
          <img src={viewPatient} alt="image" />
          <p>View Patient</p>
        </div>
        <div className="profile box" onClick={() => _onClickEvent("profile")}>
          <img src={doctor} alt="image" />
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Doctor_page;
