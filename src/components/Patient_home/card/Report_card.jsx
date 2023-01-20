import React from "react";
import "./report_card.css";

const Report_card = (props) => {
  return (
    <section className="report_card_container">
      <div className="report_title">Report</div>
      <div>
        <hr />
        <span>Date - {props.date}</span>
      </div>
    </section>
  );
};

export default Report_card;
