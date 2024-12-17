import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Fetch data from Node.js server
    axios
      .get("http://localhost:3000/api/data")
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Message from Node.js: {data}</p>
    </div>
  );
}

export default App;
