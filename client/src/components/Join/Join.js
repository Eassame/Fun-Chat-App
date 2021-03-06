import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import FormInput from "../Inputs/FormInput";

const Join = props => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  console.log(props);
  return (
    <div>
      <div className="joinOuter">
        <h1 className="title">Join a Chat Room</h1>
        <p>
          To join a chat room, please enter your name, and the name of the chat
          room
        </p>

        <FormInput
          placeholder="Name"
          className="joinInput"
          type="text"
          name={"name"}
          onChange={e => setName(e.target.value)}
        />

        <FormInput
          placeholder="Chat Room Name"
          className="joinInput"
          type="text"
          name={"room"}
          onChange={e => setRoom(e.target.value)}
          onKeyPress={e => {
            console.log(e.key === "Enter");
            console.log(name);
            console.log(room);
            if (e.key === "Enter" && name && room) {
              props.history.push(`/chat?name=${name}&room=${room}`);
            }
          }}
        />

        <Link
          onClick={e =>
            !name || !room ? e.preventDefault() : props.setAuth(true)
          }
          to={`/chat?name=${name}&room=${room}`}
        >
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Join);
