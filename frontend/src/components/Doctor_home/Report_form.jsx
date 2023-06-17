import React, { useState, useEffect } from "react";
import "./report_form.css";
import Inputbox from "./InputBox/InputBox";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Spinner from "../spinner/Spinner";
import { doctorServices, patientServices } from "../../services";

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

  const clearStates = () => {
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

  const getPatientInfo = async () => {
    const data = await patientServices.getPatientByPhone(params.patientId);

    setName(data["name"]);
    setEmail(data["email"]);
    setAge(data["age"]);
    setPhone(data["phoneNo"]);
    setAddress(data["age"]);
    setBloodGroup(data["blood_group"]);
    setPatientWalletAddress(data["wallet_Address"]);
    setGender(data["gender"]);
  };

  const getDoctorInfo = async () => {
    const doctorAdd = await requestAccount();
    const data = await doctorServices.getDoctorBywallet(doctorAdd);
    setDoctorName(data["name"]);
    setDoc_PhoneNo(data["phoneNo"]);
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

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const _account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return _account[0];
  }

  const addReport = async () => {
    setSpinner(true);

    try {
      let fileHash = await sendFileToIPFS();

      if (report) {
        const doc_address = await requestAccount();
        const jsonData = {
          patient_address: patientWalletAddress,
          doctor_address: doc_address,
          disease: disease,
          doc_phone_no: doc_PhoneNO,
          symptom: symptoms,
          prescription: prescription,
          date: date,
          image: fileHash,
        };
        patientServices.addReport(jsonData).then((res) => {
          props.setCancel(false);
          props.getAllPatientReports();
          clearStates();
          setSpinner(false);
          toast.success("Patient Report Successfully Added!");
        });
      } else {
        toast.error("Select the file!");
      }
    } catch (error) {
      setSpinner(false);
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
            clearStates();
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
