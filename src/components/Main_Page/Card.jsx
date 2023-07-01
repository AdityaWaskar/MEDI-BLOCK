import React from "react";
import "./card.css";
// import { useNavigation } from "react-router";
import { useNavigate } from "react-router";

const Card = (props) => {
  const navigate = useNavigate();
  const adminRedirect = () => {
    console.log("admin");
    navigate("./adminLogin");
  };
  const patientRedirect = () => {
    navigate("./patientLogin");
  };
  return (
    <div
      className="cardContainer"
      id={props.id}
      onClick={props.id === "admin" ? adminRedirect : patientRedirect}
    >
      <img src={props.admin} alt="" />
    </div>
  );
};

export default Card;
