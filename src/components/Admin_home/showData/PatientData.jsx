import React from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import "./patient.css";

const PatientData = () => {
  return (
    <div className="patient_data_container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search.."
          //   onChange={(e) => setSearch(e.target.value)}
          maxLength="10"
        />

        <button
        //   onClick={() => {
        //     getPatientDetailsByPhoneNo();
        //   }}
        >
          <Link to={{ pathname: `/home` }} className="link_decoration">
            <i className="fa fa-search"></i>
          </Link>
        </button>
      </div>
      <table className="AllCards">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email Id</th>
          </tr>
          {/* {allPatientId.map((data) => ( */}
          <Card
            key={0}
            id={0}
            name={"Aditya"}
            email={"aditya@gmail.com"}
            medicalHistory={"aditya"}
            phone_no={"9082356225"}
            age={85}
            doctor={"name"}
            gender={"male"}
            img={"adffadf"}
          />
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default PatientData;
