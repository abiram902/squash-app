import React, { useState, useRef } from "react";
import "./PhoneInput.css";
import PhonePlaceholder from "../../../assets/phone.png";
import upTriangle from "../../../assets/upTriangle.png";
import downTriangle from "../../../assets/downTriangle.png";

function PhoneInput(props) {
  const countriesData = props.dataList;
  const [dropdownVisiBility, setDropdownVisibility] = useState(false);
  const buttonRef = useRef("");

  const toggleDropDown = (e) => {
    e.preventDefault();
    setDropdownVisibility((prev) => !prev);
  };

  const handleDropdownSelect = (item, e) => {
    buttonRef.current = item;
    toggleDropDown(e);
  };

  const handleChange = (e) => {
    e.preventDefault();

    props.setFormData((prev) => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
    props.setIsTouched((prev) => ({
      ...prev,
      phoneNumber: true,
    }));
  };
  //dropdown content
  const selectOptions =
    countriesData.length > 0 //checking if the data is fetched fetched from the api
      ? countriesData.map((item) => (
          <div
            value={item.phoneCode}
            id={item.phoneCode}
            className="dropdown__options"
            onClick={(e) => {
              handleDropdownSelect(item, e);
            }}
          >
            <img src={item.flag} alt="flag" width="22" />{" "}
            <p> (+{item.phoneCode})</p>
            <p>{item.name}</p>
          </div>
        ))
      : null;
  return (
    <div className="PhoneInput__container">
      <div className="dropdown__wrapper input__container">
        <button onClick={toggleDropDown}>
          <div className="flag__image__container">
            <img
              src={
                buttonRef.current ? buttonRef.current.flag : PhonePlaceholder
              }
              alt="flag"
              height="100%"
              width="22"
              className="dropdown__country__flag"
            />
          </div>
          <span>
            {buttonRef.current ? <p>+{buttonRef.current.phoneCode} </p> : null}
          </span>
          <span className="dropdown__openclose__triangle">
            <img
              src={dropdownVisiBility ? upTriangle : downTriangle}
              alt=">"
              width="15px"
            />{" "}
          </span>{" "}
        </button>
        {dropdownVisiBility === true && (
          <div className="dropdown">{selectOptions}</div>
        )}
        <input
          type="text"
          name="phoneNumber"
          value={props.value}
          onChange={handleChange}
          id="phone"
        />
      </div>
    </div>
  );
}

export default PhoneInput;
