import React from "react";
import "./mainPage.css";
import logo from "./logo1.svg";
import { useNavigate } from "react-router";

const Navigation = (props) => {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const about = () => {
    navigate("/about");
  };
  return (
    <nav>
      <div className="left">
        <div id="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">Medi-block</div>
      </div>
      <div className="middle">
        <div className="elements" onClick={home}>
          Home
        </div>
        <div className="elements" onClick={about}>
          About Us
        </div>
        <div className="elements">Guidence</div>
      </div>
      <div className="right">
        <div className="elements">Contact Us</div>
      </div>
    </nav>
  );
};

export default Navigation;
