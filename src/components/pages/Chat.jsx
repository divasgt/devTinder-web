import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { createSocketConnection } from "../../utils/socket";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default function Chat() {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const socketRef = useRef(null); // Store single persistent socket instance
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chat = res?.data?.data?.messages;
      setTargetUser(res?.data?.targetUser);

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

    socket.emit("joinChat", { firstName: loggedInUser.firstName, targetUserId });

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
      targetUserId,
      text: messageInput,
    });

    setMessageInput("");
  };

  return (
    <div>
      {/* chat container */}
      <div className="mx-auto mt-2 max-w-xl h-[90vh] border border-surface card flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-fg-muted/12 -mx-4 -mt-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center cursor-pointer text-fg-muted hover:text-fg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="font-semibold">
            {targetUser ? `Chat with ${targetUser.firstName} ${targetUser.lastName}` : "Loading..."}
          </h1>
        </div>

        {/* Chat history */}
        <div ref={chatContainerRef} className="flex-1 space-y-2 overflow-y-auto p-2">
          {messages.map((msg, index) => {
            const isMe = msg.firstName === loggedInUser?.firstName;
            const time = new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={index}
                className={`flex flex-col gap-0.5 w-full ${isMe ? "items-end" : "items-start"}`}
              >
                {/* Name and Time */}
                <div className="flex items-baseline gap-2 px-1">
                  <span className="text-[11px] font-medium text-fg-muted">
                    {isMe ? "You" : msg.firstName}
                  </span>
                  <span className="text-[9px] text-fg-muted/60">{time}</span>
                </div>
                <div
                  className={`px-3.5 py-2 text-sm max-w-[75%] break-words rounded-2xl ${
                    isMe
                      ? "bg-primary text-primary-fg rounded-br-xs"
                      : "bg-surface-2 text-fg border border-fg-muted/15 rounded-bl-xs"
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
