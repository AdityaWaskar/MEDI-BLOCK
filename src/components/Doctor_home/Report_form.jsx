import React, { useState, useEffect } from "react";
import "./report_form.css";

import { hospitalABI } from "../abi.js";
import Inputbox from "./InputBox/InputBox";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { initializeProvider, requestAccount } from "../contract.js";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const genderVal = ["Male", "Female", "Other"];
const bloodGroupVal = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Report_form = (params) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [doctorName, setDoctorName] = useState("");
  const [disease, setDisease] = useState("");
  const [doc_PhoneNO, setDoc_PhoneNo] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");
  const [date, setDate] = useState("");
  const [account, setAccount] = useState(null);
  const [initialize_Provider, setInitiallize_Provide] = useState("");

  const cleatStates = () => {
    setEmail("");
    setGender("Male");
    setAge("");
    setPhone("");
    setAddress("");
    setBloodGroup("");
    setDoctorName("");
    setDisease("");
    setDoc_PhoneNo("");
    setSymptoms("");
    setPrescription("");
    setDate("");
  };

  const handleSubmit = () => {
    console.log(
      `
      ${name},
      ${email},
      ${gender},
      ${age},
      ${phoneNo},
      ${address},
      ${bloodGroup},
      ${doctorName},
      ${disease},
      ${doc_PhoneNO},
      ${symptoms},
      ${prescription},
      ${date},
      
      `
    );
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

  const getHash = async () => {
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

  const addReport = async () => {
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
      let hashValue = getHash();
      let contract = await initialize_Provider();
      await contract.addMedicalHistory(doctor_address, hashValue);
    } else {
      console.log("filled valid Information");
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

    // initializeProvider()
    requestAccount().then((res) => setAccount(res));
    initializeProvider(contractAddress, hospitalABI).then((res) =>
      setInitiallize_Provide(res)
    );
  }, []);

  return (
    <div className="report_form_container">
      <div className="form_title">Report</div>
      <div className="name">Aditya Prakash Waskar</div>
      <hr />
      <div className="form_sub_title">Personal Information</div>
      <div className="input_group">
        <div className="row">
          <Inputbox title={"Email"} type={"text"} setEmail={setEmail} />
          <div className="element" id="Gender">
            <label>Gender</label>
            <select onChange={(e) => setGender(e.target.value)}>
              {genderVal.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <Inputbox title={"Age"} type={"text"} setAge={setAge} />
          <Inputbox title={"Phone_No"} type={"text"} setPhone={setPhone} />
        </div>
        <div className="row">
          <Inputbox title={"Address"} type={"text"} setAddress={setAddress} />
          <div
            className="element"
            id="Blood_Group"
            setBloodGroup={setBloodGroup}
          >
            <label>Blood Group</label>
            <select>
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
          />
          <Inputbox title={"Disease"} type={"text"} setDisease={setDisease} />
        </div>
        <div className="row">
          <Inputbox
            title={"Phone_No"}
            type={"text"}
            role="doctor"
            setDoc_PhoneNo={setDoc_PhoneNo}
          />
          <Inputbox
            title={"Symptoms"}
            type={"text"}
            setSymptoms={setSymptoms}
          />
        </div>
        <Inputbox title={"Report"} type={"file"} />
      </div>
      <hr />
      <div className="form_sub_title">Date of Consultancy</div>
      <div className="input_group">
        <Inputbox title={"Date"} type={"date"} date={date} setDate={setDate} />
      </div>

      <div className="report_btn">
        <button
          className="cancel_btn"
          onClick={() => {
            params.setCancel(false);
            cleatStates();
          }}
        >
          Cancel
        </button>
        <button className="submit_btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Report_form;
