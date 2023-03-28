import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./mainPage.css";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#"
              className={
                activeLink === "" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("")}
            >
              Solutions
            </Nav.Link>
            <Nav.Link
              href="#"
              className={
                activeLink === "" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("")}
            >
              Platform
            </Nav.Link>
            <Nav.Link
              href="#"
              className={
                activeLink === "" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("")}
            >
              Customer stories
            </Nav.Link>
            <Nav.Link
              href="#"
              className={
                activeLink === "" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("")}
            >
              Resources
            </Nav.Link>
            <Nav.Link
              href="#"
              className={
                activeLink === "" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("")}
            >
              Company
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <button className="vvd">
              <span>Contact Us</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
