import React, { useState, useEffect } from "react";
import "./report_form.css";
import { ethers } from "ethers";
import { hospitalABI } from "../abi.js";
import Inputbox from "./InputBox/InputBox";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { json } from "react-router";
// import { useprops } from "react-router";
import { useParams } from "react-router";
import Spinner from "../spinner/Spinner";
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

// const contractAddress = "0xAfB66611E1479dF07922aa84712631708A862807";

const genderVal = ["Select", "Male", "Female", "Other"];
const bloodGroupVal = [
  "Select",
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

const Report_form = (props) => {
  const params = useParams();
  const [patientWalletAddress, setPatientWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(genderVal[0]);
  const [age, setAge] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState(bloodGroupVal[0]);
  const [doctorName, setDoctorName] = useState("");
  const [disease, setDisease] = useState("");
  const [doc_PhoneNO, setDoc_PhoneNo] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");
  const [report, setReport] = useState();
  const [date, setDate] = useState("");
  const [spinner, setSpinner] = useState(false);

  const cleatStates = () => {
    setEmail("");
    setGender(genderVal[0]);
    setAge("");
    setPhone("");
    setAddress("");
    setBloodGroup(bloodGroupVal[0]);
    setDoctorName("");
    setDisease("");
    setDoc_PhoneNo("");
    setSymptoms("");
    setPrescription("");
    setDate("");
  };

  const validateData = (
    email,
    age,
    phoneNo,
    disease,
    symptoms,
    prescription
  ) => {
    //email
    if (
      (!email.includes("@") || email.includes("!") || email.includes("#")) &&
      (parseInt(age) < 18 || parseInt(age) > 80) &&
      phoneNo.length != 10 &&
      phoneNo.length > 0 &&
      (disease.includes("@") ||
        disease.includes("!") ||
        disease.includes("#")) &&
      (symptoms.includes("@") ||
        symptoms.includes("!") ||
        symptoms.includes("#")) &&
      prescription.length == 0 &&
      (prescription.includes("@") ||
        prescription.includes("!") ||
        prescription.includes("#"))
    ) {
      return false;
    } else {
      return true;
    }
  };
  // const handleSubmit = async () => {
  //   // get the hash value
  //   const hash = await getHash(requestAccount());
  //   // console.log(hash);
  //   // const hash = "QmaaC6QW6h9F2uCcX8Tpa2P4sDQpnkrQaWsmq2k9VWSZSD1";
  //   let contract = await initializeProvider();
  //   await contract.addMedicalHistory(hash);
  //   // const data = await contract.getMedicalInformation(
  //   //   "0xc9049059894e2Acf6A3A1ee23D2FFfE7F0499527"
  //   // );
  //   // console.log(data);
  //   // const data1 = await contract.tokenURI(4);
  //   // console.log(data1);
  //   if (
  //     !email ||
  //     gender != "Select" ||
  //     !age ||
  //     !phoneNo ||
  //     !address ||
  //     bloodGroup != "Select" ||
  //     !doctorName ||
  //     !disease ||
  //     !symptoms ||
  //     !prescription ||
  //     !report ||
  //     !date
  //   ) {
  //     console.log(
  //       email,
  //       gender,
  //       age,
  //       phoneNo,
  //       address,
  //       bloodGroup,
  //       doctorName,
  //       disease,
  //       symptoms,
  //       prescription,
  //       report,
  //       date
  //     );
  //     toast.error("Please fill out all required fields");
  //   }
  //   if (!validateData(email, age, phoneNo, disease, symptoms, prescription)) {
  //     toast.error("Invilid data");
  //   } else {
  //     console.log("success");
  //   }
  // };

  const getPatientInfo = async () => {
    // let contract = await initializeProvider();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);

    const data = await contract.methods
      .getPatientByPhoneNo(params.patientId)
      .call();
    setName(data[2].split(",")[0]);
    setEmail(data[5].split(",")[0]);
    setAge(data[2].split(",")[1]);
    setPhone(data[3]);
    setAddress(data[4]);
    setBloodGroup(data[5].split(",")[1]);
    setPatientWalletAddress(data[1]);
    setGender(data[2].split(",")[2]);
    console.log(data);
  };

  // const getPatientWalletAddress = async () => {
  //   let contract = await initializeProvider();
  //   const data = await contract.getPatientByPhoneNo(params.patientId);
  //   return data[1];
  // };

  const getDoctorInfo = async () => {
    // let contract = await initializeProvider();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    const adr = await requestAccount();
    console.log("asdfds", adr);
    const data = await contract.methods.GetDoctor(adr).call();
    setDoctorName(data[1].split(",")[0]);
    setDoc_PhoneNo(data[2]);
    console.log("dcotInfo", data);
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

  const getHash = async (doctor_address) => {
    let fileHash = await sendFileToIPFS();
    const json_data = JSON.stringify({
      doctor_address: doctor_address,
      disease: disease,
      doc_phoneNO: doc_PhoneNO,
      symptoms: symptoms,
      prescription: prescription,
      report: `https://gateway.pinata.cloud/ipfs/${fileHash}`,
      data: date,
    });
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        json_data,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
          },
        }
      );
      console.log(response.data.IpfsHash);
      return response.data.IpfsHash; // This will log the IPFS hash of the pinned JSON data
    } catch (error) {
      console.error(error);
    }
  };

  // // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  // async function initializeProvider() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return new ethers.Contract(contractAddress, hospitalABI, signer);
  // }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const _account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return _account[0];
  }

  const addReport = async () => {
    try {
      if (
        name != "" &&
        email != "" &&
        gender != "" &&
        age != "" &&
        phoneNo != "" &&
        address != "" &&
        bloodGroup != "" &&
        doctorName != "" &&
        disease != "" &&
        doc_PhoneNO != "" &&
        symptoms != "" &&
        prescription != "" &&
        date != ""
      ) {
        setSpinner(true);
        let hashValue = await getHash();
        setSpinner(true);
        console.log(hashValue);
        // let contract = await initializeProvider();
        const adr = await requestAccount();
        const contract = new web3.eth.Contract(hospitalABI, contarct_address);
        console.log(patientWalletAddress, hashValue);

        // Create the transaction object
        const txObject = {
          to: contarct_address,
          from: adr,
          // nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
          gasLimit: web3.utils.toHex(300000),
          data: contract.methods
            .addMedicalHistory(patientWalletAddress, hashValue)
            .encodeABI(),
        };

        const signedTransaction = await web3.eth.accounts.signTransaction(
          txObject,
          "0x" + private_key /* Replace with your private key */
        );
        const rawTransaction = signedTransaction.rawTransaction;
        const result = await web3.eth
          .sendSignedTransaction(rawTransaction)
          .then((res) => {
            props.setCancel(false);
            props.getAllPatientReports();
            cleatStates();
            setSpinner(false);
            toast.success("Patient Report Successfully Added!");
          }); // Send the signed transaction and wait for the result

        console.log(result);
      } else {
        toast.error("Filled valid Information");
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };
  useEffect(() => {
    // calculate the current date
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    // today = dd + "-" + mm + "-" + yyyy;
    today = yyyy + "-" + mm + "-" + dd;
    setDate(today);
    getPatientInfo();
    getDoctorInfo();
  }, []);

  return (
    <div className="report_form_container">
      <Spinner active={spinner} />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="form_title">Report</div>
      <div className="name">{name}</div>
      <hr />
      <div className="form_sub_title">Personal Information</div>
      <div className="input_group">
        <div className="row">
          <Inputbox
            title={"Email"}
            type={"text"}
            setEmail={setEmail}
            value={email}
          />
          <div className="element" id="Gender">
            <label>Gender</label>
            <select onChange={(e) => setGender(e.target.value)} value={gender}>
              {genderVal.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <Inputbox title={"Age"} type={"text"} setAge={setAge} value={age} />
          <Inputbox
            title={"Phone_No"}
            type={"text"}
            setPhone={setPhone}
            value={phoneNo}
          />
        </div>
        <div className="row">
          <Inputbox
            title={"Address"}
            type={"text"}
            setAddress={setAddress}
            value={address}
          />
          <div
            className="element"
            id="Blood_Group"
            setBloodGroup={setBloodGroup}
          >
            <label>Blood Group</label>
            <select value={bloodGroup}>
              {bloodGroupVal.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div className="form_sub_title">Medical Information</div>
      <div className="input_group">
        <div className="row">
          <Inputbox
            title={"Doctor_Name"}
            type={"text"}
            setDoctorName={setDoctorName}
            value={doctorName}
          />
          <Inputbox title={"Disease"} type={"text"} setDisease={setDisease} />
        </div>
        <div className="row">
          <Inputbox
            title={"Phone_No"}
            type={"text"}
            role="doctor"
            setDoc_PhoneNo={setDoc_PhoneNo}
            value={doc_PhoneNO}
          />
          <Inputbox
            title={"Symptoms"}
            type={"text"}
            setSymptoms={setSymptoms}
            value={symptoms}
          />
        </div>
        <div className="row">
          {/* <Inputbox
            title={"Phone_No"}
            type={"text"}
            role="doctor"
            setDoc_PhoneNo={setDoc_PhoneNo}
            value={doc_PhoneNO}
          /> */}
          <div className="element" id="prescription">
            <label>Prescription</label>
            <textarea
              rows="5"
              cols="60"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <Inputbox title={"Report"} type={"file"} setReport={setReport} />
      </div>
      <hr />
      <div className="form_sub_title">Date of Consultancy</div>
      <div className="input_group" id="date">
        {/* div */}
        <Inputbox title={"Date"} type={"date"} date={date} setDate={setDate} />
      </div>

      <div className="report_btn">
        <button
          className="cancel_btn"
          onClick={() => {
            props.setCancel(false);
            cleatStates();
          }}
        >
          Cancel
        </button>
        <button className="submit_btn" onClick={addReport}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Report_form;
