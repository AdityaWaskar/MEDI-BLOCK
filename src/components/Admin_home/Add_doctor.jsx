import React from "react";
import { useState, useEffect } from "react";
import "./add_doctor.css";
import { ethers } from "ethers";
import { abi } from "../Doctor_home/doctor_info_abi";
import InputBox from "./InputBox";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

var today;

const Add_doctor = () => {
  const [addDoctorForm, setAddDoctorForm] = useState(false);
  const [cancelBtnFlag, setCancelBtnFlag] = useState(true);
  const [otherOption, setOtherOption] = useState(false);
  const [otherOption1, setOtherOption1] = useState(false);

  const [account, setAccount] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("");
  const [d_degree, setD_degree] = useState("");
  const [email, setEmail] = useState("");
  const [DOR, setDOR] = useState("");

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

  function clearStates() {
    setContractAddress(null);
    setName(null);
    setAge(null);
    setGender(null);
    setPhoneNo(null);
    setQualification(null);
    setD_degree(null);
    setEmail(null);
    setDOR(null);
  }

  async function pushDocData() {
    if (
      contractAddress == "" ||
      name == "" ||
      age == "" ||
      email == "" ||
      phoneNo == "" ||
      gender == "" ||
      qualification == "" ||
      d_degree == "" ||
      DOR == ""
    ) {
      alert("Plz filled correct information.");
    } else {
      const contract = await initializeProvider();
      await contract.addDoctor(
        contractAddress,
        `${name},${age},${gender}`,
        phoneNo,
        `${qualification}, ${d_degree}`,
        email,
        DOR
      );
      clearStates();

      // const data = [
      //   contractAddress,
      //   `${name},${age},${gender}`,
      //   phoneNo,
      //   `${qualification},${d_degree}`,
      //   email,
      //   DOR,
      // ];
      // console.log(data);
    }
  }

  useEffect(() => {
    requestAccount();
    console.log("account no" + account);

    // Date Limit till today (can't enter the tomorrow's date)
    today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
  }, []);

  const cancel_btn = (value) => {
    setCancelBtnFlag(value);
    console.log(cancelBtnFlag);
  };

  const Specialization = [
    "select",
    "Orthopedics",
    "Obstetrics and Gynecology",
    "Dermatology",
    "Pediatrics",
    "Radiology",
    "General Surgery",
    "Ophthalmology",
    "Family Medicine",
    "Chest Medicine",
    "Anesthesia",
    "Pathology",
    "ENT",
    "other",
  ];

  const degree = [
    "select",
    "MBBS",
    "MS",
    "MD",
    "BAMS",
    "BPT",
    "B.VSc",
    "BUMS",
    "BSMS",
    "other",
  ];
  return (
    <section className="add_doctor_container">
      <button className="add_doctor_button">Add Doctor</button>
      <div className="add_doctor_image">
        <img src="img/add_doctor_image.svg" alt="" />
      </div>
      <div className="buttons">
        <img
          className={
            cancelBtnFlag == true ? "add_button add_form_active" : "add_button"
          }
          onClick={() => {
            setAddDoctorForm(true);
            cancel_btn(false);
          }}
          src="img/add_symbol.svg"
        />
      </div>

      <div
        className={
          cancelBtnFlag ? "add_doctor_form doctor_active" : "add_doctor_form"
        }
      >
        <InputBox
          title={"Id"}
          type={"text"}
          setContractAddress={setContractAddress}
        />
        <div className="row">
          <InputBox title={"Name"} type={"text"} setName={setName} />
          <InputBox title={"Age"} type={"number"} setAge={setAge} />
        </div>
        <div className="row">
          <InputBox title={"Email"} type={"text"} setEmail={setEmail} />
          <InputBox title={"Phone_No"} type={"text"} setPhoneNo={setPhoneNo} />
        </div>
        <div className="doctor_form_element" id="Gender">
          <label>Gender</label>
          <div
            className="gender_option"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <div className="option">
              <input type="radio" value="Male" id="male" />
              <span>Male</span>
            </div>
            <div className="option">
              <input type="radio" value="Female" id="male" />
              <span>Female</span>
            </div>
            <div className="option">
              <input type="radio" value="Other" id="male" />
              <span>Other</span>
            </div>
          </div>
        </div>
        <div className="doctor_form_element" id="Qualificaton">
          <label>Qualification/Specialization</label>
          <select
            onChange={(e) => {
              setQualification(e.target.value);
              e.target.value == "other"
                ? setOtherOption(true)
                : setOtherOption(false);
            }}
          >
            {Specialization.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {otherOption ? (
            <InputBox
              title={"Specialization"}
              type={"text"}
              setQualification={setQualification}
            />
          ) : null}
          {/* {console.log(qualification)}   */}
        </div>
        <div className="doctor_form_element" id="degree">
          <label>Degree</label>
          <select
            onChange={(e) => {
              setD_degree(e.target.value);
              e.target.value == "other"
                ? setOtherOption1(true)
                : setOtherOption1(false);
            }}
          >
            {degree.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {otherOption1 ? (
            <InputBox
              title={"Degree"}
              type={"text"}
              setD_degree={setD_degree}
            />
          ) : null}
        </div>
        {/* <InputBox title={"Degree"} type={"text"} setName={true} /> */}
        <hr />
        <div className="doctor_form_element" id="doctor_register_date">
          <label>Data of Registration</label>
          <input
            type="date"
            max={today}
            id="date"
            onChange={(e) => setDOR(e.target.value)}
          />
        </div>
        <div className="doctor_register_btn">
          <button id="cancel_btn" onClick={() => cancel_btn(true)}>
            Cancel
          </button>
          <button id="register_btn" onClick={pushDocData}>
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default Add_doctor;
