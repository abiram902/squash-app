import React, { useState, useEffect } from "react";
import "./PersonDetails.css";
import Card from "../../UI/Card";
import CustomInput from "../CustomInput/CustomInput";
import PhoneInput from "../CustomInput/PhoneInput/PhoneInput";

function PersonalDetails(props) {
  const [errMsg, setErrMsg] = useState({
    fullName: "",
    state: "",
    country: "",
    phoneNumber: "",
  });
  const [istouched, setIsTouched] = useState({
    fullName: false,
    state: false,
    country: false,
    phoneNumber: false,
  });

  const personalFormValidity = (bool) => {
    props.setFormValidity((prev) => ({ ...prev, personalForm: bool }));
  };

  const dataList = props.dataList;

  const validateForm = (data, setValidity) => {
    let isValid = true;

    for (let item in errMsg) {
      if (data[item].length < 3) {
        setErrMsg((prev) => ({ ...prev, [item]: "invalid entry" }));
        isValid = false;
      } else {
        setErrMsg((prev) => ({ ...prev, [item]: "" }));
      }
    }
    setValidity(isValid);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      validateForm(props.data, personalFormValidity);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [props.data]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    props.setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isThisFormValid === false) {
      return;
    } else {
      props.nextStep();
    }
  };

  return (
    <div className="personaldetail">
      <h1>Add your personal details</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
        soluta.
      </p>
      <Card>
        <form className="personalDetails__form" onSubmit={handleSubmit}>
          {/* Name Input field */}
          <label htmlFor="fullName">Full Name</label>
          {/* error message */}
          {errMsg.fullName.length > 0 && istouched.fullName === true ? (
            <p className="error__message">{errMsg.fullName}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              name="fullName"
              value={props.data.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Gender radio input field */}
          <label htmlFor="gender">Gender</label>
          <div id="gender">
            <input
              type="radio"
              className="radio"
              id="male"
              value="male"
              name="gender"
              onChange={handleChange}
              checked={props.data.gender === "male"}
            />
            <label className="label" htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              className="radio"
              id="female"
              value="female"
              name="gender"
              onChange={handleChange}
            />
            <label className="label" htmlFor="female">
              Female
            </label>
            <input
              type="radio"
              className="radio"
              id="other"
              value="other"
              name="gender"
              onChange={handleChange}
            />
            <label className="label" htmlFor="other">
              Other
            </label>
          </div>
          {/* Countries with flags custom input  */}
          <label>country</label>
          {errMsg.country.length > 0 && istouched.country === true ? (
            <p className="error__message">{errMsg.country}</p>
          ) : null}
          <CustomInput
            value={props.data.country}
            name="country"
            setFormData={props.setFormData}
            dataList={dataList}
            setIsTouched={setIsTouched}
          />

          {/* State input field */}
          <label>state</label>
          {errMsg.state.length > 0 && istouched.state === true ? (
            <p className="error__message">{errMsg.state}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              name="state"
              value={props.data.state}
              onChange={handleChange}
            />
          </div>

          <label>phone</label>
          {errMsg.phoneNumber.length > 0 && istouched.phoneNumber === true ? (
            <p className="error__message">{errMsg.phoneNumber}</p>
          ) : null}
          <div className="input__container">
            <PhoneInput
              dataList={dataList}
              value={props.data.phoneNumber}
              setFormData={props.setFormData}
              setIsTouched={setIsTouched}
            />
          </div>

          <input
            type="submit"
            className={`form__button fullsize__button ${
              !props.isThisFormValid && "decativated"
            } `}
            value="Next"
            /* onClick={props.nextStep} */
          />
        </form>
        <p className="footer__personalDetail">
          already have an account ? <span>Log in</span>
        </p>
      </Card>
    </div>
  );
}

export default PersonalDetails;
