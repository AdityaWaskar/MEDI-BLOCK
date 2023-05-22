import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./register.css";
import RegisterUi from "./RegisterUi.jsx";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../spinner/Spinner.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const register = () => {
    setSpinner(true);
    clearErrors();
    if (password.length <= 7) {
      setPasswordError("Enter password greater than 7 characters!");
      toast.error("Enter password greater than 7 characters!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
          // toast.success("Account Created Successfully.");
          toast((t) => (
            <span>
              New Account Created.
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/adminLogin");
                }}
                style={{
                  padding: "2px 10px",
                  border: "1px solid gray",
                  background: "#dedede9e",
                  "border-radius": "4px",
                  "margin-left": "5px",
                }}
              >
                Login
              </button>
            </span>
          ));
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email Already Register");
          } else if (err.code === "auth/invalid-email") {
            toast.error("Invalid Email");
          }
        });
    }
    setSpinner(false);
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Spinner active={spinner} />
      <RegisterUi
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={register}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      {/* <button>Login</button> */}
    </>
  );
};

export default Register;
