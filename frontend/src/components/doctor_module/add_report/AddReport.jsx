import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import "./addReport.css";
import { auth } from "../../../firebase.config";
import { useParams } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import { patientServices } from "../../../services";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPScreen from "./OTPScreen/OTPScreen";
import Cookies from "js-cookie";
import Spinner from "../../spinner/Spinner";

const AddReport = () => {
  const params = useParams();
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [selectedphoneNo, setSelectedPhoneNo] = useState("");
  const [isCancle, setIsCancle] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [getAccess, setGetAccess] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("");
  const [count, setCount] = useState("");

  function handleSearchTermChange(e) {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setPatientInfo(null);
    }
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
      // if the length is 10 than it search the doctor details by the phone number.
      if (search.length == 10) {
        const data = await patientServices.getPatientByPhone(search);
        setPatientInfo(data);

        //if lenght of search is 42 than it is search doctor info by wallet address.
      } else if (search.length == 42 && search.includes("0x")) {
        const data = await patientServices.getpatientByWallet(search);
        setPatientInfo(data);
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
  }, []);
  return (
    <div className="doctor_home_container">
      <Spinner active={spinner} />
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
            onChange={handleSearchTermChange}
          />

          <button onClick={getPatientDetails}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="patient_list">
        {/* <center>
          <p>Patient List</p>
        </center> */}
        <div className="allCards">
          {patientInfo !== null && (
            <Card
              setSpinner={setSpinner}
              id={patientInfo["phoneNo"]}
              name={patientInfo["name"]}
              email={patientInfo["email"]}
              phone_no={patientInfo["phoneNo"]}
              date={patientInfo["DOR"]}
              setSelectedPhoneNo={setSelectedPhoneNo}
              setIsCancle={setIsCancle}
              onSignup={onSignup}
              getAccess={getAccess}
              account={account}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReport;
