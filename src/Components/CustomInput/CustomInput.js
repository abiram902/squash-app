import React, { useState, useEffect } from "react";
import FlagSelect from "./FlagSelect";
import "./CustomInput.css";

function CustomInput({handleChange, isPhone=false},name) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  const fetchCountries = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        for (let item of data) {
          setCountries((prevState) => [
            ...prevState,
            {
              name: item.name,
              id: item.alpha2Code.toLowerCase(),
              phoneCode: item.callingCodes[0],
            },
          ]);
        }
      }).catch(err=>console.log(err.message));
  };
  

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChangehandler = (e) => {
    let { value } = e.target;
    countries.forEach((item) => {
      if (item.name === value) {
        setSelectedCountry(item);
      }
    });
    handleChange(e);
  };



  //auto complete input
  const mapOut = isPhone ? 'phoneCode' : 'name'
  const datalist = countries.map((item, id) => {
    return <option key={id} value={item[mapOut]} />;
  });

  //conditional rendering
  
  return (
    <div className="custominput__container">
      {selectedCountry && <FlagSelect code={selectedCountry.id} />}
      <input
        className="custominput__input"
        type="text"
        name={name}
        list="countries"
        onChange={handleChangehandler}
      />
      <datalist id="countries">{datalist}</datalist>
    </div>
  );
}

export default CustomInput;
