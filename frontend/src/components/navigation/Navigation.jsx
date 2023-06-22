import React, { useState } from "react";
import "./nav.css";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import logo from "../Main_Page/logo1.svg";
import { doctor } from "../../assets/doctorModule";
import { useNavigation } from "react-router";

const Navigation = (props) => {
  const [profileActive, setProfileActive] = useState(false);
  const navigate = useNavigation();

  const navigation = () => {
    if (props.role === "doctor") {
      navigate("./profile");
    }
  };
  return (
    <nav>
      <span className="title">
        <img src={logo} alt="" />
        MEDI-BLOCK
      </span>
      <div className="menu">
        <div
          className="userInfo"
          onClick={() => setProfileActive(!profileActive)}
        >
          <div className="userPhoto">
            <img src={doctor} alt="user" />
          </div>
          <span className="user_email">{props.email}</span>
          <ul className="active">
            <li>
              <CgProfile className="profileLogo" />
              <a href="#">MY PROFILE </a>
            </li>
            <li>
              <VscSignOut className="profileLogo" />
              <a href="/">LOG OUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
