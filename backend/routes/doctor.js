import express from "express";
import { doctorController } from "../controller/index.js  ";
const doctorRoute = express.Router();

doctorRoute.get("/allDoctors", doctorController.all_doctor_address);
doctorRoute.get("/allDoctorInfo", doctorController.getAllDoctors);
doctorRoute.get("/isexist/:wallet_Address", doctorController.is_exist);
doctorRoute.get("/phoneNo?:phone_No", doctorController.data_by_phoneNo);
doctorRoute.get(
  "/wallet:wallet_Address",
  doctorController.data_by_walletAddress
);
doctorRoute.post("/add", doctorController.add);


export default doctorRoute;
