import React from "react";

const Message = ({ message, messageTitle, className }) => {
  return (
    <div className={`messageBox ${className}`}>
      <p>{messageTitle}</p>
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
