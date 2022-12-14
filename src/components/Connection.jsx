import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
// import Hospital from '../../build/contracts/Hospital.json'

const contractAddress = "0xF1391c9DD32185Fc888EC70b7236a923d73Cfb07"
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getMessage",
		"outputs": [
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
		"inputs": [],
		"name": "message",
		"outputs": [
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
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


const Connection = () =>{
    const [account, setAccount] = useState();

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
      console.log(account[0]);
    }

  //   async function _message1(){
  //     let contract = await initializeProvider();
  //     const m2 = await contract.getMessage();
  //     console.log(m2)
  //   }
  //   async function _message(){
  //     if (typeof window.ethereum !== 'undefined') {
  //       let contract = await initializeProvider();
  //       try {
  //         let m1 = await contract.setMessage('adi');
  //         console.log(m1)
  //       } catch (e) {
  //         console.log(e);
  //       }
  //   }
  // }
  
   return (
    
     <div>
sdf      

       Your account is: {account} <br/>
       {/* <button onClick={()=> _message()}>hkgj</button>
       <button onClick={()=> _message1()}>hkgj1</button> */}
     </div>
   );
}


export default Connection