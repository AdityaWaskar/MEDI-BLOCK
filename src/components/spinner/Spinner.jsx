import React, { CSSProperties } from "react";
import { TailSpin } from "react-loader-spinner";
// import { SyncLoader } from "react-spinner/SyncLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./spinner.css";

const Spinner = (params) => {
  return (
    <div className={params.active ? "spinnerContainer" : "hideDisplay"}>
      {/* <SyncLoader color="#36d7b7" margin={8} size={50} /> */}
      <ScaleLoader
        color="#36d7b7"
        height={100}
        margin={5}
        radius={100}
        width={6}
      />
    </div>
  );
  // function onCaptchVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new auth.RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           onSignup();
  //         },
  //         "expired-callback": () => {},
  //       },
  //       auth
  //     );
  //   }
  // }

  // return (
  //   <>
  //     <label></label>
  //     <button>Click me</button>
  //   </>
  // );
};

export default Spinner;
