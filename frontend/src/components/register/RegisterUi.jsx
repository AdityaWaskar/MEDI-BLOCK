import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wave from "react-wavify";
import Navigation from "../Main_Page/Navigation";
import "./registerUi.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterUi = (props) => {
  // return (
  const [check, setCheck] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="regiterLoginSection navType1">
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
      <div className="container">
        <div className="loginContainer">
          <div className="section1">
            <div className="title">Admin Register</div>
            <div className="subTitle">
              {" "}
              Hey, Enter your details to create your new account
            </div>
          </div>
          <div className="section2">
            <div className="email">
              <input
                type="email"
                required
                autoFocus
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                placeholder="Enter Email"
                style={{
                  border:
                    props.email.length === 0
                      ? "1px solid lightGrey"
                      : !props.email.includes("@")
                      ? "1px solid red"
                      : "1px solid green",
                }}
              />
            </div>
            <div className="pwd">
              <div className="password-input-container">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Enter Password"
                  className="password-input-field"
                  onChange={(e) => props.setPassword(e.target.value)}
                  style={{
                    border:
                      props.password.length === 0
                        ? "1px solid lightGrey"
                        : props.password.length <= 7
                        ? "1px solid red"
                        : "1px solid green",
                  }}
                />
                <div
                  className="password-input-icon-container"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? (
                    <FiEyeOff className="password-input-icon" />
                  ) : (
                    <FiEye className="password-input-icon" />
                  )}
                </div>
              </div>
            </div>
            <div className="submit">
              <button onClick={props.handleSignup}>Submit</button>
            </div>
            <p>
              Already have an account?{" "}
              <Link to={{ pathname: `/adminLogin` }} className="redirect">
                <b>Login your account</b>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        Copyright &#9400; lalanboy's 2022 | Privacy Policy
      </div>
    </div>
  );
};

export default RegisterUi;
