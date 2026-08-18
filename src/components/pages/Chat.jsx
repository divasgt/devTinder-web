import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSocketConnection } from "../../utils/socket";
import { useState } from "react";

export default function Chat() {
  const { targetUserId } = useParams();
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  // on page load, socket connection is made and joinChat event is emitted
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName: loggedInUser.firstName, userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text }) => {
      console.log(`${firstName} sent message: ${text}`);
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      // always disconnect socket
      socket.disconnect();
    };
  }, [loggedInUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput === null || messageInput === "") return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
      text: messageInput,
    });

    setMessageInput("");
  };

  return (
    <div>
      {/* chat container */}
      <div className="mx-auto mt-2 max-w-xl h-[90vh] border border-surface card flex flex-col gap-2">
        <div className="px-4 py-3 border-b border-fg-muted/12 -mx-4 -mt-3">
          <h1 className="font-semibold">{"Chat with " + targetUserId}</h1>
        </div>

        {/* Chat history */}
        <div className="flex-1 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col items-start gap-0.5 ${""}`}>
              <span className="text-xs text-fg-muted ml-1">{msg.firstName}</span>
              <div className="px-3 py-1.5 bg-surface-2 inline-block border border-fg-muted/5 rounded-xl">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* input box */}
        <form className="flex justify-between gap-2" onSubmit={sendMessage}>
          <input
            type="text"
            value={messageInput}
            placeholder="Type a message"
            onChange={(e) => setMessageInput(e.target.value)}
            className="input bg-surface-2 border-fg-muted/5"
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
