import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import { ethers } from "ethers";
import "./patient.css";
import { hospitalABI } from "../../abi";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PatientData = () => {
  const [account, setAccount] = useState("");
  const [allPatientInfo, setAllPatientInfo] = useState([]);

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
    const contract = await initializeProvider();
    const data = await contract.GetAllPatients(); //getting All Patient Details
    console.log(data);
    let patientInfo = [];
    for (let i = data.length - 1; i >= 0 && i >= data.length - 10; i--) {
      const data1 = [
        parseInt(data[0][1]),
        data[1][i],
        data[2][i],
        data[3][i],
        data[4][i],
      ];
      patientInfo.push(data1);
      console.log(data1);
    }
    setAllPatientInfo(patientInfo);
    console.log(allPatientInfo);
    // return patientInfo;
  }
  console.log(allPatientInfo);
  useEffect(() => {
    requestAccount();
    getAllPatients();
  }, []);
  return (
    <div className="patient_data_container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search.."
          //   onChange={(e) => setSearch(e.target.value)}
          maxLength="10"
        />

        <button
        //   onClick={() => {
        //     getPatientDetailsByPhoneNo();
        //   }}
        >
          <Link to={{ pathname: `/home` }} className="link_decoration">
            <i className="fa fa-search"></i>
          </Link>
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
              key={0}
              id={0}
              name={data[1]}
              email={data[2]}
              medicalHistory={"aditya"}
              phone_no={data[3]}
              age={85}
              doctor={"name"}
              gender={"male"}
              img={"adffadf"}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientData;
