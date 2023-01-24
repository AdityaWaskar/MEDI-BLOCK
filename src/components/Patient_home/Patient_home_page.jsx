import React, { useState, useEffect } from "react";
import "./patient_home_page.css";
import { ethers } from "ethers";
import Footer from "../footer/Footer";
import axios from "axios";
import Report_card from "./card/Report_card";
import { abi } from "../home/ABI/abi";
import Navigation from "../navigation/Navigation";
import { Link, useParams } from "react-router-dom";
import Filter from "./Filter";
import { BsFillShareFill } from "react-icons/bs";
import { MdNoteAdd } from "react-icons/md";
import Report_form from "../Doctor_home/Report_form";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const data = [
  "02/04/2001",
  "02/04/2003",
  "02/04/2003",
  "02/04/2003",
  "02/04/2003",
  "02/04/2003",
  "02/04/2003",
  "02/04/2003",
  "02/04/2002",
];

const Patient_home_page = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [disease, setDisease] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicine_name, setMedicine_name] = useState("");
  const [report, setReport] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [date, setDate] = useState("");
  const [account, setAccount] = useState();
  const [allPatientId, setAllPatientId] = useState([]);
  const [particularId, setParticularId] = useState(null);

  const [search, setSearch] = useState("");

  const [refresh, setRefresh] = useState(false);
  const [add, setAdd] = useState(false);

  const [cancel, setCancel] = useState(false); //use of diplaying forms

  useEffect(() => {
    requestAccount();
    storeAllPatientIdsInArray();
  }, []);

  function clearInputs() {
    setName("");
    setEmail("");
    setPhone(0);
    setAge(0);
    setDoctorName("");
    setAddress("");
    setDisease("");
    setSymptoms("");
    setMedicine_name("");
    setReport("");
    setGender("");
    setBloodGroup("");
  }

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

  // data push to the blockchain
  async function pushData() {
    if (
      name === "" &&
      email === "" &&
      phone === 0 &&
      age === 0 &&
      address === "" &&
      doctorName === "" &&
      disease === "" &&
      symptoms === "" &&
      medicine_name === "" &&
      report === "" &&
      gender === "" &&
      bloodGroup === ""
    ) {
      alert("All field must be filled");
      setAdd(true);
    } else if (phone.toString().length != 10) {
      console.log(phone.toString().length);
      alert("Invalid Phone number.");
      setAdd(true);
    } else if (!email.includes("@")) {
      alert("Invalid Email.");
      setAdd(true);
    } else {
      let reportHashValue = await sendFileToIPFS();
      let contract = await initializeProvider();
      await contract.addPatientDetails(
        name,
        email,
        `med:${medicine_name},Disease:${disease},symp:${symptoms}`,
        reportHashValue,
        doctorName,
        address,
        phone,
        age,
        gender,
        bloodGroup,
        date
      );
      console.log(`Data is added to the blockchain.`);
      setRefresh(true);
      setAdd(false);
      clearInputs();
    }
  }
  //  fetch the data from the database
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

  async function getPatientDetailsByPhoneNo() {
    try {
      let contract = await initializeProvider();
      let data = await contract.getPatientDetailsByPhoneNo(parseInt(search));
      setParticularId(parseInt(data));
      return parseInt(data);
    } catch (error) {}
  }
  getPatientDetailsByPhoneNo();

  async function getAllPatientIds() {
    let contract = await initializeProvider();
    let data = await contract.getAllPatientIds();
    let d = [];
    for (let i = 0; i < data.length; i++) {
      d[i] = parseInt(data[i]);
    }
    return d;
  }
  // getAllPatientIds()
  const storeAllPatientIdsInArray = async () => {
    let id_data = [];
    let ids = await getAllPatientIds();
    for (let i = 0; i < ids.length; i++) {
      let id = await getData(ids[i]);
      id_data[i] = id;
    }
    setAllPatientId(id_data);
  };

  // file is uploaded to the IPFS System and get the HASH value
  const sendFileToIPFS = async (e) => {
    if (report) {
      try {
        const formData = new FormData();
        formData.append("file", report);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(resFile.data.IpfsHash);
        console.log(ImgHash);
        return resFile.data.IpfsHash;
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  return (
    <div className="patient_home_page_container">
      <Navigation />
      <Filter />
      <div className="reports">
        {data.map((r) => (
          <Report_card key={r} date={r} />
        ))}
      </div>
      <div className="share_btn">
        {console.log(params.role)}
        {params.role == "true" ? (
          // console.log("role")
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

      {cancel ? <Report_form cancel={cancel} setCancel={setCancel} /> : null}

      <Footer />
    </div>
  );
};

export default Patient_home_page;
