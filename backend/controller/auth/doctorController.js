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

const doctorController = {
  async is_exist(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .doctorExists(req.params.wallet_Address)
        .call();

      res.send(data);
    } catch (error) {
      return next(CustomErrorHandler.Forbidden("Invalid Input!"));
    }
  },

  async all_doctor_address(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const val = await contract.methods.getDoctorAddresses().call();
      res.send(val);
    } catch (error) {
      return next(
        CustomErrorHandler.notFound("Error retriving doctor addresses!")
      );
    }
  },

  async data_by_phoneNo(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .getDoctorByPhoneNo(req.params.phone_No)
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
        .GetDoctorByAddress(req.params.wallet_Address)
        .call();

      const result = await ipfsServiceController.getDataFromIPFS(data["0"]);
      result["phoneNo"] = data["1"];
      res.send(result);
    } catch (error) {
      return next(CustomErrorHandler.notFound("Invalid Wallet Address"));
    }
  },

  async add(req, res, next) {
    console.log("adsfasd" + req.body.admin_wallet_address);
    const {
      admin_wallet_address,
      doctor_wallet_address,
      phoneNo,
      name,
      email,
      gender,
      age,
      hospital_name,
      specialization,
      degree,
      DOR,
    } = req.body;

    if (!admin_wallet_address) {
      console.log("wallert address is undegined" + { admin_wallet_address });
    } else {
      const json_data = JSON.stringify({
        name: name,
        email: email,
        gender: gender,
        age: age,
        hospital_name: hospital_name,
        specialization: specialization,
        degree: degree,
        DOR: DOR,
      });
      console.log(json_data);
      try {
        const hash_value = await ipfsServiceController.sendJsonToIPFS(
          json_data
        );
        console.log("test2", hash_value);
        const contract = new web3.eth.Contract(hospitalABI, contarct_address);
        const gas = await contract.methods
          .AddDoctor(doctor_wallet_address, hash_value, phoneNo)
          .estimateGas();
        const response = await contract.methods
          .AddDoctor(doctor_wallet_address, hash_value, phoneNo)
          .send({ from: admin_wallet_address, gas });
        // .on("confirmation", async (conformatinNo, receipt) => {
        //   res.send(receipt);
        // });
        console.log(response.blockHash);
        res.send(response);
      } catch (error) {
        return next(
          CustomErrorHandler.Forbidden(
            error + "Error occurs sending data to the server!"
          )
        );
      }
    }
  },

  async getAllDoctors(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const allAddress = await contract.methods.getDoctorAddresses().call();
      console.log(allAddress);
      let allInfo = [];
      for (let i = 0; i < allAddress.length; i++) {
        const doctor = await contract.methods
          .GetDoctorByAddress(allAddress[i])
          .call();
        allInfo = allInfo.concat(doctor);
      }

      const info = [];
      console.log(allInfo);
      console.log(";;", allInfo[1]);
      console.log(";;", allInfo[2]);
      console.log(
        "-----------------------------------------------------------------"
      );
      for (let i = 0; i < allInfo.length; i++) {
        console.log(allInfo[i]);
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
      return next(CustomErrorHandler.notFound("Error retriving doctor data!"));
    }
  },

  async getPatientsTreatedByDoctor(req, res, next) {
    const doctorAddress = req.params.docAddress;
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const data = await contract.methods
        .getpatientsTreatedByDoctor(doctorAddress)
        .call();
      res.send(data);
    } catch (error) {
      console.log("->", error);
    }
  },
};

export default doctorController;
