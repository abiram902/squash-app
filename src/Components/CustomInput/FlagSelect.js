import React from 'react'
import './FlagSelect.css'

function FlagSelect(props) {
    
    return (
        <div className="country__select__input" >
            <img
  src={`https://flagcdn.com/w80/${props.code}.png`}
  width="24"
  
  alt="South Africa"/>
        </div>
    )
}

export default FlagSelect
