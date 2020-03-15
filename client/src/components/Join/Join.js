import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <div>
        <h1>Join</h1>
        <div>
          <input
            placeholder=""
            className="joinInput"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder=""
            className="joinInput"
            type="text"
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
