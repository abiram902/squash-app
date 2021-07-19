import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import "./CompanyDetails.css";
import imgPlaceholder from "../../assets/picturePlaceholder.png";

function CompanyDetails(props) {
  const [errMsg, setErrMsg] = useState({
    companyName: "",
    email: "",
    jobTitle: "",
    yearsOfExperiance: "",
  });
  const [accept, setAccept] = useState(false);
  const [istouched, setIsTouched] = useState({
    logo: false,
    companyName: false,
    email: false,
    jobTitle: false,
    yearsOfExperiance: false,
  });

  const companyFormValidity = (bool) => {
    props.setFormValidity((prev) => ({ ...prev, companyForm: bool }));
  };

  const handleCheckBox = (e) => {
    setAccept((prev) => !prev);
  };

  const validateForm = (data, setValidity) => {
    let isValid = true;

    for (let item in errMsg) {
      if (data[item].length < 1) {
        setErrMsg((prev) => ({ ...prev, [item]: "invalid entry" }));
        isValid = false;
      } else if (item === "yearsOfExperiance") {
        if (/\D/g.test(data[item])) {
          setErrMsg((prev) => ({
            ...prev,
            [item]: "invalid input (only numbers are allowed )",
          }));
          isValid = false;
        } else {
          setErrMsg((prev) => ({ ...prev, [item]: "" }));
          isValid = true;
        }
      } else {
        setErrMsg((prev) => ({ ...prev, [item]: "" }));
      }
    }
    setValidity(isValid);
  };
  //using useEffect to validate form
  useEffect(() => {
    const time = setTimeout(() => {
      validateForm(props.data, companyFormValidity);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [props.data]);
  const handleUpload = (e) => {
    props.setFormData((prev) => ({
      ...prev,
      logo: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    props.setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isThisFormValid === false || !accept) {
      console.log("in return of submit");
      return;
    } else {
      props.nextStep();
    }
  };

  return (
    <div className="companydetails">
      <h1>Add your company details</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores,
        quis.
      </p>
      <Card>
        <form className="companyDetails__form">
          <div className="input__container">
            <input
              type="file"
              name="logo"
              id="logo"
              accept="image/*"
              onChange={handleUpload}
            />
            <label htmlFor="logo" className="fileupload__label">
              <div className="placeholder__image__container">
                <img
                  src={props.logo ? props.logo : imgPlaceholder}
                  className="placeholder__image"
                  alt="addimage"
                />
              </div>
              <p className="orange__text">Upload logo for your company</p>
            </label>
          </div>
          <label htmlFor="fullName">Company Name</label>
          {errMsg.companyName && istouched.companyName ? (
            <p className="error__message">{errMsg.companyName}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              name="companyName"
              value={props.data.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <label>Email</label>
          {errMsg.email && istouched.email ? (
            <p className="error__message">{errMsg.email}</p>
          ) : null}
          <div className="input__container">
            <input
              type="email"
              name="email"
              id="email"
              required
              value={props.data.email}
              onChange={handleChange}
            />
          </div>
          <label>Job Title</label>
          {errMsg.jobTitle && istouched.jobTitle ? (
            <p className="error__message">{errMsg.jobTitle}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              required
              value={props.data.jobTitle}
              onChange={handleChange}
            />
          </div>
          <label>Years of Experiance</label>
          {errMsg.yearsOfExperiance && istouched.yearsOfExperiance ? (
            <p className="error__message">{errMsg.yearsOfExperiance}</p>
          ) : null}
          <div className="input__container">
            <input
              type="number"
              name="yearsOfExperiance"
              id="yearsOfExperiance"
              required
              value={props.data.yearsOfExperiance}
              onChange={handleChange}
            />
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              className="checkbox__input"
              checked={accept}
              onChange={handleCheckBox}
            />{" "}
            <label for="accept">
              <p>
                i accept the{" "}
                <span className="orange__text">terms and condition</span>
              </p>
            </label>
          </div>
          <div className="companydetails__button__container">
            <input
              type="button"
              value="Back"
              className="form__button back__button"
              onClick={props.previousStep}
            />
            <input
              type="submit"
              value="send OTP"
              onClick={handleSubmit}
              className={`form__button next__button ${
                !props.isThisFormValid && "decativated"
              } `}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CompanyDetails;
