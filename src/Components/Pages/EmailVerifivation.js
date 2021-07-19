import React, { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import "./EmailVerification.css";

const EmailVerifiacation = (props) => {
  const firstRef = useRef("");
  const secondRef = useRef("");
  const thirdRef = useRef("");
  const fourthRef = useRef("");
  const fifthRef = useRef("");

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp((prev) => prev + e.target.value);
  };

  const validate = () => {
    if (
      fifthRef.current.value.length > 0 &&
      fourthRef.current.value.length > 0 &&
      thirdRef.current.value.length > 0 &&
      secondRef.current.value.length > 0 &&
      firstRef.current.value.length > 0
    ) {
      props.setFormValidity((prev) => ({
        ...prev,
        emailVerificationForm: true,
      }));
    } else {
      console.log("nf");
      props.setFormValidity((prev) => ({
        ...prev,
        emailVerificationForm: false,
      }));
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props.isThisFormValid) {
      return;
    } else {
      localStorage.setItem("company", JSON.stringify(props.data));
      props.nextStep();
    }
  };

  useEffect(() => {
    console.log("useefect running");
    validate();
  }, [
    otp,
    /* fifthRef.current.value,
    fourthRef.current.value,
    thirdRef.current.value,
    secondRef.current.value,
    firstRef.current.value,
    props.isThisFormValid, */
  ]);

  return (
    <div className="emailverification">
      <h1>Enter your OTP</h1>
      <p>
        For security reason, We need to verify your identity. We sent a 5-digit
        code to <strong>name@domain.com.</strong> please enter it below
      </p>
      <Card>
        <form className="emailverification__form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Enter yout OTP</label>
          <div className="otp__input__group">
            <div className="otp__input__container">
              <input
                type="number"
                name="OTP"
                ref={firstRef}
                onChange={handleChange}
                onKeyUp={(e) => secondRef.current.focus()}
                maxLength={1}
              />
            </div>
            <div className="otp__input__container">
              <input
                type="number"
                name="OTP"
                ref={secondRef}
                onChange={handleChange}
                maxLength={1}
                onKeyUp={(e) => thirdRef.current.focus()}
              />
            </div>
            <div className="otp__input__container">
              <input
                type="number"
                name="OTP"
                ref={thirdRef}
                onChange={handleChange}
                maxLength={1}
                onKeyUp={(e) => fourthRef.current.focus()}
              />
            </div>
            <div className="otp__input__container">
              <input
                type="number"
                name="OTP"
                ref={fourthRef}
                onChange={handleChange}
                maxLength={1}
                onKeyUp={(e) => fifthRef.current.focus()}
              />
            </div>
            <div className="otp__input__container">
              <input
                type="number"
                name="OTP"
                onChange={handleChange}
                ref={fifthRef}
                maxLength={1}
                onKeyUp={(e) => {
                  validate();
                  fifthRef.current.blur();
                }}
              />
            </div>
          </div>
          <div className="form__button__container">
            <input
              type="button"
              value="Back"
              className="form__button back__button"
              onClick={props.previousStep}
            />
            <input
              type="submit"
              value="verify"
              className={`form__button next__button ${
                !props.isThisFormValid && "decativated"
              } `}
            />
          </div>
          <p className="footer__emailverification">
            Dindn't recieve the email? Check your span filter for an email from{" "}
            <span>name@domain.com</span>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default EmailVerifiacation;
