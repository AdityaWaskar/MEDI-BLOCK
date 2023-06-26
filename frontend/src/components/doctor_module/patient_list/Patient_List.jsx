import React, { useState, useEffect } from "react";
import doctorServices from "../../../services/doctorServices";
import "./patient_list.css";
import Spinner from "../../spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";

const Patient_List = (props) => {
  const [patientList, setPaitentList] = useState();
  const [filterData, setFilterData] = useState();
  const [spinner, setSpinner] = useState(false);

  async function requestAccount() {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return account[0];
    } catch (e) {
      console.log(e);
    }
  }

  const getPaientList = async () => {
    setSpinner(true);
    try {
      const account = await requestAccount();

      const data = await doctorServices.patientListTreatedByDoctor(account);
      setPaitentList(data);
      setFilterData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPaientList().then((res) => setSpinner(false));
  }, []);

  // handle suggestion
  function handleSearchTermChange(event) {
    const search = event.target.value;
    var filteredData = patientList.filter(function (obj) {
      let data;
      !search.startsWith("0x")
        ? (data = obj.phoneNo.startsWith(search))
        : (data = obj.contract_address.startsWith(search));

      return data;
    });

    setFilterData(filteredData);
    if (search.length == 0) {
      getPaientList().then((res) => setSpinner(false));
    }
  }

  const handleCopy = (phoneNo) => {
    navigator.clipboard
      .writeText(phoneNo)
      .then(() => {
        toast.success("Phone No. copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (
    <div className="rightPatientList">
      <Toaster position="bottom-center" reverseOrder={false} />
      <Spinner active={spinner} />
      <input
        className="searchBox"
        type="text"
        placeholder="Enter Patient Id"
        onChange={handleSearchTermChange}
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
        <div className="line"></div>
        {filterData?.map((record, index) => (
          <div
            className="row2"
            key={index}
            onClick={() => handleCopy(record.phoneNo)}
          >
            <div className="srno">{index + 1}</div>
            <div className="date">{record.date}</div>
            <div className="name">{record.name}</div>
            <div className="phone">{record.phoneNo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patient_List;
