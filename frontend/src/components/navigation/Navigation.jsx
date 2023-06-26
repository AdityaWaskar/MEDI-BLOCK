import React, { useState } from "react";
import "./nav.css";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import logo from "../Main_Page/logo1.svg";
import { doctor } from "../../assets/doctorModule";
import { useNavigate, useParams } from "react-router";

const Navigation = (props) => {
  const [profileActive, setProfileActive] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const _navigation = () => {
    if (params.role === "true") {
      navigate("./profile");
    } else {
      navigate(`../doctor_page/${params.email}/profile`);
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
              <div className="navigateClass" onClick={_navigation}>
                MY PROFILE
              </div>
            </li>
            <li>
              <VscSignOut className="profileLogo" />
              <div className="navigateClass" onClick={_navigation}>
                LOG OUT
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
