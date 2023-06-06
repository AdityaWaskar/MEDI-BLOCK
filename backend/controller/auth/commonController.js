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

const commonController = {
  async addMedicalReport(req, res, next) {
    const {
      report_pdf,
      doctor_address,
      disease,
      doc_phoneNO,
      symptoms,
      prescription,
      report,
      date,
    } = req.body;
    try {
      let fileHash = await ipfsServiceController.sendFileToIPFS(report_pdf);

      const json_data = JSON.stringify({
        doctor_address: doctor_address,
        disease: disease,
        doc_phoneNO: doc_phoneNO,
        symptoms: symptoms,
        prescription: prescription,
        report: `https://gateway.pinata.cloud/ipfs/${fileHash}`,
        data: date,
      });

      let hash = ipfsServiceController.sendJsonToIPFS(json_data);
      console.log(hash);

      const contract = new web3.eth.Contract(hospitalABI, contarct_address);

      // Create the transaction object
      const txObject = {
        to: contarct_address,
        from: adr,
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        gasLimit: web3.utils.toHex(300000),
        data: contract.methods
          .addMedicalHistory(patientWalletAddress, hashValue)
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
      return next(CustomErrorHandler.badRequest("Invalid input!"));
    }
  },

  async getMedicalReport(req, res, next) {
    try {
      const contract = new web3.eth.Contract(hospitalABI, contarct_address);
      const report = await contract.methods
        .getMedicalInformation(req.params.wallet_Address)
        .call();
      try {
        const fetchPromises = report.map(async (val) => {
          console.log("jex", parseInt(val), parseInt(val._hex));
          const hash = await contract.methods.tokenURI(parseInt(val)).call();
          const response = await fetch(
            `https://gateway.pinata.cloud/ipfs/${hash}`,
            { mode: "cors" }
          );
          const temp = await response.json();
          return [parseInt(val), temp.data];
        });
        const result = await Promise.all(fetchPromises);
        res.send(result);
      } catch (err) {
        CustomErrorHandler.notFound(
          "Error while retriving the from ipfs server!"
        );
      }
      res.send(report);
    } catch (error) {
      return next(
        CustomErrorHandler.notFound("Error while retiriving the data!")
      );
    }
  },
};

export default commonController;
