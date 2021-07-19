import React from "react";
import "./FlagSelect.css";

function FlagSelect(props) {
  return (
    <div className="country__select__input">
      <img
        src={
          props.src ? props.src : `https://flagcdn.com/w80/${props.code}.png`
        }
        width="22"
        height="100%"
        alt="South Africa"
      />
    </div>
  );
}

export default FlagSelect;
