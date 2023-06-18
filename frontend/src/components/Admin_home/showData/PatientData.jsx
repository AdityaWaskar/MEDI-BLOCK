import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../card1/Card";
import { ethers } from "ethers";
import "./patient.css";
import toast, { Toaster } from "react-hot-toast";
import Web3 from "web3";
import Cookies from "js-cookie";

const PatientData = (props) => {
  const [account, setAccount] = useState("");
  const [search, setSearch] = useState("");
  const [allPatientInfo, setAllPatientInfo] = useState([]);
  const [allPatientWalletIds, setAllPatientWalletIds] = useState([]);
  const [allPatientPhoneNo, setAllPatientPhoneNo] = useState([]);
  const [suggestion, setSuggestions] = useState([]);
  const [fileterData, setFilterData] = useState([]);
  const [_web3, setWeb3] = useState(null);

  function handleSearchTermChange(event) {
    const search = event.target.value;
    var filteredData = allPatientInfo.filter(function (obj) {
      let data;
      !search.startsWith("0x")
        ? (data = obj.phoneNo.startsWith(search))
        : (data = obj.contract_address.startsWith(search));

      return data;
    });

    setFilterData(filteredData);
    if (search.length == 0) {
      getAllDoctorIds();
    }
  }

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
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
  }
  console.log(account);
  async function getAllDoctorIds() {
    props.setSpinner(true);
    const data = Cookies.get("patientData");
    if (!data) {
      const patientInfo = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/patient/allPatientInfo`,
        { mode: "cors" }
      );
      const response = await patientInfo.json();
      Cookies.set("patientData", JSON.stringify(response), {
        expires: 1,
      });

      setFilterData(response);
      setAllPatientInfo(response);
    } else {
      setFilterData(JSON.parse(data));
      setAllPatientInfo(JSON.parse(data));
    }

    props.setSpinner(false);
  }
  // async function getAllPatients() {
  //   props.setSpinner(true);
  //   try {
  //     // const contract = await initializeProvider();
  //     const contract = new web3.eth.Contract(hospitalABI, contarct_address);
  //     const data = await contract.methods.getPatientAddress().call(); //getting All Patient Details
  //     setAllPatientWalletIds(data);
  //     console.log("data", data);
  //     let patientInfo = [];
  //     for (let i = data.length - 1; i >= 0 && i >= data.length - 10; i--) {
  //       const data2 = await contract.methods.GetPatient(data[i]).call();
  //       console.log(data2);
  //       const data1 = [
  //         parseInt(data2[0]),
  //         data2[5].split(",")[2],
  //         data2[2].split(",")[0],
  //         data2[3],
  //         data2[5].split(",")[0],
  //       ];

  //       // patientPhoneNo.push(data2[3]);
  //       patientInfo.push(data1);
  //       // console.log(data1);
  //     }
  //     setAllPatientInfo(patientInfo);
  //     let patientPhoneNo = [];
  //     for (let i = 0; i < data.length; i++) {
  //       const data2 = await contract.methods.GetPatient(data[i]).call();
  //       patientPhoneNo.push(data2[3]);
  //     }
  //     // console.log(patientPhoneNo);
  //     setAllPatientPhoneNo(patientPhoneNo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   props.setSpinner(false);
  // }

  // async function getPatientDetailsByPhoneNo() {
  //   props.setSpinner(true);
  //   const contract = new web3.eth.Contract(hospitalABI, contarct_address);

  //   // const contract = await initializeProvider();
  //   // console.log(search);
  //   // if the length is 10 than it search the doctor details by the phone number.
  //   if (search.length == 10) {
  //     const data = await contract.methods.getPatientByPhoneNo(search).call(); //getting doctor Detail by phone no
  //     // console.log(data);
  //     setAllPatientInfo([
  //       [
  //         parseInt(data[0]),
  //         data[5].split(",")[2],
  //         data[2].split(",")[0],
  //         data[3],
  //         data[5].split(",")[0],
  //       ],
  //     ]);
  //     //if lenght of search is 42 than it is search doctor info by wallet address.
  //   } else if (search.length == 42 && search.includes("0x")) {
  //     const data = await contract.methods.GetPatient(search).call(); //Getting doctor Details by wallet Adress
  //     setAllPatientInfo([
  //       [
  //         parseInt(data[0]),
  //         data[5].split(",")[2],
  //         data[2].split(",")[0],
  //         data[3],
  //         data[5].split(",")[0],
  //       ],
  //     ]);
  //   }
  //   // if it nither phone no nor wallet Address than it throws an error
  //   else {
  //     toast.error("Invilid Input!", { id: "123" });
  //   }
  //   props.setSpinner(false);
  // }
  useEffect(() => {
    requestAccount();
    // getAllPatients();
    getAllDoctorIds();
  }, []);
  return (
    <div className="patient_data_container">
      <div className="searchbar">
        <input
          type="text"
          list="suggestions"
          placeholder="Search.."
          onChange={handleSearchTermChange}
          id="suggestion"
        />
        <datalist id="suggestions">
          {suggestion.map((d) => (
            <option value={d} key={d} />
          ))}
        </datalist>

        <button
          onClick={() => {
            // getPatientDetailsByPhoneNo();
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <table className="AllCards">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email Id</th>
          </tr>
          {allPatientInfo.map((data, id) => (
            <Card
              key={id}
              id={id + 1}
              date={data["DOR"]}
              name={data["name"]}
              phone_no={data["phoneNo"]}
              email={data["email"]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientData;
