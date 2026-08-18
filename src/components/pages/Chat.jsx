import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSocketConnection } from "../../utils/socket";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default function Chat() {
  const { targetUserId } = useParams();
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null); // Store single persistent socket instance

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chat = res?.data?.data?.messages;
      const chatMessages = chat.map((msg) => ({
        firstName: msg.senderId.firstName,
        text: msg.text,
        createdAt: msg.createdAt,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!userId || !targetUserId) return;
    fetchChatMessages();
  }, [userId, targetUserId]);

  // on page load, socket connection is made and joinChat event is emitted
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { firstName: loggedInUser.firstName, userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text }) => {
      console.log(`${firstName} sent message: ${text}`);
      setMessages((prev) => [...prev, { firstName, text, createdAt: Date.now() }]);
    });

    return () => {
      // always disconnect socket
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput === null || messageInput.trim() === "") return;

    const socket = socketRef.current;
    socket?.emit("sendMessage", {
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
        <div className="flex-1 space-y-2 overflow-y-auto">
          {messages.map((msg, index) => {
            const isMe = msg.firstName === loggedInUser?.firstName;

            return (
              <div
                key={index}
                className={`flex flex-col gap-0.5 w-full ${isMe ? "items-end" : "items-start"}`}
              >
                <span className="text-[11px] text-fg-muted px-1">
                  {isMe ? "You" : msg.firstName}
                </span>
                <div
                  className={`px-3.5 py-2 text-sm max-w-[75%] break-words rounded-2xl ${
                    isMe
                      ? "bg-surface-2 border  border-fg-muted/10 rounded-br-xs"
                      : "bg-primary rounded-bl-xs"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* input box */}
        <form className="flex justify-between gap-2" onSubmit={sendMessage}>
          <input
            type="text"
            value={messageInput}
            placeholder="Type a message"
            onChange={(e) => setMessageInput(e.target.value)}
            className="input bg-surface-2 border-fg-muted/5 flex-1"
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
