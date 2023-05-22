import React from "react";
import "./services.css";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";
import { CgWebsite } from "react-icons/cg";
import { Player } from "@lottiefiles/react-lottie-player";
import himanshu_img from "./contributers/himanshu.png";
import aditya_img from "./contributers/himanshu.png";
import tanmay_img from "./contributers/himanshu.png";
import ritesh_img from "./contributers/himanshu.png";
import Navigation from "../Main_Page/Navigation";
import Footer from "../footer/Footer";
import Wave from "react-wavify";
import Card from "./Card";
import { info, guide } from "./info";
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
                <div className="title1">The Team Behind MEDI-BLOCK</div>
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
                  <img src={guide.image} className="team-img" alt="pic" />
                  <h3>{guide.name}</h3>
                  <div className="team-info">
                    <p>{guide.qualification}</p>
                  </div>
                  <p> {guide.description}</p>
                  <ul className="team-icon">
                    <li>
                      <a href={guide.gmail} className="twitter">
                        <SiGmail size={15} />
                      </a>
                    </li>
                    <li>
                      <a href={guide.linkeIn} className="linkedIn">
                        <FaLinkedinIn size={15} />
                      </a>
                    </li>
                    <li>
                      <a href={guide.github} className="github">
                        <VscGithub size={18} />
                      </a>
                    </li>
                    <li>
                      <a href={guide.leetcode} className="leetcode">
                        <CgWebsite size={15} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="section-title">
              <h3 className="section-title-heading">Meet the Executive Team</h3>
            </div>
            <div className="maincontain">
              {info.map((s) => (
                <Card
                  key={s.id}
                  profile={aditya_img}
                  qualificatoin={s.qualification}
                  name={s.name}
                  description={s.description}
                  link1={s.gmail}
                  link2={s.linkeIn}
                  link3={s.github}
                  link4={s.twitter}
                  image={s.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Services;
