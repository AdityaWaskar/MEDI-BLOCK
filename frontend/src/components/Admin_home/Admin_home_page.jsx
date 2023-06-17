import React, { useState } from "react";
import Navigation from "../navigation/Navigation.jsx";
import Add_doctor from "./Add_doctor.jsx";
import Footer from "../footer/Footer.jsx";
import "./admin_home_page.css";
import ShowData from "./showData/ShowData.jsx";
import { useParams } from "react-router";
import Spinner from "../spinner/Spinner";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router";

const Admin_home_page = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  return (
    <div className="adminSection">
      <Spinner active={spinner} />
      <Navigation email={params.email} />
      <div className="admin_home_container"> 
        <div className="addIcon" onClick={() => navigate("./addDoctor")}>
          <AiOutlineUserAdd />
        </div>
        <ShowData setSpinner={setSpinner} />
      </div>
      <Footer />
    </div>
  );
};

export default Admin_home_page;
