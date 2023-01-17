import React from "react";
import { Link } from "react-router-dom";
import "./doctor_data.css";
import Card from "../card/Card";

const Doctor_data = () => {
  return (
    <div className="doctor_data_container">
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
            <th>Specialization</th>
          </tr>
          {/* {allPatientId.map((data) => ( */}
          <Card
            key={0}
            id={0}
            name={"Aditya"}
            email={"Orthopedics"}
            medicalHistory={"aditya"}
            phone_no={"9082356225"}
            age={85}
            doctor={"name"}
            gender={"male"}
            img={"adffadf"}
          />
          <Card
            key={1}
            id={1}
            name={"Aditya1"}
            email={"Orthopedics"}
            medicalHistory={"aditya1"}
            phone_no={"9082356223"}
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

export default Doctor_data;
