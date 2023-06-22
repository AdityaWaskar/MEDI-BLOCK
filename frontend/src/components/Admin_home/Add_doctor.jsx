import React from "react";
import { useState, useEffect } from "react";
import "./add_doctor.css";
import InputBox from "./InputBox";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navigation from "../navigation/Navigation";
import { useNavigate } from "react-router";
import Spinner from "../spinner/Spinner";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";

var today;

const Add_doctor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cancelBtnFlag, setCancelBtnFlag] = useState(true);
  const [otherOption, setOtherOption] = useState(false);
  const [otherOption1, setOtherOption1] = useState(false);

  const [formID, setFormID] = useState(0);
  const [account, setAccount] = useState("");
  const [doctorWalletAddress, setDoctorWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("select");
  const [otherQualification, setOtherQualification] = useState("");
  const [d_degree, setD_degree] = useState("select");
  const [otherD_degree, setOtherD_degree] = useState("");
  const [email, setEmail] = useState("");
  const [DOR, setDOR] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  const [spinner, setSpinner] = useState(false);

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account[0]);
      return account[0];
    } catch (e) {
      console.log(e);
    }
  }

  function clearStates() {
    setDoctorWalletAddress("");
    setName("");
    setAge("");
    setGender("Male");
    setPhoneNo("");
    setQualification("select");
    setOtherQualification("");
    setOtherOption(false);
    setD_degree("select");
    setOtherD_degree("");
    setOtherOption1(false);
    setEmail("");
    setDOR("");
    setHospitalName("");
  }

  let informationValidation = (
    name,
    age,
    email,
    phoneNo,
    gender,
    qualification,
    d_degree,
    doctorWalletAddress,
    DOR,
    hospitalName,
    otherQualification,
    otherD_degree
  ) => {
    let flag1 = true;
    // let flag2 = false;
    if (
      name == "" ||
      age == "" ||
      gender == "" ||
      phoneNo == "" ||
      d_degree == "" ||
      email == "" ||
      doctorWalletAddress == "" ||
      hospitalName == "" ||
      qualification == "select" ||
      d_degree == "select" ||
      DOR == ""
    ) {
      flag1 = false;
    }
    if (qualification == "other" && otherQualification == "") {
      flag1 = flag1 && false;
    }
    if (d_degree == "other" && otherD_degree == "") {
      flag1 = flag1 && false;
    }

    return flag1;
  };
  async function pushDocData() {
    setSpinner(true);
    try {
      if (
        informationValidation(
          name,
          age,
          email,
          phoneNo,
          gender,
          qualification,
          d_degree,
          doctorWalletAddress,
          DOR,
          hospitalName,
          otherQualification,
          otherD_degree
        )
      ) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/doctor/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_wallet_address: await requestAccount(),
            doctor_wallet_address: doctorWalletAddress,
            phoneNo: phoneNo,
            name: name,
            email: email,
            gender: gender,
            age: age,
            hospital_name: hospitalName,
            specialization: qualification,
            degree: d_degree,
            DOR: DOR,
          }),
        }).then((res) => {
          clearStates();
          setCancelBtnFlag(true);
          setSpinner(false);
          Cookies.remove("doctorData");
          toast.success("Doctor Added!", { id: "doctorAdd" });
          setTimeout(() => navigate(-1), 1000);
        });
      } else {
        toast.error("Fill all the fileds correctly.", { id: "error" });
      }
    } catch (e) {
      setSpinner(false);
    }
  }

  const getCount = async () => {
    setSpinner(true);
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/doctor/alldoctorAddress`
      );
      setFormID(data.length);
    } catch (error) {
      console.error(error);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getCount();
    requestAccount();

    // Date Limit till today (can't enter the tomorrow's date)
    today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    setDOR(today);
  }, []);

  const cancel_btn = (value) => {
    setCancelBtnFlag(value);
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
    <div>
      <Spinner active={spinner} />
      <Navigation email={params.email} />
      <section className="add_doctor_container">
        <Toaster position="bottom-center" reverseOrder={false} />
        <h1 className="add_doctor_button">Add Doctor</h1>

        <div
          className={
            !cancelBtnFlag ? "add_doctor_form doctor_active" : "add_doctor_form"
          }
        >
          <div className="doctor_form_element" id="d_ID">
            <label>ID : </label>
            <input type="text" value={formID + 1} disabled />
          </div>
          <div className="row">
            <InputBox
              title={"Name"}
              type={"text"}
              value={name}
              setName={setName}
            />
            <InputBox
              title={"Age"}
              type={"number"}
              value={age}
              setAge={setAge}
            />
          </div>
          <div className="row">
            <InputBox
              title={"Email"}
              type={"text"}
              value={email}
              setEmail={setEmail}
            />
            <InputBox
              title={"Phone_No"}
              value={phoneNo}
              type={"text"}
              setPhoneNo={setPhoneNo}
            />
          </div>
          <div className="doctor_form_element" id="Gender">
            <label>Gender</label>
            <div
              className="gender_option"
              onChange={(e) => {
                setGender(e.target.value);
                console.log(e.target.value);
              }}
              value={gender}
            >
              <div className="option">
                {gender == "Male" ? (
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    id="male"
                    defaultChecked
                  />
                ) : (
                  <input type="radio" name="gender" value="Male" id="male" />
                )}
                <span>Male</span>
              </div>
              <div className="option">
                <input type="radio" name="gender" value="Female" id="female" />
                <span>Female</span>
              </div>
              <div className="option">
                <input type="radio" name="gender" value="Other" id="other" />
                <span>Other</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="doctor_form_element" id="Qualificaton">
              <label>Qualification/Specialization</label>
              <select
                onChange={(e) => {
                  setQualification(e.target.value);
                  e.target.value == "other"
                    ? setOtherOption(true)
                    : setOtherOption(false);
                }}
                value={qualification}
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
                  value={otherQualification}
                  setOtherQualification={setOtherQualification}
                />
              ) : null}
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
                value={d_degree}
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
                  setOtherD_degree={setOtherD_degree}
                  value={otherD_degree}
                />
              ) : null}
            </div>
          </div>

          <InputBox
            title={"Hospital_Name"}
            type={"text"}
            value={hospitalName}
            setHospitalName={setHospitalName}
          />
          <InputBox
            title={"Wallet_Address"}
            type={"text"}
            value={doctorWalletAddress}
            setDoctorWalletAddress={setDoctorWalletAddress}
          />
          <hr />
          <div className="doctor_form_element" id="doctor_register_date">
            <label>Data of Registration</label>
            <input
              type="date"
              max={today}
              id="date"
              onChange={(e) => setDOR(e.target.value)}
              value={DOR}
            />
          </div>
          <div className="doctor_register_btn">
            <button
              id="cancel_btn"
              onClick={() => {
                cancel_btn(true);
                clearStates();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button id="register_btn" onClick={pushDocData}>
              Register
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Add_doctor;
