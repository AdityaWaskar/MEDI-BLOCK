import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "./hospital.png";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavBar } from "./NavBar.jsx";
import "./banner.css";
const Banner = () => {
  return (
    <div className="main_page">
      <>
        <NavBar />
        <section className="banner" id="home">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6} xl={7}>
                <h1>{`HealthCare system using Bloakchain `}</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, rem quisquam mollitia consectetur necessitatibus
                  animi. Cum perspiciatis amet minima. Officiis porro nisi eaque
                  nihil incidunt quaerat rem numquam perspiciatis voluptas.
                </p>
                <button
                  className="tagline"
                  onClick={() => console.log("Connect")}  
                >
                  Request Demo <ArrowRightCircle size={25}></ArrowRightCircle>
                </button>
              </Col>
              <Col xs={12} md={6} xl={5}>
                <img src={headerImg} alt="Header Img" />
              </Col>
            </Row>
          </Container>
        </section>
      </>
    </div>
  );
};

export default Banner;
