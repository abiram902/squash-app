import React from "react";
import "./Header.css";

function Header(props) {
  const activeStyle = "header__item active";
  const defaultStyle = "header__item";

  return (
    <div className="header__container">
      <li className={props.step === 1 ? activeStyle : defaultStyle}>
        <span>{props.formValidity.personalForm ? "✔" : 1}</span>
        <p>Personal Details</p>
      </li>
      <li className={props.step === 2 ? activeStyle : defaultStyle}>
        <span>{props.formValidity.companyForm ? "✔" : 2}</span>
        <p>Company Details</p>
      </li>
      <li className={props.step === 3 ? activeStyle : defaultStyle}>
        <span>{props.formValidity.emailVerificationForm ? "✔" : 3}</span>
        <p>Email Verification</p>
      </li>
    </div>
  );
}

export default Header;
