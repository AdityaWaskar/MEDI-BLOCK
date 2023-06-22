import React from "react";
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
    navigate(`/patient_page/false/${number.replace(" ", "")}/${params.email}`);
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
    // <tr
    //   className="card"
    //   key={params.id}
    //   // onClick={() => (window.location.href = `/patient_page/false`)}
    // >
    //   <td>{params.id}</td>
    //   <td>{params.date}</td>
    //   <td>{params.name}</td>
    //   <td>{params.phone_no}</td>
    //   <td>{params.email}</td>
    //   <td>
    //     {/* {!(params.getAccess == params.phone_no) ? ( */}
    //     {AccessOrNot(params.phone_no) == undefined ? (
    //       <button
    //         onClick={() => {
    //           params.setSelectedPhoneNo(params.phone_no);
    //           console.log(params.phone_no);
    //           // params.setIsCancle(true);
    //           params.onSignup();
    //         }}
    //         className="greenBtn"
    //       >
    //         Get Access
    //       </button>
    //     ) : (
    //       <div className="timerOption">
    //         <button
    //           onMouseOut={onmouseout}
    //           onMouseOver={onmouseover}
    //           onClick={() => {
    //             goToPatientPage(params.phone_no);
    //           }}
    //           className="yellowBtn"
    //         >
    //           Add Report
    //         </button>
    //         {timer && (
    //           <span data-aos="fade">
    //             {toHoursAndMinutes(Cookies.get(params.phone_no))}
    //           </span>
    //         )}
    //       </div>
    //     )}
    //   </td>
    //   <td>{params.cookieTimer}</td>
    // </tr>
    <div key={params.id} className="patientCard">
      <div className="info">
        <div className="row">
          <div className="label">ID</div>
          <div className="value">: {params.id}</div>
        </div>
        <div className="row">
          <div className="label">Name :</div>
          <div className="value">: {params.name}</div>
        </div>
        <div className="row">
          <div className="label">Phone No. </div>
          <div className="value">: {params.phone_no}</div>
        </div>
        <div className="row">
          <div className="label">Email </div>
          <div className="value">: {params.email}</div>
        </div>
        <div className="row">
          <div className="label">DOR </div>
          <div className="value">: {params.date}</div>
        </div>
      </div>
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
    </div>
  );
};

export default Card;
