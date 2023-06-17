import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import "./detailInfo.css";
import { useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Spinner from "../spinner/Spinner";
import Footer from "../footer/Footer";
import { doctorServices, patientServices } from "../../services";

const DetailInfo = (props) => {
  const params = useParams();
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [patientWalletAddress, setPatientWalletAddress] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [age, setAge] = useState(0);
  const [doctorName, setDoctorName] = useState("");
  const [doctorPhNo, setDoctorPhNo] = useState("");
  const [doctorWalletAddress, setDoctorWalletAdd] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [disease, setDisease] = useState("");
  const [prescription, setPrescription] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [docEmail, setDocEmail] = useState();

  useEffect(() => {
    requestAccount();
  }, []);

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
    return account[0];
  }

  const getMedicalData = async () => {
    setSpinner(true);

    const medicalData = await patientServices.getparticularReport(params.id);
    // setMedicalData(medicalData);

    setDisease(medicalData.disease);
    setSymptoms(medicalData.symptom);
    setPrescription(medicalData.prescription);
    setReport(medicalData.report);
    setDate(medicalData.date);

    await getPatientData();
    await getDoctorData(medicalData.doctor_address);
    setSpinner(false);
  };

  const getPatientData = async () => {
    const patientData = await patientServices.getPatientByPhone(
      params.patientId
    );
    console.log(patientData);
    setPatientWalletAddress(patientData.wallet_Address);
    setName(patientData.name);
    setEmail(patientData.email);
    setGender(patientData.gender);
    setAge(patientData.age);
    setBloodGroup(patientData.blood_group);
    setPhone(patientData.phoneNo);
    setAddress("SLRTCE");
  };

  const getDoctorData = async (doctor_address) => {
    const doctorData = await doctorServices.getDoctorBywallet(doctor_address);
    setDoctorName(doctorData.name);
    setDoctorWalletAdd(doctorData.doctor_address);
    setDoctorPhNo(doctorData.phoneNo);
    setDocEmail(doctorData.email);
  };

  useEffect(() => {
    getMedicalData();
  }, []);

  return (
    <>
      <Navigation email={params.email} />
      <div className="infoCardContainer">
        <Spinner active={spinner} />
        <div className="name">
          <h1 id="Name">{name}</h1>
        </div>
        <div className="heading">Personal Information</div>
        <div className="information">
          <div className="personalInfo">
            <div className="row">
              <InfoCard title={"Email"} value={email} />
              <InfoCard title={"Phone_No"} value={phone} />
            </div>
            <div className="row">
              <InfoCard title={"Age"} value={age} />
              <InfoCard title={"Address"} value={patientWalletAddress} />
            </div>
            <div className="row">
              <InfoCard title={"Gender"} value={gender} />
              <InfoCard title={"Blood_Group"} value={bloodGroup} />
            </div>
            <div className="row">
              <InfoCard title={"Patient Address"} value={address} />
            </div>
          </div>
        </div>
        <div className="heading">Medical Information</div>
        <div className="information">
          <div className="medicalInfo">
            <div className="row">
              <InfoCard title={"Docotor_Name"} value={doctorName} />
              <InfoCard title={"Disease"} value={disease} />
            </div>
            <div className="row">
              <InfoCard title={"Symptoms"} value={symptoms} />
              <InfoCard title={"Prescription"} value={prescription} />
            </div>
            <div className="row">
              <InfoCard title={"Doctor Address"} value={account} />
              <InfoCard title={"Doctor Phone_no."} value={doctorPhNo} />
            </div>
            <div className="row">
              <div className="info">
                <p>
                  <b>Report</b>
                </p>
                <span>
                  <a href={`https://gateway.pinata.cloud/ipfs/${report}`}>
                    Click here
                  </a>
                </span>
              </div>
              <InfoCard title={"Date"} value={date} />
            </div>
          </div>
        </div>
        <span className="last">- by MEDI-BLOCK</span>
      </div>
      <Footer />
    </>
  );
};

export default DetailInfo;
