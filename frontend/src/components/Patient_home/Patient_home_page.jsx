import React, { useState, useEffect } from "react";
import "./patient_home_page.css";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import Report_card from "./card/Report_card";
import Navigation from "../navigation/Navigation";
import { useParams } from "react-router-dom";
import Filter from "./Filter";
import { BsFillShareFill } from "react-icons/bs";
import { MdNoteAdd } from "react-icons/md";
import Report_form from "../Report_Form/Report_form";
import Spinner from "../spinner/Spinner";
import { toast, Toaster } from "react-hot-toast";
import { doctorServices, patientServices } from "../../services";

let i = 0;

const Patient_home_page = () => {
  const params = useParams();
  const [allPatientId, setAllPatientId] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [lowerLimit, setLowerLimit] = useState("2023-01-02");
  const [higherLimit, setHigherLimit] = useState("2023-04-03");
  const [cancel, setCancel] = useState(false); //use of diplaying forms
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [patientInfo, setPaientInfo] = useState();

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

  const getPatientData = async () => {
    const account = await requestAccount();
    const data = Cookies.get(account);
    if (!data) {
      const doctorInfo = await patientServices.getpatientByWallet(account);
      setPaientInfo(doctorInfo);
      console.log("fafdas" + doctorInfo);
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000); // Set expiration to 15 minutes from now
      Cookies.set(account, JSON.stringify(doctorInfo), {
        expires: expirationDate,
        path: "/patient_page",
      });
    } else {
      setPaientInfo(JSON.parse(data));
    }
  };

  const current_second = () => {
    const date = new Date();
    let _seconds =
      date.getHours() * 3600 + date.getMinutes() * 60 + +date.getSeconds(); // converting
    return _seconds;
  };

  function filterData() {
    return allPatientId?.filter(
      (item) => item[1] >= lowerLimit && item[1] <= higherLimit
    );
  }

  const AccessOrNot = (number) => {
    console.log(Cookies.get(params.patientId));
    return Cookies.get(params.patientId);
  };

  async function getEmail() {
    const address = await requestAccount();
    if (params.role === "true") {
      const data = await patientServices.getpatientByWallet(address);
      setEmail(data.email);
    } else {
      const data = await doctorServices.getDoctorBywallet(address);
      setEmail(data.email);
    }
  }

  const getAllPatientReports = async () => {
    try {
      setSpinner(true);

      let patient_wallet_add;
      if (params.role === "false") {
        const patientData = await patientServices.fetchData(
          `phoneNo=${params.patientId}`
        );
        patient_wallet_add = patientData["2"];
      } else {
        patient_wallet_add = await requestAccount();
      }
      const patientReports = await patientServices.getPatientReports(
        patient_wallet_add
      );
      setAllPatientId(patientReports);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  };

  useEffect(() => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    // today = dd + "-" + mm + "-" + yyyy;
    today = yyyy + "-" + mm + "-" + dd;
    setHigherLimit(today);
    getAllPatientReports();
    getEmail();
    getPatientData();
  }, []);

  useEffect(() => {
    if (params.role === "false") {
      setInterval(() => {
        if (Cookies.get(params.patientId) == current_second()) {
          Cookies.remove(params.patientId);
        }
        setCount((old) => old + 1);
      }, 5000);
    }
  }, []);

  if (!AccessOrNot() === undefined && params.role === "false") {
    return <div>NOT Access</div>;
  } else {
    return (
      <div className="patient_home_page_container">
        <Toaster position="bottom-center" reverseOrder={false} />
        <Spinner active={spinner} />
        <Navigation email={email} />
        <Filter
          setHigherLimit={setHigherLimit}
          setLowerLimit={setLowerLimit}
          lowerLimit={lowerLimit}
          higherLimit={higherLimit}
        />
        {filterData().length === 0 ? (
          <div className="emptymsg">No Data Available</div>
        ) : (
          <div className="reports">
            {filterData().map((r) => (
              <Report_card key={i++} date={r[1]} tokenId={r[0]} />
            ))}
          </div>
        )}
        <div className="share_btn">
          {params.role == "true" ? (
            // <>
            //   <BsFillShareFill onClick={() => console.log("aditya")} />
            //   <span className="msg">Share your details</span>
            // </>
            null
          ) : (
            <>
              <MdNoteAdd />
              <span className="msg" onClick={() => setCancel(true)}>
                Add Patient Report
              </span>
            </>
          )}
        </div>

        {cancel ? (
          <Report_form
            cancel={cancel}
            setCancel={setCancel}
            getAllPatientReports={getAllPatientReports}
          />
        ) : null}

        <Footer />
      </div>
    );
  }
};

export default Patient_home_page;
