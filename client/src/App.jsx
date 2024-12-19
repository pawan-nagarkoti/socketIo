import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [textMessage, setTextMessage] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("textMessage", textMessage);
    setTextMessage("");
  };
  return (
    <>
      <form action="" onClick={handleSubmitForm}>
        <input type="text" name="" id="" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button>submit</button>
      </form>
    </>
  );
}

export default App;
