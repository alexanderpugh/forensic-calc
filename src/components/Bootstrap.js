import React from 'react';

export const Container = ({ children, isFluid = false }) => {
  return <div className={isFluid ? 'container-fluid' : 'container'}>{children}</div>
};

export const Row = ({ children }) => {
  return <div className="row">{children}</div>
};

export const Col = ({ children, small = 12, medium, large}) => {
  const className = `col col-sm-${small} col-md-${medium || small} col-lg-${large || small}`;

  return <div className={className}>{children}</div>
};

export const Button = ({ onClick, text, size = 'md', type = 'default', name = '', disabled = false }) => {
  const className = `btn btn-${type} btn-${size}`;

  return (
    <button onClick={onClick} className={className} name={name} disabled={disabled}>{text}</button>
  );
};

export const Panel = ({ title, children, type = 'default' }) => {
  const className = `panel panel-${type}`
  const inlineStyle = { marginTop: '20px' };

  return (
    <div className={className} style={inlineStyle}>
      <div className="panel-heading">
        <h3 className="panel-title">{title}</h3>
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
};

export const CheckBox = ({ text , onChange, checked }) => {
  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} /> <b>{text}</b>
      </label>
    </div>
  );
};
