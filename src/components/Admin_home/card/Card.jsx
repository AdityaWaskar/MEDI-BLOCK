import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = (params) => {
  return (
    <tr className="card" key={params.id}>
      <td>{params.id}</td>
      <td>{params.data}</td>
      <td>{params.name}</td>
      <td>{params.phone_no}</td>
      <td>{params.email}</td>
    </tr>
  );
};

export default Card;
