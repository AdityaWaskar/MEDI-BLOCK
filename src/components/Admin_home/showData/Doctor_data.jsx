import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "./doctor_data.css";
import Card from "../card/Card";
import { hospitalABI } from "../../abi";
import toast, { Toaster } from "react-hot-toast";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
var j = 0;
const Doctor_data = (props) => {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");
  const [doctorIds, setDoctorIds] = useState([]);
  const [allPatientWalletIds, setAllPatientWalletIds] = useState([]);
  const [allPatientPhoneNo, setAllPatientPhoneNo] = useState([]);
  const [suggestion, setSuggestions] = useState([]);

  // handle suggestion
  function handleSearchTermChange(event) {
    const term = event.target.value;
    setSearch(term);

    const data = allPatientWalletIds.concat(allPatientPhoneNo);
    console.log(data);
    if (term.length > 0) {
      const suggestions = data.filter((item) => {
        return item.startsWith(term);
      });
      setSuggestions(suggestions);
      console.log("Suggestions=>", suggestions);
    }

    if (term.length == 0) {
      getAllDoctorIds();
    }
  }

  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
  async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, hospitalABI, signer);
  }

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function getDoctorData() {
    props.setSpinner(true);
    const contract = await initializeProvider();
    console.log(search);
    // if the length is 10 than it search the doctor details by the phone number.
    if (search.length == 10) {
      const data = await contract.getDoctorByPhoneNo(search); //getting doctor Detail by phone no
      // setDoctorIds([data]);

      setDoctorIds([
        [
          parseInt(data[0]),
          data[5].split(",")[1],
          data[2].split(",")[0],
          data[3],
          data[4].split(",")[0],
        ],
      ]);

      //if lenght of search is 42 than it is search doctor info by wallet address.
    } else if (search.length == 42 && search.includes("0x")) {
      const data = await contract.GetDoctor(search); //Getting doctor Details by wallet Adress
      console.log(data);

      setDoctorIds([
        [
          parseInt(data[0]),
          data[4].split(",")[1],
          data[1].split(",")[0],
          data[2],
          data[3].split(",")[0],
        ],
      ]);
    }
    // if it nither phone no nor wallet Address than it throws an error
    else {
      toast.error("Invilid Input!");
    }
    props.setSpinner(false);
  }

  async function getAllDoctorIds() {
    props.setSpinner(true);
    const contract = await initializeProvider();
    //get all avaliable doctor address
    const data = await contract.GetDocAdd();
    setAllPatientWalletIds(data);

    // creating an an array of total count of doctor and store the information in the array.
    let doctorInfo = new Array(data.length <= 10 ? data.length : 10);
    let j = 0;
    for (let i = data.length - 1; i >= 0 && i >= data.length - 10; i--) {
      // console.log(data[i]);
      const data2 = await contract.GetDoctor(data[i]);
      // console.log(data2);
      doctorInfo[j++] = [
        parseInt(data2[0]),
        data2[4].split(",")[1],
        data2[1].split(",")[0],
        data2[2],
        data2[3].split(",")[0],
      ];
      // patientPhoneNo.push(data2[2]);
    }

    let doctorPhoneNo = [];
    for (let i = 0; i < data.length; i++) {
      const data2 = await contract.GetDoctor(data[i]);
      doctorPhoneNo.push(data2[2]);
    }
    // console.log(doctorPhoneNo);
    setAllPatientPhoneNo(doctorPhoneNo);
    setDoctorIds(doctorInfo);
    props.setSpinner(false);
  }

  useEffect(() => {
    requestAccount();
    getAllDoctorIds();
  }, []);

  return (
    <div className="doctor_data_container">
      <div className="searchbar">
        <input
          type="text"
          list="suggestions"
          placeholder="Search.."
          onChange={handleSearchTermChange}
        />
        <datalist id="suggestions">
          {suggestion.map((d) => (
            <option value={d} key={d} />
          ))}
        </datalist>

        <button onClick={getDoctorData}>
          {/* <Link to={{ pathname: `/` }} className="link_decoration"> */}
          <i className="fa fa-search"></i>
          {/* </Link> */}
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
          {doctorIds.map((data) => (
            <Card
              key={data + 1}
              id={data[0] + 1}
              data={data[1]}
              name={data[2]}
              phone_no={data[3]}
              email={data[4]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor_data;
