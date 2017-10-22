import React from 'react';

const NumberInput = ({ label, placeholder, onChange, value, min = 0, max = 100000, name = '', children }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <input className="form-control" onChange={onChange} name={name} type="number" value={value} max={max} min={min} placeholder={placeholder} />
        <span className="input-group-addon">{children}</span>
      </div>
    </div>
  );
};

export default NumberInput;
