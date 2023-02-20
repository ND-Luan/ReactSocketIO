import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
function App() {
  const socket = io("http://192.168.0.176:3001", {
    transports: ["websocket"],
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
  });

  const [url, setUrl] = useState("");
  useEffect(() => {
    socket.on("recive_img", (data) => {
      setUrl(data);
      console.log(data);
    });
  }, [socket]);
  console.log(url);
  const sendAccecpt = () => {
    socket.emit("send_accpect", {
      data: {
        message: "Da nhan thanh cong",
        url: url === "" ? null : url.url,
      },
    });
  };
  const sendCancel = () => {
    socket.emit("send_cancel", {
      data: {
        message: "Huy bo thanh cong",
        url: null,
      },
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={url === "" ? null : url.url}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="buttonAccept" onClick={sendAccecpt}>
          Accpect{" "}
        </button>
        <button className="buttonCancel" onClick={sendCancel}>
          Cancel
        </button>
      </header>
    </div>
  );
}

export default App;
