import React, { useEffect, useState } from "react";
import imgPlaceholder from "../../assets/picturePlaceholder.png";
import "./Success.css";

function Success(props) {
  const [company, setCompay] = useState([]);
  useEffect(() => {
    let res = localStorage.getItem("company");
    setCompay(JSON.parse(res));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    props.setStep(1);
    window.location.reload(false);
  };
  return (
    <div className="success__container">
      <h1 className="orange__text">Successfully registered !!</h1>
      <div className="placeholder__image__container">
        <img
          src={company.logo ? company.logo : imgPlaceholder}
          className="placeholder__image"
          alt="addimage"
        />
      </div>
      <div className="detaila__container">
        <p className="detail">
          <span className="detail__title">Company name :</span>{" "}
          {company.companyName}
        </p>
        <p className="detail">
          <span className="detail__title">Name :</span> {company.fullName}
        </p>
        <p className="detail">
          <span className="detail__title">E-mail :</span> {company.email}
        </p>
        <p className="detail">
          <span className="detail__title">Phone number :</span>{" "}
          {company.phoneNumber}
        </p>
        <p className="detail">
          <span className="detail__title">Job title :</span> {company.jobTitle}
        </p>
        <p className="detail">
          <span className="detail__title">Experiance :</span>{" "}
          {company.yearsOfExperiance} years
        </p>
        <p className="detail">
          <span className="detail__title">State :</span> {company.state}
        </p>
        <p className="detail">
          <span className="detail__title">Country :</span> {company.country}
        </p>
      </div>
      <input
        type="button"
        value="new registration"
        className="form__button next__button"
        onClick={handleClick}
      />
    </div>
  );
}

export default Success;
