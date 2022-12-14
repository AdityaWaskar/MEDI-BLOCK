import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Navigation from '../navigation/Navigation'
import InfoCard from './InfoCard'
import './detailInfo.css'
import { useParams } from "react-router-dom"
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
// const contractAddress = '0xd8C83Bd39629b1bbBc7bAd437123edfDf7e05Ad2';
// import { abi } from '../home/ABI/abi.js';
var data = [] ;
var data5 = [] ;
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medicalHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_patientAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_PhoneNo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_patientAge",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_patientGender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_patientBloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			}
		],
		"name": "addPatientDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_PhoneNo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_history",
				"type": "string"
			}
		],
		"name": "PatientEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllPatientIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getDetails2",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getPatientDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_PhoneNo",
				"type": "uint256"
			}
		],
		"name": "getPatientDetailsByPhoneNo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "patientCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicalHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patientAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_PhoneNo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "patientAge",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "patientGender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patientBloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const DetailInfo = (props) => {
	const params = useParams()
    const [account, setAccount] = useState('')
	const [name, setName] =useState('')
	const [email, setEmail] =useState('')
	const [report, setReport] =useState('')
	const [address, setAddress] =useState('')
	const [phone, setPhone] =useState(0)
	const [age, setAge] =useState(0)
	const [doctorName, setDoctorName] =useState('')
	const [gender, setGender] =useState('')
	const [bloodGroup, setBloodGroup] =useState('')
	const [date, setDate] =useState('')
	const [medicine, setMedicine] = useState('')
	const [symptoms, setSymptoms] = useState('')
	const [disease, setDisease] = useState('')
	const[noOfData, setNoOfData] = useState(false)
	const[list, setList] = useState([])
	
    useEffect(() => {
        requestAccount();
      }, []);

      // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }
 
   // Displays a prompt for the user to select which accounts to connect
  async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account[0]);
  }

      //  fetch the data from the database
    async function getData(id){
        let contract = await initializeProvider();
        const data = await contract.getPatientDetails(id) //getting Patient Detail
        const data2 = await contract.getDetails2(id) //getting Patient Detail
		setName(data2[0])
		setEmail(data2[1])
		setReport(data2[3])
		setAddress(data2[4])
		setPhone(parseInt(data[1]._hex))
		setAge(parseInt(data[2]._hex))
		setDoctorName(data[3])
		setGender(data[4])
		setBloodGroup(data[5])
		setDate(data[6])
		setDisease(data2[2].split(',')[1].split(':')[1])
		setSymptoms(data2[2].split(',')[2].split(':')[1])
		setMedicine(data2[2].split(',')[0].split(':')[1])

        return [report, age, doctorName, date, disease, symptoms, medicine];
	}

	getData(params.id)

	// async function getPatientDetailsByPhoneNo(){	
	// 	var main_data = [];
    //     let contract = await initializeProvider();
		
    //     data = await contract.getPatientDetailsByPhoneNo(phone)	
    //   	// console.log(parseInt(data[0]._hex))
    //   	// console.log(parseInt(data[1]._hex))
	// 	// let l = [parseInt(data[0]._hex), parseInt(data[1]._hex)];
	// 	// console.log(data)
	// 	// setNoOfData(data)
	// 	let i = 1
	// 	data.map(async d => {
	// 		const data4 = await contract.getPatientDetails(d) //getting Patient Detail
    //     	const data3 = await contract.getDetails2(d)
	// 		let l2 = [data4, data3]
	// 		// console.log(i, data.length)
	// 		console.log(l2)
	// 		if(data.length == i){
	// 			data5 = [...data5, l2]
	// 			// data5 = data5.concat(l2)
	// 			// setNoOfData(true)
	// 			// setList(l2)	
	// 		}
	// 		console.log(data5)
	// 		i++;
	// 	})
	// 	console.log('asdf1'+ list)

		// for(let i=0; i<data.length; i++){
		// 	main_data = [...main_data ,  getData(parseInt(data[i]._hex))]
		// }
		// console.log('asdf'+ main_data)
    //   return parseInt(data)
	
    // }

	// getPatientDetailsByPhoneNo()
	// .then(d=>{
	// 	p_data.push(...d)
	// 	// console.log(p_data)	
	// 	p_data.push(p_data[2].split(',')[1].split(':')[1], p_data[2].split(',')[2].split(':')[1], p_data[2].split(',')[0].split(':')[1])
	// 	// console.log(p_data)	
	// 	// setPData(true)
	// 	// setName(p_data[0])
	// }).catch(e=>console.log(e))	

  return (
	  <>
		  <Navigation/>
        <div className='infoCardContainer'>
			<h1 id='Name'>{name}</h1>
			<h4>Personal Info</h4>
            <InfoCard title={'Email'} value = {email}/>
            <InfoCard title={'Phone_No'} value = {phone} />
            <InfoCard title={'Age'} value = {age}/>
            <InfoCard title={'Address'} value = {address}/>
            <InfoCard title={'Gender'} value = {gender}/>		
			<h4>Medical Info</h4>
            <InfoCard title={'Blood_Group'} value = {bloodGroup}/>
            <InfoCard title={'Docotor_Name'} value = {doctorName}/>
            <InfoCard title={'Disease'} value = {disease}/>
            <InfoCard title={'Symptoms'} value = {symptoms}/>
            <InfoCard title={'Medicine'} value = {medicine}/>
			<div className="info">
            	<p><b>Report</b></p>
            	<span><a href={`https://gateway.pinata.cloud/ipfs/${report}`}>Click here</a></span>
    		</div>
        </div>

    </>
  )
}

export default DetailInfo