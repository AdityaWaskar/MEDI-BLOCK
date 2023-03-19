import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./register.css";
import RegisterUi from "./RegisterUi.jsx";
// import { getDatabase, ref, set } from "firebase/database";

const Register = () => {
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
    clearErrors();
    if (password.length < 7) {
      setPasswordError("Enter password greater than 7 characters!");
      alert("Enter password greater than 7 characters!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((err) => console.log(err.message));
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logging Successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    // authListner();
  }, []);

  return (
    <>
      <RegisterUi
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={login}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </>
  );
};

export default Register;
