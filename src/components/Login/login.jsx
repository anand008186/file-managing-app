import React, { useState, useEffect } from "react";
import "./login.css";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const navigate = useNavigate();
  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      alert("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  // Sent OTP
  const signin = async (e) => {
    e.preventDefault();
    if (mynumber === "" || mynumber.length < 12)
      return alert("Enter your valid number with countrycode");

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    try {
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        mynumber,
        appVerifier
      );
      console.log(confirmationResult);
      if (confirmationResult) {
        window.confirmationResult = confirmationResult;
        setshow(true);
        alert("code sent");
      }
    } catch (error) {
      alert(error);
      window.location.reload();
    }
  };

  // Validate OTP
  const ValidateOtp = async () => {
    let confirmationResult = window.confirmationResult;
    if (otp === null || confirmationResult === null) {
      return;
    } else {
      try {
        await confirmationResult.confirm(otp);
        alert("Logged in successfully");
        navigate("/dashboard");
      } catch (error) {
        alert("Wrong code");
      }
    }
  };

  return (
    <div className="login-container container vh-100 d-flex justify-content-center align-items-center">
      <div className="card py-4 px-4">
        <div className="text-center">
          <h1>Sign in</h1>
        </div>
        <div style={{ display: !show ? "block" : "none" }}>
          <div className=" mt-3">
            {" "}
            <span className="info-text">
              Please enter your mobile number
            </span>{" "}
          </div>
          <div className="position-relative mt-3 form-input">
            {" "}
            <input
              className="form-control"
              value={mynumber}
              onChange={(e) => {
                setnumber(e.target.value);
              }}
              placeholder="+917642637272 (example)"
            />{" "}
            <i className="bi bi-telephone-fill"></i>{" "}
          </div>
          <div id="recaptcha-container"></div>
          <div className=" mt-5 d-flex justify-content-between align-items-center">
            {" "}
            <span>Login or Signup</span>{" "}
            <button className="go-button" onClick={signin}>
              <i className="bi bi-arrow-right"></i>
            </button>{" "}
          </div>
        </div>
        <div style={{ display: show ? "block" : "none" }}>
          <div className=" mt-3">
            {" "}
            <span className="info-text">Enter the otp sent</span>{" "}
          </div>
          <div className="position-relative mt-3 form-input">
            {" "}
            <input
              className="form-control"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
              placeholder="Enter the otp"
            />{" "}
          </div>
          <div className=" mt-5 ">
            {" "}
            <button className="btn btn-success " onClick={ValidateOtp}>
              Verify
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
