import React, { useState } from "react";
import "./nav.css";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";

const Navigation = (props) => {
  const [profileActive, setProfileActive] = useState(false);
  return (
    <nav>
      <span className="title">
        <img
          src="https://www.freeiconspng.com/uploads/ambulance-cross-hospital-icon-11.png"
          alt=""
        />
        HMS Using Blockchain
      </span>
      {/* <div className="userInfo">
            <div className="userPhoto">
                <img src={"/img/user.svg"} alt="user" />
            </div>
            <span className="user_email">abc@gmail.com</span>
        </div> */}
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
              <a href="#">LOG OUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
