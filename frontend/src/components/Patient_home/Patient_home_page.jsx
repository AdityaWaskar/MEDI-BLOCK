import React, { useState, useEffect } from "react";
import "./patient_home_page.css";
import { ethers } from "ethers";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import Report_card from "./card/Report_card";
// import { abi } from "../home/ABI/abi";
import { hospitalABI } from "../abi";
import Navigation from "../navigation/Navigation";
import { json, Link, useParams } from "react-router-dom";
import Filter from "./Filter";
import { BsFillShareFill } from "react-icons/bs";
import { MdNoteAdd } from "react-icons/md";
import Report_form from "../Doctor_home/Report_form";
import Spinner from "../spinner/Spinner";
import { toast, Toaster } from "react-hot-toast";
import Web3 from "web3";

// const web3 = new Web3(process.env.REACT_APP_INFURA_HTTPURL);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  )
);
const private_key = process.env.REACT_APP_WALLET_PRIVATE_ADDRESS;
const contarct_address = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contarct_address = "0x444FcD545168031c8C9ec0db8F4dd2349b2b64ac";

const account1 = web3.eth.accounts.privateKeyToAccount("0x" + private_key);
const a = web3.eth.accounts.wallet.add(account1);

let i = 0;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contractAddress = "0xAfB66611E1479dF07922aa84712631708A862807";

const Patient_home_page = () => {
  const params = useParams();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState(0);
  // const [age, setAge] = useState(0);
  // const [address, setAddress] = useState("");
  // const [doctorName, setDoctorName] = useState("");
  // const [disease, setDisease] = useState("");
  // const [symptoms, setSymptoms] = useState("");
  // const [medicine_name, setMedicine_name] = useState("");
  // const [gender, setGender] = useState("Male");
  // const [bloodGroup, setBloodGroup] = useState("A+");
  // const [date, setDate] = useState("");
  // const [account, setAccount] = useState();
  // const [particularId, setParticularId] = useState(null);
  // const [search, setSearch] = useState("");

  // const [refresh, setRefresh] = useState(false);
  // const [add, setAdd] = useState(false);
  const [report, setReport] = useState("");
  const [allPatientId, setAllPatientId] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [lowerLimit, setLowerLimit] = useState("2023-01-02");
  const [higherLimit, setHigherLimit] = useState("2023-04-03");
  // console.log(lowerLimit, higherLimit);
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
  // if(Cookies.get(""))

  // function clearInputs() {
  //   setName("");
  //   setEmail("");
  //   setPhone(0);
  //   setAge(0);
  //   setDoctorName("");
  //   setAddress("");
  //   setDisease("");
  //   setSymptoms("");
  //   setMedicine_name("");
  //   setReport("");
  //   setGender("");
  //   setBloodGroup("");
  // }

  // // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
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
    return account[0];
  }

  const getAllPatientReports = async () => {
    setSpinner(true);
    // let contract = await initializeProvider();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    const data1 = await contract.methods
      .getPatientByPhoneNo(params.patientId)
      .call();
    console.log("1->", data1);
    const data = await contract.methods.getMedicalInformation(data1[1]).call();
    let patientInfo = [];
    let i = 0;
    console.log(data, "sd");

    try {
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
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  };

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

  useEffect(() => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    // today = dd + "-" + mm + "-" + yyyy;
    today = yyyy + "-" + mm + "-" + dd;
    setHigherLimit(today);

    console.log(params.role);
    if (params.role === "false") {
      console.log("Test1");
      getAllPatientReports();
    } else {
      getAllPatientReports2();
    }
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
        <Navigation email={null} />
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