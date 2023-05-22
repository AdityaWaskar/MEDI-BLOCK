import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Card = (params) => {
  const navigate = useNavigate();
  const [timer, settimer] = useState(false);

  const AccessOrNot = (number) => {
    return Cookies.get(number);
  };

  const goToPatientPage = (number) => {
    navigate(`/patient_page/false/${number.replace(" ", "")}`);
  };

  const onmouseover = () => {
    settimer(true);
  };
  const onmouseout = () => {
    settimer(false);
    console.log("ldwqrewrw");
  };

  function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <div
      className="card"
      key={params.id}
      // onClick={() => (window.location.href = `/patient_page/false`)}
    >
      <div className="element">
        <label>Id</label>
        <span>{params.id}</span>
      </div>
      <div className="element">
        <label>Date</label>
        <span>{params.date}</span>
      </div>
      <div className="element">
        <label>Name</label>
        <span>{params.name}</span>
      </div>
      <div className="element">
        <label>Phone No.</label>
        <span>{params.phone_no}</span>
      </div>
      <div className="element">
        <label>Email</label>
        <span>{params.email}</span>
      </div>
      {/* <td>{params.id}</td>
      <td>{params.date}</td>
      <td>{params.name}</td>
      <td>{params.phone_no}</td>
      <td>{params.email}</td> */}
      <div className="element btnn">
        {/* {!(params.getAccess == params.phone_no) ? ( */}
        {AccessOrNot(params.phone_no) == undefined ? (
          <button
            onClick={() => {
              params.setSelectedPhoneNo(params.phone_no);
              console.log(params.phone_no);
              // params.setIsCancle(true);
              params.setSpinner(true);
              params.onSignup();
              params.setSpinner(false);
            }}
            className="greenBtn"
          >
            Get Access
          </button>
        ) : (
          <div className="timerOption btnn">
            <button
              onMouseOut={onmouseout}
              onMouseOver={onmouseover}
              onClick={() => {
                // params.setSelectedPhoneNo(params.phone_no);
                // console.log(params.phone_no);
                // params.setIsCancle(true);
                // params.onSignup();
                goToPatientPage(params.phone_no);
              }}
              className="yellowBtn"
            >
              Add Report
            </button>
            {timer && (
              <span data-aos="fade">
                Expires at {toHoursAndMinutes(Cookies.get(params.phone_no))}
              </span>
            )}
          </div>
        )}
      </div>
      <td>{params.cookieTimer}</td>
    </div>
  );
};

export default Card;
