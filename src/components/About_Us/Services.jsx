import React from "react";
import "./services.css";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";
import { Player } from "@lottiefiles/react-lottie-player";
import himanshu_img from "./himanshu.png";
import aditya_img from "./aditya_img.png";
import tanmay_img from "./tanmay_img.png";
import ritesh_img from "./ritesh_img.png";
import saurabh_sir_img from "./saurabh_sir_img.png";
import Navigation from "../Main_Page/Navigation";
import Footer from "../footer/Footer";
import Wave from "react-wavify";
function Services() {
  let message = `We believe that collaboration and teamwork are essential to achieving our goals, and we work closely with each other to ensure that we are all on the same page. We are committed to transparency and open communication throughout the project, and we welcome feedback and suggestions from all. We recognize the importance of sustainability and social responsibility, and we are committed to incorporating these values into every aspect of our project. We are excited to embark on this journey and look forward to working together to make a positive impact on the world.`;
  return (
    <div className="navType1">
      <Navigation />
      <Wave
        className="wave"
        fill="#b598f9"
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <section className="section-white aboutUsContainer">
        <div className="container">
          <div className="row">
            <div className="heading">
              <div className="title">
                <div className="title1">
                  The Team Behind HSM Using BlockChain
                </div>
                <p className="section-subtitle">{message}</p>
              </div>
              <div className="subtitle-img">
                <Player
                  src="https://assets6.lottiefiles.com/packages/lf20_qp1q7mct.json"
                  className="player"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="section-title">
              <h3 className="section-title-heading">Under The Guidence of </h3>
            </div>
            <div className="row2">
              <div className="infoCard">
                <div className="team-item">
                  <img src={saurabh_sir_img} className="team-img" alt="pic" />
                  <h3>Saurabh Suman</h3>
                  <div className="team-info">
                    <p>Professor at University of Mumbai</p>
                  </div>
                  <p>
                    We believe that collaboration and teamwork are essential to
                    achieving our goals, and we work closely with each other to
                    ensure that we are all on the same page.
                  </p>
                  <ul className="team-icon">
                    <li>
                      <a href="saurabh0150@gmail.com" className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="linkedin.com/in/saurabh-suman-38364426"
                        className="linkedIn"
                      >
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="section-title">
              <h3 className="section-title-heading">
                Meet the Executive Team{" "}
              </h3>
            </div>
            <div className="maincontain">
              <div className="infoCard">
                <div className="team-item">
                  <img src={aditya_img} className="team-img" alt="pic" />
                  <h3>Aditya Waskar</h3>
                  <div className="team-info">
                    <p>BE-INFORMATION TECHNOLOGY</p>
                  </div>
                  <p>
                    I have a strong passion for technology and ability to learn
                    and work with programming languages, frameworks, and tools
                    used in web development, and have a creative individual with
                    a focus on building user-friendly and visually appealing
                    websites and applications.
                  </p>
                  <ul className="team-icon">
                    <li>
                      <a href="adityawaskar03@gmail.com" className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="linkedin.com/in/aditya-waskar-56682b205"
                        className="linkedIn"
                      >
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* ------------------------------------------------ */}
              <div className="infoCard">
                <div className="team-item">
                  <img src={tanmay_img} className="team-img" alt="pic" />
                  <h3>Tanmay Jha</h3>
                  <div className="team-info">
                    <p>BE-INFORMATION TECHNOLOGY</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto sequi cupiditate Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Architecto sequi cupiditate
                    adipisicing elit. Architecto sequi cupiditate adipisicing
                    elit. Architecto sequi cupiditate
                  </p>
                  <ul className="team-icon">
                    <li>
                      <a href="tanmayjha08@gmail.com" className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="linkedin.com/in/tanmay-jha-5587271b9"
                        className="linkedIn"
                      >
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="tanmayjha-26.web.app/ " className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* ------------------------------------------------ */}
              <div className="infoCard">
                <div className="team-item">
                  <img src={himanshu_img} className="team-img" alt="pic" />
                  <h3>Himanshu Upadhyay</h3>
                  <div className="team-info">
                    <p>BE-INFORMATION TECHNOLOGY</p>
                  </div>
                  <p>
                    An enthusiastic person with coding and leadership skills
                    pursuing BE in Information Technology, eager to learn and
                    implement new technology. Always willing to innovate new
                    things which can replace existing technology. write an about
                    me
                  </p>
                  <ul className="team-icon">
                    <li>
                      <a href="himanshu662187@gmail.com" className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="linkedin.com/in/himanshu-upadhyay-17a756205"
                        className="linkedIn"
                      >
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* ------------------------------------------------ */}
              <div className="infoCard">
                <div className="team-item">
                  <img src={ritesh_img} className="team-img" alt="pic" />
                  <h3>Ritesh Singh</h3>
                  <div className="team-info">
                    <p>BE-INFORMATION TECHNOLOGY</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto sequi cupiditate Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Architecto sequi cupiditate
                    adipisicing elit. Architecto sequi cupiditate adipisicing
                    elit. Architecto sequi cupiditate
                  </p>
                  <ul className="team-icon">
                    <li>
                      <a href="ritesh.a.singh@slrtce.in" className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="linkedIn">
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------ */}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Services;
