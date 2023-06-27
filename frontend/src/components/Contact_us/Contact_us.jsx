import React, { useState, useRef, useEffect } from "react";
import Wave from "react-wavify";
import Navigation from "../Main_Page/Navigation";
import "./contact.css";
import contactUS from "../../assets/contactUS.jpg";
import back from "./back.png";
import logo from "../../assets/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";

const Contact_us = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const ref = useRef();
  const navigate = useNavigate();

  const clearState = () => {
    setFirstName("");
    setLastName("");
    setPhoneNo("");
    setEmail("");
    setMsg("");
  };
  const onChangeEvent = (state, value) => {
    switch (state) {
      case "lastName":
        setLastName(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "msg":
        setMsg(value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        ref.current,
        process.env.REACT_APP_EMAIL_PUBLIC_ID
      )
      .then(
        (result) => {
          toast.success("Mail Send Successfully.");
          clearState();
        },
        (error) => {
          toast.error("Some error occuring while sending Mail!");
        }
      );
    console.log("Sfasdf", firstName, lastName, phoneNo, email, msg);
  };
  return (
    <section className="navType1">
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
      <Wave
        className="wave"
        fill="#b598f9"
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <div className="contactUsContainer">
        <div className="left">
          <img id="contactleftbg" src={contactUS} alt="" />
          <div className="contactUSCard1">
            <div className="row">
              <img src={logo} alt="" />
              <span>MEDI-BLOCK</span>
            </div>
            <div className="subText">
              Secure and Transparent Storage and Sharing of patient data.
            </div>
            <button onClick={() => navigate(-1)}>
              <img src={back} alt="adf" />
            </button>
          </div>
        </div>
        <div className="right">
          <div className="title">
            <div className="maintext">GET IN TOUCH</div>
            <div className="subtext">
              24/7 We will answer your question and problems
            </div>
          </div>
          <form onSubmit={handleSubmit} ref={ref}>
            <div className="row">
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    value={firstName}
                    name="first_name"
                    onChange={(e) => onChangeEvent("firstName", e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                  <label>First Name</label>
                </div>
              </div>

              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => onChangeEvent("lastName", e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                  <label>Last Name</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="wrapper w100">
                <div className="input-data">
                  <input
                    type="text"
                    value={email}
                    name="user_email"
                    onChange={(e) => onChangeEvent("email", e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                  <label>Email</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="wrapper w100">
                <div className="input-data">
                  <input
                    type="text"
                    value={phoneNo}
                    name="phoneNo"
                    onChange={(e) => onChangeEvent("phoneNo", e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                  <label>Phone</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="w100">
                <div className="input-data">
                  <textarea
                    ols="30"
                    rows="10"
                    name="msg"
                    value={msg}
                    onChange={(e) => onChangeEvent("msg", e.target.value)}
                    placeholder="Your Query....."
                  />
                  <div className="underline"></div>
                </div>
              </div>
            </div>
            <button>SEND</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact_us;
