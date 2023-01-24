import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./home.css";
import AddPatient from "./AddPatient";
import { abi } from "./ABI/abi.js";
import Card from "./card/Card";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contractAddress = '0xd8C83Bd39629b1bbBc7bAd437123edfDf7e05Ad2';

const obj = [
  [
    "Aditya Waskar", // 0 = name
    "aditya@gmail.com", // 1 = email
    "abc", // 2 = medicalHistory
    "alsdfkjalsfjls", // 3 = report_img
    "address", // 4 = address
    9082375004, // 5 = phone_no
    20, // 6 = age
    "Dr. Aditya Waskar", // 7 = doctor
    "Male", // 8 = gender
    "A+", // 9 = bloodGroup
    "17/01/2023", // 10 = date
    0, // 11 = id of patient
  ],
  [
    "Himanshu Upadhyay", // 0 = name
    "himanshu@gmail.com", // 1 = email
    "abc", // 2 = medicalHistory
    "alsdfkjalsfjls", // 3 = report_img
    "address", // 4 = address
    2035856985, // 5 = phone_no
    20, // 6 = age
    "Dr. Aditya Waskar", // 7 = doctor
    "Male", // 8 = gender
    "A+", // 9 = bloodGroup
    "13/01/2023", // 10 = date
    1, // 11 = id of patient
  ],
];

const Home = () => {
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
    <div className="homeContainer">
      <Navigation />

      <div className="addIcon">
        <img src={"/img/add.svg"} onClick={() => setAdd(true)} />
      </div>

      <div className="searchbar">
        <input
          type="text"
          placeholder="Search.."
          onChange={(e) => setSearch(e.target.value)}
          maxLength="10"
        />

        <button
          onClick={() => {
            getPatientDetailsByPhoneNo();
          }}
        >
          <Link
            to={{ pathname: `/home/${particularId}` }}
            className="link_decoration"
          >
            <i className="fa fa-search"></i>
          </Link>
        </button>
      </div>

        <table className="allCards">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Email Id</th>
            </tr>
            {obj.map((data) => (
              <Card
                key={data[11]}
                id={data[11]}
                name={data[0]}
                email={data[1]}
                medicalHistory={data[2]}
                phone_no={data[5]}
                age={data[6]}
                doctor={data[7]}
                gender={data[8]}
                img={data[3]}
              />
            ))}
            {/* {allPatientId.map(data => (

              <Card
              key = {data[11]}
              id = {data[11]}
              name = {data[0]}
              email = {data[1]}
              medicalHistory = {data[2]}
              phone_no = {data[5]}
              age = {data[6]}
              doctor = {data[7]}
              gender = {data[8]}
              img = {data[3]}
              />
              ))} */}
          </tbody>
      </table>
      {add ? (
        <AddPatient
          setName={setName}
          setAdd={setAdd}
          setEmail={setEmail}
          setPhone={setPhone}
          setAge={setAge}
          setAddress={setAddress}
          setDoctorName={setDoctorName}
          setDisease={setDisease}
          setSymptoms={setSymptoms}
          setMedicine_name={setMedicine_name}
          setReport={setReport}
          setGender={setGender}
          setDate={setDate}
          gender={gender}
          setBloodGroup={setBloodGroup}
          pushData={pushData}
          clearInputs={clearInputs}
          refresh={refresh}
          add={add}
        />
      ) : null}
    </div>
  );
};

export default Home;
