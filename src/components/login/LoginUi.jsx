import React, { useState } from "react";
import "./loginui.css";
import { Link } from "react-router-dom";
import Navigation from "../Main_Page/Navigation";
import Wave from "react-wavify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginUi = (props) => {
  const [check, setCheck] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <section className="loginUiContainer navType1">
      {/* <header> */}
      {/* <div className="name">HMS System</div>
        <Link to={{ pathname: `/adminSignUp` }} className="signUp">
          SignUp
        </Link> */}
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
      {/* </header> */}
      <div className="container">
        <div className="loginContainer">
          <div className="section1">
            <div className="title">Admin Login</div>
            <div className="subTitle">
              Hey, Enter your details to Sign in to your account
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
                placeholder="Enter Email / username"
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
            {/* <div className="pwd">
              <input
                type={check ? "text" : "password"}
                id="pwd"
                placeholder="Password"
                value={props.password}
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
            </div> */}
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
            {/* <div className="checkbox">
              <input type="checkbox" onChange={() => setCheck(!check)} />
              <label htmlFor="">show</label>
            </div> */}
            <div className="submit">
              <button onClick={props.handleLogin}>Submit</button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link to={{ pathname: `/adminSignUp` }} className="redirect">
                <b>Create new account</b>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        Copyright &#9400; lalanboy's 2022 | Privacy Policy
      </div>
    </section>
  );
};

export default LoginUi;
