import React, { useEffect, useState } from "react";
import { useChannel } from "./AblyReactEffect";

export default function AblyChatComponent() {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  let inputBox: any = null;
  let messageEnd: any = null;

  const [channel, ably] = useChannel("chat-demo", (message: any) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message] as any);
  });

  const sendChatMessage = (messageText: any) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event: any) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: any) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message: any, index: any) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} data-author={author}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div>
      <div>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>{" "}
        {/* empty element to control scroll to bottom */}
      </div>
      <form onSubmit={handleFormSubmission}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button type="submit" disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
}
// }
