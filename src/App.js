import React, { useState, useEffect } from "react";
import "./App.css";
import "@progress/kendo-theme-material/dist/all.css";
import Login from "./Login";
import axios from "axios";
import ChatApp from "./ChatApp";
import Chat from "twilio-chat";
import qs from "qs";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setLoggedIn(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://moreedu.id/api/grade",
      // headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("/chat/token", {
    //     identity: "maria",
    //   })
    //   .then(({ data }) => {
    //     return Chat.create(data.token);
    //   })
    //   .then((data) => {
    //     return data.getChannelByUniqueName("maria");
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     data
    //       .invite("jack")
    //       // .getUserDescriptors()
    //       // .getMembers()
    //       .then((data) => {
    //         console.log(data);
    //       })
    //       .catch((err) => console.log(err));
    //     data.getMessages().then((data) => console.log(data));
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const tambah = (username) => {
    axios
      .post(
        "https://chat.twilio.com/v2/Services/IS3fdd8d4db9aa465c9db8dfeb6c9029b7/Channels/CHc6694133938b4b6d91557722251cfcb6/Members",
        qs.stringify({ Identity: "jack" }),
        {
          auth: {
            username: "AC7f65b4b1ab408a2452c79564d5b45310",
            password: "840e7559e2b332a5e07f85dbaac6f2cf",
          },
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
        }
      )
      // axios({
      //   method: "post",
      //   url:
      //     "https://chat.twilio.com/v2/Services/IS3fdd8d4db9aa465c9db8dfeb6c9029b7/Channels/CHc6694133938b4b6d91557722251cfcb6/Members",
      //   auth: {
      //     username: "AC7f65b4b1ab408a2452c79564d5b45310",
      //     password: "840e7559e2b332a5e07f85dbaac6f2cf",
      //   },

      //   data: JSON.stringify({
      //     Identity: "jack",
      //   }),
      //   // headers: { "Content-Type": "application/json" },
      // })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
          <button onClick={tambah}>click</button>
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
