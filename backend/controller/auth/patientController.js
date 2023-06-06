import Web3 from "web3";
import {
  WALLET_PRIVATE_ADDRESS,
  CONTRACT_ADDRESS,
  INFURA_API_KEY,
} from "../../config.js";
import { hospitalABI } from "../../hospitalABI.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import ipfsServiceController from "./ipfsServices.js";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
  )
);

const private_key = WALLET_PRIVATE_ADDRESS;
const contarct_address = CONTRACT_ADDRESS;

const account1 = web3.eth.accounts.privateKeyToAccount("0x" + private_key);
web3.eth.accounts.wallet.add(account1);

const patientController = {
  async is_exist(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .PatientExists(req.params.wallet_Address)
        .call();

      res.send(data);
    } catch (error) {
      return next(CustomErrorHandler.Forbidden("Invalid Input!"));
    }
  },

  async all_patient_address(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const val = await contract.methods.getPatientAddresses().call();
      res.send(val);
    } catch (error) {
      console.log(error);
      return next(
        CustomErrorHandler.notFound("Error retriving doctor addresses!")
      );
    }
  },

  async data_by_phoneNo(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .getPatientByPhoneNo(req.params.phone_no)
        .call();

      res.send(data);
    } catch (error) {
      return next(CustomErrorHandler.notFound("Invalid Phone Number!"));
    }
  },

  async data_by_walletAddress(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .GetPatientByAddress(req.params.wallet_Address)
        .call();

      res.send(data);
    } catch (error) {
      return next(CustomErrorHandler.notFound("Invalid Wallet Address"));
    }
  },

  async add(req, res, next) {
    console.log("adsfasd" + req.body.admin_wallet_address);
    const { name, phoneNo, email, gender, age, blood_group, DOR } = req.body;

    const json_data = JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      age: age,
      DOR: DOR,
      blood_group: blood_group,
    });
    console.log(json_data);
    try {
      const hash_value = await ipfsServiceController.sendJsonToIPFS(json_data);
      console.log("test2", hash_value);
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const gas = await contract.methods
        .AddPatient(patient_wallet_address, hash_value, phoneNo)
        .estimateGas();
      const response = await contract.methods
        .AddPatient(patient_wallet_address, hash_value, phoneNo)
        .send({ from: patient_wallet_address, gas });
      console.log(response.blockHash);
      res.send(response);
    } catch (error) {
      return next(
        CustomErrorHandler.Forbidden(
          error + "Error occurs sending data to the server!"
        )
      );
    }
  },

  async getAllPatient(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const allAddress = await contract.methods.getPatientAddresses().call();
      let allInfo = [];
      for (let i = 0; i < allAddress.length; i++) {
        const doctor = await contract.methods
          .GetPatientByAddress(allAddress[i])
          .call();
        allInfo = allInfo.concat(doctor);
      }

      const info = [];
      console.log(
        "-----------------------------------------------------------------"
      );
      for (let i = 0; i < allInfo.length; i++) {
        const result = await ipfsServiceController.getDataFromIPFS(
          allInfo[i]["0"]
        );
        result.contract_address = allAddress[i];
        console.log(result);
        result.phoneNo = allInfo[i]["1"];
        // console.log(result);
        info.push(result);
      }
      res.send(info);
    } catch (error) {
      console.log("main -> " + error);
      return next(CustomErrorHandler.notFound("Error retriving patient data!"));
    }
  },
};

export default patientController;
