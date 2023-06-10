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
import Report_form from "../Doctor_home/Report_form";
import Spinner from "../spinner/Spinner";
import { toast, Toaster } from "react-hot-toast";
import Web3 from "web3";

let i = 0;

const Patient_home_page = () => {
  const params = useParams();
  const [allPatientId, setAllPatientId] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [lowerLimit, setLowerLimit] = useState("2023-01-02");
  const [higherLimit, setHigherLimit] = useState("2023-04-03");
  const [cancel, setCancel] = useState(false); //use of diplaying forms
  const [count, setCount] = useState(0);

  const current_second = () => {
    const date = new Date();
    let _seconds =
      date.getHours() * 3600 + date.getMinutes() * 60 + +date.getSeconds(); // converting
    return _seconds;
  };

  function filterData() {
    return allPatientId.filter(
      (item) => item[1] >= lowerLimit && item[1] <= higherLimit
    );
  }

  const AccessOrNot = (number) => {
    console.log(Cookies.get(params.patientId));
    return Cookies.get(params.patientId);
  };

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account[0];
  }

  const getAllPatientReports = async () => {
    // let contract = await initializeProvider();
    /*
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    const data1 = await contract.methods
    .getPatientByPhoneNo(params.patientId)
    .call();
    console.log("1->", data1);
    const data = await contract.methods.getMedicalInformation(data1[1]).call();
    let patientInfo = [];
    let i = 0;
    console.log(data, "sd");
  
    */
    try {
      /*
      const fetchPromises = data.map(async (val) => {
        console.log("jex", parseInt(val), parseInt(val._hex));
        const hash = await contract.methods.tokenURI(parseInt(val)).call();
        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${hash}`,
          { mode: "cors" }
          );
          const temp = await response.json();
          console.log("temp->", temp);
          return [parseInt(val), temp.data];
        });
        const result = await Promise.all(fetchPromises);
        setAllPatientId(result);
        console.log(result, "sd");
        */
      setSpinner(true);

      let patient_wallet_add;
      if (params.role == false) {
        let patientData = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/patient/phone_No=${params.patientId}`,
          { mode: "cors" }
        );
        patientData = await patientData.json();
        patientReports = await patientReports.json();
        patient_wallet_add = patientData["2"];
      } else {
        patient_wallet_add = await requestAccount();
      }
      let patientReports = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/patient/reports/${patient_wallet_add}`
      );
      setAllPatientId(patientReports);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  };
  /*
  const getAllPatientReports2 = async () => {
    setSpinner(true);
    // let contract = await initializeProvider();
    const adr = await requestAccount();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    const data = await contract.methods.getMedicalInformation(adr).call();
    let patientInfo = [];
    let i = 0;
    console.log(data, "sd");

    const fetchPromises = data.map(async (val) => {
      const hash = await contract.methods.tokenURI(parseInt(val)).call();
      const response = await fetch(
        `https://gateway.pinata.cloud/ipfs/${hash}`,
        { mode: "cors" }
      );
      const temp = await response.json();
      console.log(temp);
      return [parseInt(val), temp.data];
    });
    const result = await Promise.all(fetchPromises);
    setAllPatientId(result);
    console.log(result, "sd");
    setSpinner(false);
  };
 */

  useEffect(() => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    // today = dd + "-" + mm + "-" + yyyy;
    today = yyyy + "-" + mm + "-" + dd;
    setHigherLimit(today);
    getAllPatientReports();

    /*
    console.log(params.role);
    if (params.role === "false") {
      console.log("Test1");
      getAllPatientReports();
    } else {
      getAllPatientReports2();
    }
    */
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

  if (AccessOrNot() === undefined && params.role === "false") {
    return <div>NOT Access</div>;
  } else {
    return (
      <div className="patient_home_page_container">
        <Toaster position="bottom-center" reverseOrder={false} />
        <Spinner active={spinner} />
        <Navigation email={params.email} />
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
          {console.log(params.role)}
          {params.role == "true" ? (
            <>
              <BsFillShareFill onClick={() => console.log("aditya")} />
              <span className="msg">Share your details</span>
            </>
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
