import express from "express";
import { patientController } from "../controller/index.js";
import { doctorController } from "../controller/index.js  ";
const patientRoute = express.Router();

patientRoute.get("/allPatientAddress", patientController.all_patient_address);
patientRoute.get("/allPatientInfo", patientController.getAllPatient);
patientRoute.get("/isexist/:wallet_Address", patientController.is_exist);
patientRoute.get("/phoneNo?:phone_No", patientController.data_by_phoneNo);
patientRoute.get(
  "/wallet:wallet_Address",
  patientController.data_by_walletAddress
);
patientRoute.post("/add", doctorController.add);

export default patientRoute;
