import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { ethers } from "ethers";
import { hospitalABI } from "../abi.js";
import Card from "../home/card/Card";
import "./doctor_home_page.css";
import { auth } from "../../firebase.config";
import { toast, Toaster } from "react-hot-toast";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPScreen from "./OTPScreen/OTPScreen";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const Doctor_home_page = () => {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");
  const [patientInfo, setPatientInfo] = useState([]);
  const [selectedphoneNo, setSelectedPhoneNo] = useState("");
  const [isCancle, setIsCancle] = useState(false);

  // const [showOTP, setShowOTP] = useState(false);
  const [getAccess, setGetAccess] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("");

  //OTP Sent via firebase
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + selectedphoneNo;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // setShowOTP(true);
        setIsCancle(true);
        console.log("OPT Send");
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("To many request! try it after some time.");
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setGetAccess(selectedphoneNo);
        toast.success("Access Granted");
        setLoading(false);
      })
      .catch((err) => {
        console.log("falied");
        toast.error("Invalid OTP.");
        setLoading(false);
      });
  }

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, hospitalABI, signer);
  }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function getData(id) {
    let contract = await initializeProvider();
    const data = await contract.getPatientDetails(id); //getting Patient Detail
    const data2 = await contract.getDetails2(id); //getting Patient Detail
    let obj = [
      data2[0], // 0 = name
      data2[1], // 1 = email
      data2[2], // 2 = medicalHistory
      data2[3], // 3 = report_img
      data2[4], // 4 = address
      parseInt(data[1]._hex), // 5 = phone_no
      parseInt(data[2]._hex), // 6 = age
      data[3], // 7 = doctor
      data[4], // 8 = gender
      data[5], // 9 = bloodGroup
      data[6], // 10 = date
      id, // 11 = id of patient
    ];
    return obj;
  }

  async function getDoctorData() {
    let contract = await initializeProvider();
    const data = await contract.getDoctorInfoByPhoneNo(45); //getting Patient Detail
    console.log(data);
  }
  // getDoctorData();

  async function getPatientDetails() {
    try {
      const contract = await initializeProvider();
      console.log(search);
      // if the length is 10 than it search the doctor details by the phone number.
      if (search.length == 10) {
        const data = await contract.getDoctorByPhoneNo(search); //getting doctor Detail by phone no
        setPatientInfo([data]);
        //if lenght of search is 42 than it is search doctor info by wallet address.
      } else if (search.length == 42 && search.includes("0x")) {
        const data = await contract.GetDoctor(search); //Getting doctor Details by wallet Adress
        setPatientInfo([data]);
      }
      // if it nither phone no nor wallet Address than it throws an error
      else {
        toast.error("Invilid Input!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const data = [
    [1, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563551"],
    [2, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563552"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563553"],
  ];

  useEffect(() => {
    requestAccount();
    // storeAllPatientIdsInArray();
  }, []);
  return (
    <div className="doctor_home_container">
      <Navigation />
      <div id="recaptcha-container"></div>
      <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
      {isCancle ? (
        <OTPScreen
          otp={otp}
          setOtp={setOtp}
          onOTPVerify={onOTPVerify}
          setIsCancle={setIsCancle}
        />
      ) : null}
      <div className="searchbarContainer">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value == 0) {
                // getAllDoctorIds();
              }
            }}
          />

          <button onClick={getPatientDetails}>
            {/* <Link to={{ pathname: `/home` }} className="link_decoration"> */}
            <i className="fa fa-search"></i>
            {/* </Link> */}
          </button>
        </div>
      </div>
      <div className="patient_list">
        <center>
          <p>Patient List</p>
        </center>
        <table className="allCards">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Email Id</th>
              <th>ADD Report</th>
            </tr>
            {data.map((data) => (
              <Card
                key={data[0]}
                id={data[0]}
                name={data[1]}
                email={data[2]}
                phone_no={data[4]}
                date={data[3]}
                setSelectedPhoneNo={setSelectedPhoneNo}
                setIsCancle={setIsCancle}
                onSignup={onSignup}
                getAccess={getAccess}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctor_home_page;
