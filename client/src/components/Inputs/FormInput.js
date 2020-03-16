import React from "react";

const FormInput = ({ onChange, type, className, placeholder, onKeyPress }) => {
  return (
    <input
      placeholder={placeholder}
      className={`${className} text-input-component`}
      onKeyPress={onKeyPress}
      type={type}
      onChange={onChange}
    />
  );
};

export default FormInput;
