import React from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import Card from "../home/card/Card";
import "./doctor_home_page.css";

const data = [
  [1, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [2, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
  [3, "Aditya Waskar", "aditya@gmail.com", "20/05/2023", "9082563554"],
];

const Doctor_home_page = () => {
  return (
    <div className="doctor_home_container">
      <Navigation />
      <div className="patient_list">
        <center>
          <p>Patient List</p>
        </center>
        <table className="allCards">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Email Id</th>
            </tr>
            {data.map((data) => (
              <Card
                key={data[0]}
                id={data[0]}
                name={data[1]}
                email={data[2]}
                phone_no={data[4]}
                date={data[3]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctor_home_page;
