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
        .getPatientByPhoneNo(req.params.phone_No)
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
      const result = await ipfsServiceController.getDataFromIPFS(data["0"]);
      result["phoneNo"] = data["1"];
      res.send(result);
    } catch (error) {
      console.log(error);
      return next(CustomErrorHandler.notFound("Invalid Wallet Address"));
    }
  },

  async add(req, res, next) {
    const {
      patient_wallet_address,
      name,
      phoneNo,
      email,
      gender,
      age,
      blood_group,
      DOR,
    } = req.body;

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
      // const gas = await contract.methods
      //   .AddPatient(patient_wallet_address, hash_value, phoneNo)
      //   .estimateGas();
      // const response = await contract.methods
      //   .AddPatient(patient_wallet_address, hash_value, phoneNo)
      //   .send({ from: patient_wallet_address, gas });
      const txObject = {
        to: contarct_address,
        from: patient_wallet_address,
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        gasLimit: web3.utils.toHex(300000),
        data: contract.methods
          .AddPatient(patient_wallet_address, hash_value, phoneNo)
          .encodeABI(),
      };
      const signedTransaction = await web3.eth.accounts.signTransaction(
        txObject,
        "0x" + private_key /* Replace with your private key */
      );
      const rawTransaction = signedTransaction.rawTransaction;
      const result = await web3.eth.sendSignedTransaction(rawTransaction);

      console.log(result);
      res.send(result);
    } catch (error) {
      return next(
        CustomErrorHandler.Forbidden(
          error + "Error occurs sending data to the server!"
        )
      );
    }
  },

  async addReport(req, res, next) {
    try {
      console.log("i am in add report.....");
      const {
        patient_address,
        doctor_address,
        disease,
        doc_phone_no,
        symptom,
        prescription,
        date,
        image,
      } = req.body;
      console.log("-----------------");
      console.log(
        patient_address,
        doctor_address,
        disease,
        doc_phone_no,
        symptom,
        prescription,
        date,
        image
      );
      console.log(date);
      const _json = JSON.stringify({
        doctor_address: doctor_address,
        disease: disease,
        doctor_phone_no: doc_phone_no,
        symptom: symptom,
        prescription: prescription,
        report: image,
        date: date,
      });
      const jsonHash = await ipfsServiceController.sendJsonToIPFS(_json);
      // const jsonHash = "QmXAf9yeQKAbzhMkH5npK9SLUYDiz9dr2bJeY8iMhCnEJ6";
      console.log("JsonHash", jsonHash);

      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const txObject = {
        to: contarct_address,
        from: doctor_address,
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        gasLimit: web3.utils.toHex(300000),
        data: contract.methods
          .addMedicalHistory(patient_address, jsonHash, date)
          .encodeABI(),
      };
      const signedTransaction = await web3.eth.accounts.signTransaction(
        txObject,
        "0x" + private_key /* Replace with your private key */
      );
      const rawTransaction = signedTransaction.rawTransaction;
      const result = await web3.eth.sendSignedTransaction(rawTransaction);

      res.send(result);
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

  async getAllReports(req, res, next) {
    const { wallet_address } = req.params;
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);

    const data = await contract.methods
      .getMedicalInformation(wallet_address)
      .call();
    console.log(data, "sd");

    try {
      const fetchPromises = data.map(async (val) => {
        console.log("jex", parseInt(val), parseInt(val._hex));
        const hash = await contract.methods.tokenURI(parseInt(val)).call();
        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${hash}`,
          { mode: "cors" }
        );
        const temp = await response.json();
        return [parseInt(val), temp.date];
      });
      const result = await Promise.all(fetchPromises);
      res.send(result);
    } catch (err) {
      next(CustomErrorHandler.Forbidden(err + "Try again later!"));
    }
  },
  async getParticularReport(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const hash = await contract.methods.tokenURI(req.params.token).call();
      console.log(hash);
      console.log(`https://gateway.pinata.cloud/ipfs/${hash}`);
      let response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`, {
        mode: "cors",
      });
      response = await response.json();
      res.send(response);
    } catch (error) {
      next(CustomErrorHandler.Forbidden(error));
    }
  },
};

export default patientController;
