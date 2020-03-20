import React from "react";

const Sidebar = ({ title }) => {
  const names = [
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae",
    "eassae"
  ];
  return (
    <div className="SideNav">
      <div>
        <p>{title}</p>
        <ul className="list">
          {names.map(name => (
            <li>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
