import React, { useState, useEffect, useRef } from "react";
import FlagSelect from "./FlagSelect";
import "./CustomInput.css";

function CustomInput(props) {
  const countries = [...props.dataList];
  const [selectedCountry, setSelectedCountry] = useState();

  //conditional rendering

  const handleChangehandler = (e) => {
    let { value, name } = e.target;

    countries.forEach((item) => {
      if (item.name === value) {
        setSelectedCountry(item);
      }
    });
    props.setIsTouched((prev) => ({ ...prev, [name]: true }));
    props.setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //auto complete input

  const datalist =
    countries.length > 0 &&
    countries.map((item, id) => {
      return <option key={id} value={item.name} />;
    });

  return (
    <div className="custominput__container">
      {selectedCountry ? (
        <FlagSelect src={selectedCountry.flag} />
      ) : (
        <FlagSelect code="in" />
      )}
      <input
        className="custominput__input"
        type="text"
        name="country"
        list="countries"
        onChange={handleChangehandler}
        value={props.value}
        required
      />
      <datalist id="countries">{datalist}</datalist>
    </div>
  );
}

export default CustomInput;
