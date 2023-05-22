import express from "express";
import { doctorController } from "../controller/index.js  ";
const doctorRoute = express.Router();

doctorRoute.get("/allDoctors", doctorController.all_doctor_address);
doctorRoute.get("/isexist/:wallet_Address", doctorController.is_exist);
doctorRoute.get("/doctor/:phone_No", doctorController.data_by_phoneNo);
doctorRoute.get(
  "/doctor/:wallet_Address",
  doctorController.data_by_walletAddress
);

doctorRoute.get("/allDoctorInfo", doctorController.getAllDoctors)

export default doctorRoute;
