import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "./doctor_data.css";
import Card from "../card/Card";
import { abi } from "../../Doctor_home/doctor_info_abi";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "_name",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "_age",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "_doc_address",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "_phone_no",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "_gender",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "_qualification",
//         type: "string",
//       },
//     ],
//     name: "addDoctor",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "doctorCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "_phoneNo",
//         type: "string",
//       },
//     ],
//     name: "getDoctorIdByPhoneNo",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "",
//         type: "uint256[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "_phoneNo",
//         type: "string",
//       },
//     ],
//     name: "getDoctorInfoByPhoneNo",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "",
//         type: "uint256[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
const Doctor_data = () => {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");
  const [doctorIds, setDoctorIds] = useState([]);

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function getwDoctorData() {
    const contract = await initializeProvider();
    const data = await contract.getDoctorInfoByPhoneNo("45"); //getting Patient Detail
    const data2 = await contract.doctorCount; //getting Patient Detail
    console.log(data);
  }

  async function getAllDoctorIds() {
    const contract = await initializeProvider();
    const data = await contract.getdoctorIds();
    setDoctorIds(data);
  }

  useEffect(() => {
    requestAccount();
    getAllDoctorIds();
  }, []);
  return (
    <div className="doctor_data_container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search.."
          onChange={(e) => setSearch(e.target.value)}
          maxLength="10"
        />

        <button
          onClick={() => {
            // getPatientDetailsByPhoneNo();
          }}
        >
          {/* <Link to={{ pathname: `/` }} className="link_decoration"> */}
          <i className="fa fa-search"></i>
          {/* </Link> */}
        </button>
      </div>
      <table className="AllCards">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Specialization</th>
          </tr>
          {doctorIds.map((data) => (
            <Card
              key={data}
              id={parseInt(data)}
              name={"Aditya"}
              email={"Orthopedics"}
              phone_no={"9082356225"}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor_data;
