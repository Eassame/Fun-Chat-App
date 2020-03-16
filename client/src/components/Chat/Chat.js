import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

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
    <div>
      <div className="container">
        <div className="messages">
          {messages.map((message, i) => {
            return (
              <div key={i}>
                <p>{message.user}</p>
                <h1>{message.text}</h1>
              </div>
            );
          })}
        </div>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button onClick={e => sendMessage(e)}>Send</button>
        <button onClick={e => signOut(e)}>Sign Out</button>
      </div>
    </div>
  );
};

export default Chat;
