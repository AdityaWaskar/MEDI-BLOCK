import { ethers } from 'ethers';
const contractAddress = "0x02468F8f28FB3f7413466C012A0076101CF13489";

// Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
export async function initializeProvider(abi) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }

//  fetch the data from the database
export async function getData(id, abi){
  let contract = await initializeProvider(abi);
  const data = await contract.getPatientDetails(id) //getting Patient Detail
  const data2 = await contract.getDetails2(id) //getting Patient Detail
  let obj = [
    data2[0], // 0 = name
    data2[1], // 1 = email 
    data2[2], // 2 = medicalHistory
    data2[3], // 3 = report_img
    parseInt(data[1]._hex), // 4 = phone_no
    parseInt(data[2]._hex), // 5 = age 
    data[3], // 6 = doctor
    data[4], // 7 = gender
    id // 8 = id of patient
  ]
  console.log(obj)
  return obj;
}