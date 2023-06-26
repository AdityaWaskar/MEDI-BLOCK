import React from "react";
import Wave from "react-wavify";
import Navigation from "../Main_Page/Navigation";
import "./contact.css";
import contactUS from "../../assets/contactUS.jpg";
import back from "./back.png";
import logo from "../../assets/logo.svg";

const Contact_us = () => {
  return (
    <section className="navType1">
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
            <button>
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
          <form>
            <div className="row">
              <div class="wrapper">
                <div class="input-data">
                  <input type="text" required />
                  <div class="underline"></div>
                  <label>First Name</label>
                </div>
              </div>

              <div class="wrapper">
                <div class="input-data">
                  <input type="text" required />
                  <div class="underline"></div>
                  <label>Last Name</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="wrapper w100">
                <div class="input-data">
                  <input type="text" required />
                  <div class="underline"></div>
                  <label>Email</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="wrapper w100">
                <div class="input-data">
                  <input type="text" required />
                  <div class="underline"></div>
                  <label>Phone</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="w100">
                <div class="input-data">
                  <textarea ols="30" rows="10" placeholder="Your Query....." />
                  <div class="underline"></div>
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
