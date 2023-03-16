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
    navigate(`/patient_page/false/${number}`);
  };

  const onmouseover = () => {
    settimer(true);
    console.log("faslkfj");
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
    <tr
      className="card"
      key={params.id}
      // onClick={() => (window.location.href = `/patient_page/false`)}
    >
      <td>{params.id}</td>
      <td>{params.date}</td>
      <td>{params.name}</td>
      <td>{params.phone_no}</td>
      <td>{params.email}</td>
      <td>
        {/* {!(params.getAccess == params.phone_no) ? ( */}
        {AccessOrNot(params.phone_no) == undefined ? (
          <button
            onClick={() => {
              params.setSelectedPhoneNo(params.phone_no);
              console.log(params.phone_no);
              // params.setIsCancle(true);
              params.onSignup();
            }}
            className="greenBtn"
          >
            Get Access
          </button>
        ) : (
          <div className="timerOption">
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
                {toHoursAndMinutes(Cookies.get(params.phone_no))}
              </span>
            )}
          </div>
        )}
      </td>
      <td>{params.cookieTimer}</td>
    </tr>
  );
};

export default Card;
