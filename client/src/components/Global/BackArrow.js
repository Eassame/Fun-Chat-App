import React from "react";

const BackArrow = ({ onClick }) => {
  return (
    <div className="arrow" onClick={onClick}>
      <div className="arrow-top"></div>
      <div className="arrow-bottom"></div>
    </div>
  );
};

export default BackArrow;
