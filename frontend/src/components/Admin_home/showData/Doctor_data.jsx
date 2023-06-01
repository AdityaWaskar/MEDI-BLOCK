import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "./doctor_data.css";
import Card from "../card1/Card";
import { hospitalABI } from "../../abi";
import toast, { Toaster } from "react-hot-toast";

import Web3 from "web3";

// const web3 = new Web3(process.env.REACT_APP_INFURA_HTTPURL);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  )
);
const private_key = process.env.REACT_APP_WALLET_PRIVATE_ADDRESS;
const contarct_address = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contarct_address = "0x444FcD545168031c8C9ec0db8F4dd2349b2b64ac";

const account1 = web3.eth.accounts.privateKeyToAccount("0x" + private_key);
web3.eth.accounts.wallet.add(account1);

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

  // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function getDoctorData() {
    props.setSpinner(true);
    // const contract = await initializeProvider();
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    console.log(search);
    // if the length is 10 than it search the doctor details by the phone number.
    if (search.length == 10) {
      const data = await contract.methods.getDoctorByPhoneNo(search).call(); //getting doctor Detail by phone no
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
      const data = await contract.methods.GetDoctor(search).call(); //Getting doctor Details by wallet Adress
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
    // if it neither phone no nor wallet Address than it throws an error
    else {
      toast.error("Invilid Input!");
    }
    props.setSpinner(false);
  }

  async function getAllDoctorIds() {
    props.setSpinner(true);
    // const contract = new web3.eth.Contract(hospitalABI, contarct_address);

    // //get all avaliable doctor address
    // const data = await contract.methods.GetDocAdd().call();
    // setAllPatientWalletIds(data);

    // // creating an an array of total count of doctor and store the information in the array.
    // let doctorInfo = new Array(data.length <= 10 ? data.length : 10);
    // let j = 0;
    // for (let i = data.length - 1; i >= 0 && i >= data.length - 10; i--) {
    //   // console.log(data[i]);
    //   const data2 = await contract.methods.GetDoctor(data[i]).call();
    //   // console.log(data2);
    //   doctorInfo[j++] = [
    //     parseInt(data2[0]),
    //     data2[4].split(",")[1],
    //     data2[1].split(",")[0],
    //     data2[2],
    //     data2[3].split(",")[0],
    //   ];
    //   // patientPhoneNo.push(data2[2]);
    // }

    // let doctorPhoneNo = [];
    // for (let i = 0; i < data.length; i++) {
    //   const data2 = await contract.methods.GetDoctor(data[i]).call();
    //   doctorPhoneNo.push(data2[2]);
    // }
    // console.log(doctorPhoneNo);

    const doctorInfo = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/doctor/allDoctorInfo`,
      { mode: "cors" }
    );
    const response = await doctorInfo.json();
    console.log(response);
    setDoctorIds(response);
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
              // key={data + 1}
              id={1}
              data={data["DOR"]}
              name={data["name"]}
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
