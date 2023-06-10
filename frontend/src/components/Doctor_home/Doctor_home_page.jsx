import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { ethers } from "ethers";
import { hospitalABI } from "../abi.js";
import Card from "../home/card/Card";
import "./doctor_home_page.css";
import { auth } from "../../firebase.config";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import Spinner from "../spinner/Spinner";
import { useParams } from "react-router";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPScreen from "./OTPScreen/OTPScreen";

// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
import Web3 from "web3";

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

const Doctor_home_page = () => {
  const params = useParams();
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");
  const [patientInfo, setPatientInfo] = useState([]);
  const [selectedphoneNo, setSelectedPhoneNo] = useState("");
  const [isCancle, setIsCancle] = useState(false);

  const [spinner, setSpinner] = useState(false);

  // const [showOTP, setShowOTP] = useState(false);
  const [getAccess, setGetAccess] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("");
  const [count, setCount] = useState("");

  const [allPatientWalletIds, setAllPatientWalletIds] = useState([]);
  const [allPatientPhoneNo, setAllPatientPhoneNo] = useState([]);
  const [suggestion, setSuggestions] = useState([]);

  // handle suggestion
  function handleSearchTermChange(event) {
    const term = event.target.value;
    setSearch(term);

    const data = allPatientWalletIds.concat(allPatientPhoneNo);
    console.log(data);
    if (term.length > 0) {
      const suggestions = data.filter((item) => {
        return item.startsWith(term);
      });
      setSuggestions(suggestions);
      console.log("Suggestions=>", suggestions);
    }
  }

  async function getAllPatients() {
    setSpinner(true);
    try {
      // const contract = await initializeProvider();
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods.getPatientAddress().call(); //getting All Patient Details
      setAllPatientWalletIds(data);

      let patientPhoneNo = [];
      for (let i = 0; i < data.length; i++) {
        const data2 = await contract.methods.GetPatient(data[i]).call();

        patientPhoneNo.push(data2[3]);
      }
      setAllPatientPhoneNo(patientPhoneNo);
    } catch (err) {
      console.log(err);
    }
    setSpinner(false);
  }

  // Cokkies
  const current_second = () => {
    const date = new Date();
    let _seconds =
      date.getHours() * 3600 + date.getMinutes() * 60 + +date.getSeconds(); // converting
    return _seconds;
  };

  //OTP Sent via firebase
  function onCaptchVerify() {
    setSpinner(true);
    try {
      // setSpinner();
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
    } catch (error) {
      console.log(error);
    }
    setSpinner(false);
  }

  function onSignup() {
    setSpinner(true);
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + selectedphoneNo;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // setShowOTP(true);
        setSpinner(false);
        setIsCancle(true);

        toast.success("OTP sended successfully!", {
          id: "OTPMsg",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("To many request! try it after some time.", {
          id: "OTPMsg",
        });
        setLoading(false);
        setSpinner(false);
      });
  }

  function onOTPVerify() {
    setSpinner(true);
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setGetAccess(selectedphoneNo);
        toast.success("Access Granted", {
          id: "OTPVerificationMsg",
        });
        setIsCancle(false);
        Cookies.set(selectedphoneNo, current_second() + 1800); // set cookie with a lifetime of 30 min

        setLoading(false);
      })
      .catch((err) => {
        console.log("falied");
        toast.error("Invalid OTP.", {
          id: "OTPVerificationMsg",
        });
        setLoading(false);
      });
    setSpinner(false);
  }
  // // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  // async function initializeProvider() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return new ethers.Contract(contractAddress, hospitalABI, signer);
  // }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const _account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(_account[0]);
    console.log(account);
  }

  async function getPatientDetails() {
    setSpinner(true);
    try {
      // const contract = await initializeProvider();
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      console.log(search);
      // if the length is 10 than it search the doctor details by the phone number.
      if (search.length == 10) {
        const data = await contract.methods.getPatientByPhoneNo(search).call(); //getting doctor Detail by phone no
        console.log(data);
        console.log(Number(data[0]._hex));
        setPatientInfo([data]);
        //if lenght of search is 42 than it is search doctor info by wallet address.
      } else if (search.length == 42 && search.includes("0x")) {
        const data = await contract.methods.GetPatient(search).call(); //Getting doctor Details by wallet Adress
        console.log(data);
        setPatientInfo([data]);
      }
      // if it nither phone no nor wallet Address than it throws an error
      else {
        toast.error("Invilid Input!");
      }
    } catch (error) {
      console.log(error);
    }
    setSpinner(false);
  }

  useEffect(() => {
    requestAccount();
    // storeAllPatientIdsInArray();
    setInterval(() => {
      const allCookies = Cookies.get();
      for (let a in allCookies) {
        console.log(Cookies.get(a), " == ", current_second());
        if (Cookies.get(a) < current_second()) {
          Cookies.remove(a);
        }
      }
      setCount((old) => old + 1);
    }, 5000);

    getAllPatients();
  }, []);
  // console.log(patientInfo);
  return (
    <div className="doctor_home_container">
      <Spinner active={spinner} />
      <Navigation email={params.email} />
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
            list="suggestions"
            placeholder="Search.."
            onChange={handleSearchTermChange}
          />
          <datalist id="suggestions">
            {suggestion.map((d) => (
              <option value={d} key={d} />
            ))}
          </datalist>

          <button onClick={getPatientDetails}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="patient_list">
        <center>
          <p>Patient List</p>
        </center>
        <div className="allCards">
          {/* <tbody> */}
          {/* <div>
            <th>Id</th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email Id</th>
            <th>ADD Report</th>
          </tr> */}
          {patientInfo.map((data) => (
            <Card
              setSpinner={setSpinner}
              key={Number(data[0]._hex)}
              id={parseInt(data[0]) + 1}
              name={data[2].split(",")[0]}
              email={data[5].split(",")[0]}
              phone_no={data[3].split(",")[0]}
              date={data[5].split(",")[2]}
              setSelectedPhoneNo={setSelectedPhoneNo}
              setIsCancle={setIsCancle}
              onSignup={onSignup}
              getAccess={getAccess}
              account={account}
            />
          ))}
          {/* </tbody> */}
        </div>
      </div>
    </div>
  );
};

export default Doctor_home_page;
