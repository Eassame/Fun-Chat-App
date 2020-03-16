import React from "react";
import { Link } from "react-router-dom";

const Home = props => {
  console.log(props);
  return (
    <div>
      Home
      <div>
        <Link to="/join">Join</Link>
        <Link to="/Chat">Chat</Link>
      </div>
    </div>
  );
};

export default Home;
