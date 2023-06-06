import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./config.js";
import doctorRoute from "./routes/doctor.js";
import patientRoute from "./routes/patient.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);

app.use(express.json());
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
