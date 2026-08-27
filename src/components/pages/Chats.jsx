import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BASE_URL } from "../../utils/constants";
import Avatar from "../others/Avatar";
import { EmptyState } from "../others/States";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((store) => store.user);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/chats`, {
        withCredentials: true,
      });
      setChats(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchChats();
    }
  }, [loggedInUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      // <div className="max-w-2xl mx-auto mt-6 text-center card py-12">
      //   <h2 className="text-xl font-bold mb-2">No conversations yet</h2>
      //   <p className="text-fg-muted mb-4">
      //     When you connect with someone, your chats will appear here.
      //   </p>
      //   <Link to="/connections" className="btn-primary inline-flex">
      //     View Connections
      //   </Link>
      // </div>
      <EmptyState
        title="No chats yet"
        body="When you connect with someone, your chats will appear here."
        cta={{ to: "/connections", label: "View Connections" }}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 flex flex-col gap-4 px-2 sm:px-0">
      <h1 className="text-2xl font-bold">Your Chats</h1>

      <div className="flex flex-col gap-2">
        {chats.map((chat) => {
          // Find the other participant
          const targetUser = chat.participants.find((p) => p._id !== loggedInUser._id);

          if (!targetUser) return null;

          const lastMessage = chat.messages[chat.messages.length - 1];
          const time = lastMessage
            ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <Link
              key={chat._id}
              to={`/chat/${targetUser._id}`}
              className="card p-4 hover:bg-surface-2 transition-colors duration-200 cursor-pointer flex items-center gap-4 border border-transparent hover:border-fg-muted/10 group"
            >
              <Avatar user={targetUser} className="size-12 rounded-sm" />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h2 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                    {targetUser.firstName} {targetUser.lastName}
                  </h2>
                  <span className="text-xs text-fg-muted whitespace-nowrap ml-2">{time}</span>
                </div>

                <p className="text-sm text-fg-muted truncate">
                  {lastMessage ? (
                    <span
                      className={
                        lastMessage.senderId === loggedInUser._id ? "" : "font-medium text-fg/90"
                      }
                    >
                      {lastMessage.senderId === loggedInUser._id ? "You: " : ""}
                      {lastMessage.text}
                    </span>
                  ) : (
                    <span className="italic">No messages yet</span>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
