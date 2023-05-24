import Web3 from "web3";
import {
  WALLET_PRIVATE_ADDRESS,
  CONTRACT_ADDRESS,
  INFURA_API_KEY,
} from "../../config.js";
import { hospitalABI } from "../../hospitalABI.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

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
        .getDoctorByPhoneNo(req.params.phone_no)
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

      res.send(data);
    } catch (error) {
      return next(CustomErrorHandler.notFound("Invalid Wallet Address"));
    }
  },

  async pushDocData(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const gas = await contract.methods
        .addDoctor(doctorWalletAddress, metaData, phoneNo)
        .estimateGas();
      contract.methods
        .addDoctor(doctorWalletAddress, metaData, phoneNo)
        .send({ from: account, gas })
        .on("confirmation", async (conformatinNo, receipt) => {
          res.send(receipt);
        });
    } catch (error) {
      return next(
        CustomErrorHandler.Forbidden("Error occurs sending data to the server!")
      );
    }
  },

  async getAllDoctors(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const allAddress = await contract.methods.getDoctorAddresses().call();
      let allInfo = [];
      for (let i = 0; i < allAddress.length; i++) {
        const doctor = await contract.methods
          .GetDoctorByAddress(allAddress[i])
          .call();
        allInfo = allInfo.concat(doctor);
      }
      res.send(allInfo);
    } catch (error) {
      return next(CustomErrorHandler.notFound("Error retriving doctor data!"));
    }
  },

  async addMedicalReport(req, res, next) {
    const doctor_Address = req.params.doctor_Address;
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const gas = await contract.methods
        .getMedicalInformation(doctor_Address)
        .estimateGas();
      contract.methods
        .getMedicalInformation(doctor_Address)
        .send({ from: account, gas })
        .on("confirmation", async (conformatinNo, receipt) => {
          res.send(receipt);
        });
    } catch (error) {
      return next(CustomErrorHandler.badRequest("Invalid input!"));
    }
  },

  async getMedicalReport(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const report = await contract.methods
        .getMedicalInformation(req.params.wallet_Address)
        .call();
      res.send(report);
    } catch (error) {
      return next(
        CustomErrorHandler.notFound("Error while retiriving the data!")
      );
    }
  },

  async addPatientsTreatedByDoctor(req, res, next) {
    const patient_Address = req.params.patient_Address;
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const gas = await contract.methods
        .addpatientsTreatedByDoctor(patient_Address)
        .estimateGas();
      contract.methods
        .addpatientsTreatedByDoctor(patient_Address)
        .send({ from: account, gas })
        .on("confirmation", async (conformatinNo, receipt) => {
          res.send(receipt);
        });
    } catch (error) {
      return next(
        CustomErrorHandler.badRequest(
          "Error while sending the data to the server!"
        )
      );
    }
  },
  async getPatientsTreatedByDoctor(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const allPatients = await contract.methods
        .getpatientsTreatedByDoctor(req.params.doctor_Address)
        .call();
      let allInfo = [];
      for (let i = 0; i < allPatients.length; i++) {
        const patientInfo = await contract.methods
          .GetPatientByAddress(allPatients[i])
          .call();
        allInfo = allInfo.concat(patientInfo);
      }

      res.send(allInfo);
    } catch (error) {
      return next(
        CustomErrorHandler.badRequest(
          "Unable to retrive the data from the server!"
        )
      );
    }
  },
};

export default doctorController;
