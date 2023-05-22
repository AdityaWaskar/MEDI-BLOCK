import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import Navigation from '../navigation/Navigation'
import InfoCard from "./InfoCard";
import "./detailInfo.css";
import { hospitalABI } from "../abi";
import { useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Web3 from "web3";
import Spinner from "../spinner/Spinner";
import Footer from "../footer/Footer";

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

  useEffect(() => {
    requestAccount();
  }, []);

  // // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  // async function initializeProvider() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return new ethers.Contract(contractAddress, hospitalABI, signer);
  // }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
    return account[0];
  }

  async function getPatientAddress() {
    setSpinner(true);
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    if (params.role === "false") {
      const data = await contract.methods
        .getPatientByPhoneNo(params.patientId)
        .call(); //getting Patient Detail
      console.log(data);
      setEmail(data[5].split(",")[0]);
      setPhone(data[3]);
      setAge(data[2].split(",")[1]);
      setPatientWalletAddress(data[1]);
      setGender(data[2].split(",")[2]);
      setBloodGroup(data[5].split(",")[1]);
      setAddress(data[4]);
      setName(data[2].split(",")[0]);
    } else {
      const act = await requestAccount();
      const data = await contract.methods.GetPatient(act).call();
      setEmail(data[5].split(",")[0]);
      setPhone(data[3]);
      setAge(data[2].split(",")[1]);
      setPatientWalletAddress(data[1]);
      setGender(data[2].split(",")[2]);
      setBloodGroup(data[5].split(",")[1]);
      setAddress(data[4]);
      setName(data[2].split(",")[0]);
    }
    setSpinner(false);
  }

  const PatientInfo = async () => {
    setSpinner(true);
    // let contract = await initializeProvider();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    // const data = await contract.getMedicalInformation(getPatientAddress()); //getting Patient Detail
    // console.log(data);
    const hash = await contract.methods.tokenURI(params.id).call();
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
    const temp = await response.json();
    console.log(temp);
    setDate(temp.data);
    setDoctorPhNo(temp.doc_phoneNO);
    setDisease(temp.disease);
    setPrescription(temp.prescription);
    setReport(temp.report);
    setSymptoms(temp.symptoms);
    doctorInfo(temp.doc_phoneNO);
    setSpinner(false);
  };

  const doctorInfo = async (phone_no) => {
    // let contract = await initializeProvider();
    setSpinner(true);
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    console.log(doctorPhNo);
    console.log("dcotr p", doctorPhNo);
    let data = await contract.methods.getDoctorByPhoneNo(phone_no).call();
    console.log(data);
    setDoctorName(data[2].split(",")[0]);
    setDoctorWalletAdd(data[1]);
    setSpinner(false);
  };

  useEffect(() => {
    PatientInfo();
    getPatientAddress();
  }, []);

  return (
    <>
      <Navigation />
      <div className="infoCardContainer">
        <Spinner active={spinner} />
        <div className="name">
          {/* <span>Name:</span> */}
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
                  {/* <a href={`https://gateway.pinata.cloud/ipfs/${report}`}> */}
                  <a href={report}>Click here</a>
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
