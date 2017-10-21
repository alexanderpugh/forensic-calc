import React from 'react';

const NumberInput = ({ label, placeholder, onChange, value, min = 0, max = 100000, name = '' }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" onChange={onChange} name={name} type="number" value={value} max={max} min={min} placeholder={placeholder} />
    </div>
  );
};

export default NumberInput;
