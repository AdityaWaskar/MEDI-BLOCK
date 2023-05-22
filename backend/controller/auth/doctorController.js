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
        .DoctorExists(req.params.wallet_Address)
        .call();

      res.send(data);
    } catch (error) {
      return next(error);
    }
  },

  async all_doctor_address(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const val = await contract.methods.GetDocAdd().call();
      res.send(val);
    } catch (error) {
      return next(error);
    }
  },

  async data_by_phoneNo(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      // if the length is 10 than it search the doctor details by the phone number.
      const data = await contract.methods
        .getDoctorByPhoneNo("9865478589")
        .call(); //getting doctor Detail by phone no

      res.send([
        parseInt(data[0]),
        data[5].split(",")[1],
        data[2].split(",")[0],
        data[3],
        data[4].split(",")[0],
      ]);
    } catch (error) {
      return next(error);
    }
  },

  async data_by_walletAddress(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      // if the length is 10 than it search the doctor details by the phone number.
      const data = await contract.methods
        .GetDoctor(req.params.wallet_Address)
        .call(); //getting doctor Detail by phone no

      res.send([
        parseInt(data[0]),
        data[4].split(",")[1],
        data[1].split(",")[0],
        data[2],
        data[3].split(",")[0],
      ]);
    } catch (error) {
      return next(error);
    }
  },

  async pushDocData(req, res, next) {
    try {
      // const contract = await initializeProvider();
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const gas = await contract.methods
        .addDoctor(
          doctorWalletAddress,
          `${name},${age},${gender}`,
          phoneNo,
          `${qualification == "other" ? otherQualification : qualification},${
            d_degree == "other" ? otherD_degree : d_degree
          }`,
          `${email},${DOR}`,
          hospitalName
        )
        .estimateGas();
      contract.methods
        .addDoctor(
          doctorWalletAddress,
          `${name},${age},${gender}`,
          phoneNo,
          `${qualification == "other" ? otherQualification : qualification},${
            d_degree == "other" ? otherD_degree : d_degree
          }`,
          `${email},${DOR}`,
          hospitalName
        )
        .send({ from: account, gas })
        .on("confirmation", async (conformatinNo, receipt) => {
          res.send(receipt);
        });
    } catch (error) {
      return next(error);
    }
  },

  async getAllDoctors(req, res, next) {
    const contract = new web3.eth.Contract(hospitalABI, contarct_address);
    const allAddress = await contract.methods.GetDocAdd().call();
    let allInfo = [];
    for (let i = 0; i < allAddress.length; i++) {
      const doctor = await contract.methods.GetDoctor(allAddress[i]).call();
      allInfo = allInfo.concat(doctor);
    }

    res.send(allInfo);
  },
};

export default doctorController;
