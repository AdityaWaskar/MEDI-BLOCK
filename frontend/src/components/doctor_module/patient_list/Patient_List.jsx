import React from "react";
import "./patient_list.css";

const Patient_List = () => {
  return (
    <div className="rightPatientList">
      <input
        className="searchBox"
        type="text"
        placeholder="Enter phone no/ contract address"
      />
      <div className="rightMid">
        <p>Patient List</p>
      </div>
      <div className="pl">
        <div className="row1">
          <div className="srno">SR NO.</div>
          <div className="date">Date</div>
          <div className="name">NAME</div>
          <div className="phone">Phone No.</div>
        </div>
        <div class="line"></div>
        <div className="row2">
          <div className="srno">01</div>
          <div className="date">02/02/2024</div>
          <div className="name">Himanshu Upadhyay</div>
          <div className="phone">123232343</div>
        </div>
      </div>
    </div>
  );
};

export default Patient_List;
