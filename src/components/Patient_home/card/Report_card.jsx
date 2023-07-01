import React from "react";
import "./report_card.css";
import { useNavigate } from "react-router";

const Report_card = (props) => {
  const navigate = useNavigate();
  const Redirect = () => {
    navigate(`./${props.tokenId}`);
  };
  return (
    <section className="report_card_container" onClick={Redirect}>
      <div className="report_title">Report</div>
      <div>
        <hr />
        <span>Date - {props.date}</span>
      </div>
    </section>
  );
};

export default Report_card;
