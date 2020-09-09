import React, { useState } from "react";
import "./App.css";
import "@progress/kendo-theme-material/dist/all.css";
import Login from "./Login";
import ChatApp from "./ChatApp";
import qs from "qs";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setLoggedIn(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="app">
      {loggedIn ? (
        <div>
          <Login
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            username={username}
          />
        </div>
      ) : (
        <div>
          <p>Logged in as {username}</p>
          <ChatApp username={username} />
        </div>
      )}
    </div>
  );
}

export default App;
