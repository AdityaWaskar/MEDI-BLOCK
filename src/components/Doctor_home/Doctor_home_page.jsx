import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { ethers } from "ethers";
import Footer from "../footer/Footer";
import { abi } from "./doctor_info_abi";
import Card from "../home/card/Card";
import "./doctor_home_page.css";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// const abi = [
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
const Doctor_home_page = () => {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");

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
  console.log("account address = " + account);

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

  async function getPatientDetailsByPhoneNo() {
    try {
      let contract = await initializeProvider();
      let data = await contract.getDoctorInfoByPhoneNo(parseInt(search));
      // setParticularId(parseInt(data));
      // return parseInt(data);
    } catch (error) {}
  }

  const data = [
    [1, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [2, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
    [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  ];

  useEffect(() => {
    requestAccount();
    // storeAllPatientIdsInArray();
  }, []);
  return (
    <div className="doctor_home_container">
      <Navigation />
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
            </tr>
            {data.map((data) => (
              <Card
                key={data[0]}
                id={data[0]}
                name={data[1]}
                email={data[2]}
                phone_no={data[4]}
                date={data[3]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctor_home_page;
