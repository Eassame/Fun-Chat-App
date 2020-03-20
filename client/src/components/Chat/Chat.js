import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Sidebar from "../Global/Sidebar";
import Message from "./Message";
import FormInput from "../Inputs/FormInput";
import BackArrow from "../Global/BackArrow";

let socket;

const Chat = props => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const data = queryString.parse(props.location.search);

    socket = io(ENDPOINT);

    setName(data.name);
    setRoom(data.room);

    console.log(data);
    socket.emit("join", {
      name: data.name,
      room: data.room
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, props.location.search]);

  useEffect(() => {
    socket.on("message", Message => {
      setMessages([...messages, Message]);
    });
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const signOut = () => {
    props.setAuth(false);
  };

  return (
    <div className="chatPage">
      <Sidebar />
      <div className="container">
        <div className="chatTopBanner">
          <BackArrow onClick={e => signOut(e)} />
          <h1>{room}</h1>
        </div>
        <div className="messages">
          {messages.map((message, i) => (
            <Message
              key={i}
              message={message.text}
              messageTitle={message.user}
              className={name === message.user ? "me" : "notMe"}
            />
          ))}
        </div>
        <div className="textField">
          <FormInput
            value={message}
            name={"message"}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button onClick={e => sendMessage(e)}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
