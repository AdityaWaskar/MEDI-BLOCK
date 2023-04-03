import React, { useState } from "react";
import "./otpscreen.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { RxCrossCircled } from "react-icons/rx";

const OTPScreen = (params) => {
  return (
    <div id="OTPScreenContainer">
      <div
        className="OTPScreenContainer"
        data-aos="zoom-in"
        data-aos-duration="400"
      >
        <RxCrossCircled
          className="cancleBtn"
          onClick={() => params.setIsCancle(false)}
        />
        <span id="OTPText"> OTP </span>
        <OTPInput
          value={params.otp}
          onChange={params.setOtp}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          className="OTPContainer"
        />
        {console.log("otp = ", params.otp)}
        <ResendOTP
          className="resendOTPContainer"
          onResendClick={() => console.log("Resend clicked")}
        />
        <button className="submitBtn" onClick={params.onOTPVerify}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
