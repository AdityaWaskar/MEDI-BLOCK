import React, { useState, useEffect } from "react";
import "./doctor_data.css";
import Card from "../card1/Card";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const Doctor_data = (props) => {
  const [doctorIds, setDoctorIds] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // handle suggestion
  function handleSearchTermChange(event) {
    const search = event.target.value;
    var filteredData = doctorIds.filter(function (obj) {
      let data;
      console.log(search.startsWith("0x"));
      !search.startsWith("0x")
        ? (data = obj.phoneNo.startsWith(search))
        : (data = obj.contract_address.startsWith(search));

      return data;
    });

    setFilterData(filteredData);
    if (search.length == 0) {
      getAllDoctorIds();
    }
  }

  async function getAllDoctorIds() {
    props.setSpinner(true);
    const data = Cookies.get("doctorData");
    if (!data) {
      const doctorInfo = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/doctor/allDoctorInfo`,
        { mode: "cors" }
      );
      const response = await doctorInfo.json();
      Cookies.set("doctorData", JSON.stringify(response), {
        expires: 1,
      });

      setFilterData(response);
      setDoctorIds(response);
    } else {
      setFilterData(JSON.parse(data));
      setDoctorIds(JSON.parse(data));
    }

    props.setSpinner(false);
  }

  useEffect(() => {
    getAllDoctorIds();
  }, []);

  return (
    <div className="doctor_data_container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search.."
          onChange={handleSearchTermChange}
        />

        <button>
          <i className="fa fa-search"></i>
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
          {filterData.map((data, id) => (
            <Card
              key={id + 1}
              id={id + 1}
              name={data["name"]}
              date={data["DOR"]}
              phone_no={data["phoneNo"]}
              email={data["email"]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor_data;
