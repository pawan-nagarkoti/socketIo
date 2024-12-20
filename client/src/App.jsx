import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [textMessage, setTextMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("textMessage", textMessage);

    await socket.emit("send_message", textMessage);

    setMessageList((previousMessage) => [...previousMessage, textMessage]);

    setTextMessage("");
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
      // alert("hiii");
    };

    socket.on("receive_message", receiveMessageHandler);

    // Clean up the listener when the component unmounts
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input type="text" name="" id="" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button type="submit">submit</button>
      </form>

      {messageList?.map((v, i) => {
        return <div key={i}>{v}</div>;
      })}
    </>
  );
}

export default App;
