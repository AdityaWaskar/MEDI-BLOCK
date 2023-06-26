import React, { useState } from "react";
import "./doctor_services.css";
import Patient_List from "./patient_list/Patient_List";
import Doctor_Profile from "./profile/Doctor_Profile";
import Doctor_navigation from "./doctorNavigation/Doctor_navigation";
import { useParams, useNavigate } from "react-router";
import Spinner from "../spinner/Spinner";
import AddReport from "./add_report/AddReport";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

const DoctorServices = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(params.service);
  const [spinner, setSpinner] = useState(false);

  const handlePageChange = (page) => {
    if (page === "dashboard") {
      navigate(`../doctor_page/${params.email}`);
      return;
    }
    navigate(
      // `${process.env.REACT_FRONT_APP_BASE_URL}doctor/${"asdf@"}/${page}`
      `../doctor_page/${params.email}/${page}`
    );
    setCurrentPage(page);
  };

  const renderRightComponent = () => {
    switch (currentPage) {
      case "patientList":
        return <Patient_List setSpinner={setSpinner} />;
      case "addReport":
        return <AddReport setSpinner={setSpinner} />;
      case "profile":
        return <Doctor_Profile setSpinner={setSpinner} />;
      default:
        return null;
    }
  };

  return (
    <section>
      <Spinner active={spinner} />
      <Navigation email={params.email} />
      <div className="mainContainer">
        <div className="mainSection">
          <div className="leftContainer">
            <Doctor_navigation onPageChange={handlePageChange} />
          </div>
          <div className="rightContainer">{renderRightComponent()}</div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default DoctorServices;
