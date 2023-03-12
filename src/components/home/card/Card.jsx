import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = (params) => {
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
        {!(params.getAccess == params.phone_no) ? (
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
          <button
            onClick={() => {
              // params.setSelectedPhoneNo(params.phone_no);
              // console.log(params.phone_no);
              // params.setIsCancle(true);
              // params.onSignup();
            }}
            className="yellowBtn"
          >
            Add Report
          </button>
        )}
      </td>
    </tr>
  );
};

export default Card;
