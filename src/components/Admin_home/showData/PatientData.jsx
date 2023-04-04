import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import { ethers } from "ethers";
import "./patient.css";
import { hospitalABI } from "../../abi";
import toast, { Toaster } from "react-hot-toast";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PatientData = (props) => {
  const [account, setAccount] = useState("");
  const [search, setSearch] = useState("");
  const [allPatientInfo, setAllPatientInfo] = useState([]);
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
  console.log(account);

  async function getAllPatients() {
    props.setSpinner(true);
    try {
      const contract = await initializeProvider();
      const data = await contract.getPatientAddress(); //getting All Patient Details
      setAllPatientWalletIds(data);
      console.log("data", data);
      let patientInfo = [];
      for (let i = data.length - 1; i >= 0 && i >= data.length - 10; i--) {
        const data2 = await contract.GetPatient(data[i]);
        console.log(data2);
        const data1 = [
          parseInt(data2[0]),
          data2[5].split(",")[2],
          data2[2].split(",")[0],
          data2[3],
          data2[5].split(",")[0],
        ];

        patientPhoneNo.push(data2[3]);
        patientInfo.push(data1);
        // console.log(data1);
      }
      let patientPhoneNo = [];
      for (let i = 0; i < data.length; i++) {
        const data2 = await contract.GetPatient(data[i]);
        patientPhoneNo.push(data2[3]);
      }
      // console.log(patientPhoneNo);
      setAllPatientPhoneNo(patientPhoneNo);
      setAllPatientInfo(patientInfo);
    } catch (error) {
      console.log(error);
    }
    props.setSpinner(false);
  }

  async function getPatientDetailsByPhoneNo() {
    props.setSpinner(true);
    const contract = await initializeProvider();
    // console.log(search);
    // if the length is 10 than it search the doctor details by the phone number.
    if (search.length == 10) {
      const data = await contract.getPatientByPhoneNo(search); //getting doctor Detail by phone no
      // console.log(data);
      setAllPatientInfo([
        [
          parseInt(data[0]),
          data[5].split(",")[2],
          data[2].split(",")[0],
          data[3],
          data[5].split(",")[0],
        ],
      ]);
      //if lenght of search is 42 than it is search doctor info by wallet address.
    } else if (search.length == 42 && search.includes("0x")) {
      const data = await contract.GetPatient(search); //Getting doctor Details by wallet Adress
      setAllPatientInfo([
        [
          parseInt(data[0]),
          data[5].split(",")[2],
          data[2].split(",")[0],
          data[3],
          data[5].split(",")[0],
        ],
      ]);
    }
    // if it nither phone no nor wallet Address than it throws an error
    else {
      toast.error("Invilid Input!", { id: "123" });
    }
    props.setSpinner(false);
  }
  useEffect(() => {
    requestAccount();
    getAllPatients();
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
            getPatientDetailsByPhoneNo();
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
          {allPatientInfo.map((data) => (
            <Card
              key={data[0] + 1}
              id={data[0] + 1}
              data={data[1]}
              name={data[2]}
              phone_no={data[3]}
              email={data[4]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientData;
