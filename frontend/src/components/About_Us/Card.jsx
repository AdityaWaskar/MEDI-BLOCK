import React from "react";
import "./services.css";
import aditya_img from "./contributers/aditya.png";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";

const Card = (props) => {
  return (
    <div className="infoCard">
      <div className="team-item">
        <img src={props.image} className="team-img" alt="pic" />
        <h3>{props.name}</h3>
        <div className="team-info">
          <p>{props.qualification}</p>
        </div>
        <p>{props.description}</p>
        <ul className="team-icon">
          <li>
            <a href={props.link1} className="twitter">
              <SiGmail size={15} />
            </a>
          </li>
          <li>
            <a href={props.link2} className="linkedIn">
              <FaLinkedinIn size={15} />
            </a>
          </li>
          <li>
            <a href={props.link3} className="github">
              <VscGithub size={18} />
            </a>
          </li>
          <li>
            <a href={props.link4} className="leetcode">
              <CgWebsite size={15} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
