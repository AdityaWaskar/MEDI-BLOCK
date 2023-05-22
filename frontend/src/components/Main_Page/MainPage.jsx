import React from "react";
import "./mainPage.css";
import { Player } from "@lottiefiles/react-lottie-player";
import Wave from "react-wavify";
import Card from "./Card";
import admin from "./admin.svg";
import user from "./user.svg";
import Navigation from "./Navigation";
import Footer from "../footer/Footer";

const MainPage = () => {
  return (
    <section className="mainPageContainer navType1">
      <Navigation />
      <Wave
        className="wave"
        // fill="#ee82ee"
        fill="#b598f9"
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />

      <div className="mainBody">
        <div className="equal left">
          <div className="mainContent">
            <span>Health Management System Using</span>
            <span className="color"> Blockchain</span>
          </div>
          <div className="subContent">
            Secure and Transparent Storage and Sharing of patient data.
          </div>
          <div className="options">
            <span>Login As </span>
            <div className="Users">
              <Card admin={admin} id="admin" />
              <Card admin={user} id="user" />
            </div>
          </div>
        </div>
        <div className="equal right">
          <Player
            src="https://assets6.lottiefiles.com/packages/lf20_wtz7oyhe.json"
            // src="https://assets7.lottiefiles.com/temp/lf20_iRxzMr.json"
            loop
            autoplay
            className="player"
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MainPage;
