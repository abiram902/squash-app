import React, { useState } from "react";
import "./PersonDetails.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Card from "../UI/Card";
import CustomInput from "./CustomInput/CustomInput";

function PersonalDetails(props) {
  const [phoneNumber, setPhoneNumber] = useState();
  
  
  return (
    <Card>
      PersonalDetails
      <form className="personalDetails__form">
        {/* Name Input field */}
        <label htmlFor="fullName">Full Name</label>
        <div className="input__container">
          <input
            type="text"
            name="fullName"
            value={props.data.fullName}
            onChange={props.changeHandler}
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
            onChange={props.changeHandler}
          />
          <label className="label" htmlFor="male">
            male
          </label>
          <input
            type="radio"
            className="radio"
            id="female"
            value="female"
            name="gender"
            onChange={props.changeHandler}
          />
          <label className="label" htmlFor="female">
            female
          </label>
          <input
            type="radio"
            className="radio"
            id="other"
            value="other"
            name="gender"
            onChange={props.changeHandler}
          />
          <label className="label" htmlFor="other">
            other
          </label>
        </div>
        {/* Countries with flags custom input  */}
        <label>country</label>
        <CustomInput value={props.data.country} handleChange={props.changeHandler} />
        {/* State input field */}
        <label>state</label>
        <div className="input__container">
          <input
            type="text"
            name="state"
            value={props.data.state}
            onChange={props.changeHandler}
          />
        </div>
        <label>phone</label>
        <div className="input__container">
          <CustomInput 
          value={props.data.phoneNumber}
          handleChange={props.changeHandler}
          isPhone={true}/>
        </div>
        <input
          type="button"
          className="form__button"
          value="next"
          onClick={props.nextStep}
        />
      </form>
    </Card>
  );
}

export default PersonalDetails;
