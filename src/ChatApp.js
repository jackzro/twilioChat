import React, { useEffect, useState } from "react";
import Chat from "twilio-chat";
import { Chat as ChatUI } from "@progress/kendo-react-conversational-ui";
import axios from "axios";

function ChatApp({ username }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [clients, setClient] = useState([]);
  const [channels, setChannel] = useState([]);
  const [user, setUser] = useState({
    id: username,
    name: username,
  });

  const handleError = (err) => {
    setError("Could not load chat");
    console.log("masuk error", err);
  };

  const setupChatClient = (client) => {
    setClient(client);
    client
      .getChannelByUniqueName("dave")
      .then((channel) => {
        console.log("first", channel);
        return channel.invite(username).catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        console.log(error.body.code);
        if (error.body.code === 50300) {
          return client.createChannel({
            uniqueName: "msw",
            friendlyName: "msw-global",
            isPrivate: true,
          });
        } else if (error.body.code === 50400) {
          console.log("LOL", error.body);
          channels.on("channelInvited", function (channel) {
            return channel;
          });
        } else if (error.body.code === 54007) {
          console.log("masuk invite");
        } else {
          console.log("masuk");
          handleError(error);
        }
      })
      .then(async (channel) => {
        console.log(channel);
        const member = await channel.getMembers();
        console.log(member);
        // setChannel(channel);
        // setIsLoading(false);
        // channel.getMessages().then(messagesLoaded);
        // channel.on("messageAdded", messageAdded);
      })
      // .then((data) => {
      //   console.log(data);
      // })
      .catch((err) => console.log(err));
  };

  const setupChat = (channelName) => {
    clients
      .getChannelByUniqueName(channelName)
      .then((channel) => channel)
      .catch((error) => {
        if (error.body.code === 50300) {
          console.log("bikin channel");
          return clients.createChannel(
            {
              uniqueName: channelName,
              friendlyName: channelName,
              isPrivate: true,
            },
            {
              Identity: "jack",
            }
          );
        } else {
          handleError(error);
        }
      })
      .then((channel) => {
        setChannel(channel);
        setIsLoading(false);
        channel.getMessages().then(messagesLoaded);
        channel.on("messageAdded", messageAdded);
      })
      .catch(handleError);
  };

  useEffect(() => {
    axios
      .post("/chat/token", {
        identity: username,
      })
      .then(({ data }) => {
        return Chat.create(data.token);
      })
      .then(setupChatClient)
      .catch(handleError);
  }, []);

  const twilioMessageToKendoMessage = (message) => {
    return {
      text: message.body,
      author: { id: message.author, name: message.author },
      timestamp: message.timestamp,
    };
  };

  const messageAdded = (message) => {
    setMessages((prev) => {
      let temp = [...prev, twilioMessageToKendoMessage(message)];
      setMessages(temp);
    });
  };

  const messagesLoaded = (message) => {
    message.items[message.items.length - 1].remove();
    let messagesTemp = [];
    message.items.map((item) => {
      messagesTemp.push(twilioMessageToKendoMessage(item));
    });

    setMessages(messagesTemp);
  };

  const sendMessage = (event) => {
    channels.sendMessage(event.message.text);
  };

  useEffect(() => {
    return () => {
      channels.shutdown();
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  } else if (isLoading) {
    return <p>Loading chat...</p>;
  }
  return (
    <div>
      <div>
        <h1 onClick={() => setupChat("general2")}>general2</h1>
        <h1 onClick={() => setupChat("general1")}>general1</h1>
        <h1 onClick={() => setupChat("msw")}>msw</h1>
      </div>
      <ChatUI
        user={user}
        messages={messages}
        onMessageSend={sendMessage}
        width={500}
      />
    </div>
  );
  //   return (
  //     <div>
  //       <ChatUI />
  //     </div>
  //   );
}

export default ChatApp;
