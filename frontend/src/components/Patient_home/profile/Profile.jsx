import React, { useState, useEffect } from "react";
import "./profile.css";
import { patientProfile } from "../../../assets/patientModule";
import { patientServices } from "../../../services";
import Navigation from "../../navigation/Navigation";
import Spinner from "../../spinner/Spinner";
import Cookies from "js-cookie";
import { useParams } from "react-router";
const Profile = () => {
  const [patientInfo, SetPaientInfo] = useState();
  const [spinner, setSpinner] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const params = useParams();
  async function requestAccount() {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(account[0]);
      return account[0];
    } catch (e) {
      console.log(e);
    }
  }

  const getPatientInfo = async () => {
    setSpinner(true);
    const account = await requestAccount();
    let data = Cookies.get(account);
    if (!data) {
      data = await patientServices.getpatientByWallet(account);
      SetPaientInfo(data);
    } else {
      SetPaientInfo(JSON.parse(data));
    }
    setSpinner(false);
  };

  useEffect(() => {
    getPatientInfo();
  }, []);
  return (
    <div className="patientProfileContainer">
      <Spinner active={spinner} />
      <Navigation email={params.email} />
      <div className="mainContant">
        <div className="heading"></div>
        <div className="profileImg">
          <img src={patientProfile} alt="profileInage" />
        </div>
        <div className="personalInfo">
          <div className="name">{patientInfo?.name}</div>
          <div className="email">{patientInfo?.email}</div>
          <div className="phone">{patientInfo?.phoneNo}</div>
        </div>
        <div className="data">
          <div className="leftData">
            {/* <div className="email">Email: himanshu@gmail.com</div> */}
            <div className="age">Age: {patientInfo?.age}</div>
            <div className="gender">Gender: {patientInfo?.gender}</div>
            <div className="patientAddress">Patient Address: Mumbai</div>
          </div>
          <div className="rightData">
            {/* <div className="phoneNo">Phone No.: 8793644810</div> */}
            <div className="address">Address: {walletAddress}</div>
            <div className="bloodgr">
              Blood Group: {patientInfo?.blood_group}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
