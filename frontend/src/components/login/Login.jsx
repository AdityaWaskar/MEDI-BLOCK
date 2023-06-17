import React, { useState, useEffect } from "react";
// import fire from "../../fire.js";
import { auth } from "../../firebase.config.js";
import toast, { Toaster } from "react-hot-toast";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./login.css";
import LoginUi from "./LoginUi";
import { useNavigate } from "react-router";
import Spinner from "../spinner/Spinner.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
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

  const handleLogin = async () => {
    clearErrors();
    setSpinner(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate(`/admin_page/${email}`);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("Invalid Password.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid Email");
      } else {
        toast.error("Invalid Credentials.");
      }
      // alert(err.message);
    }
    setSpinner(false);
  };

  // const handleSignup = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "auth/email-already-use":
  //         case "auth/invalid-email":
  //           setEmailError(err.message);
  //           alert(err.message);
  //           break;
  //         case "auth/weak-password":
  //           setPasswordError(err.message);
  //           alert(err.message);
  //           break;
  //       }
  //     })
  //     .then((val) => {
  //       console.log(val);
  //       console.log("account created");
  //     });
  // };

  const handleLogout = () => {
    // fire.auth().signOut();
  };

  // const authListner = () => {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser("");
  //     }
  //   });
  // };

  useEffect(() => {
    // authListner();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <Spinner active={spinner} />
      <LoginUi
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </>
  );
};

export default Login;
