import React, { useState } from "react";
import "./nav.css";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import logo from "../Main_Page/logo1.svg";

const Navigation = (props) => {
  const [profileActive, setProfileActive] = useState(false);
  return (
    <nav>
      <span className="title">
        <img src={logo} alt="" />
        HMS Using Blockchain
      </span>
      <div className="menu">
        <div
          className="userInfo"
          onClick={() => setProfileActive(!profileActive)}
        >
          <div className="userPhoto">
            <img src={"/img/user.svg"} alt="user" />
          </div>
          <span className="user_email">{props.email}</span>
          <ul className="active">
            <li>
              {/* <img src="" /> */}
              <CgProfile className="profileLogo" />
              <a href="#">MY PROFILE </a>
            </li>
            <li>
              {/* <img src="./img/log-out.png" /> */}
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
