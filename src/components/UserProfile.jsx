import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProfileAbout from "./UserProfileAbout";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.user);
  const isSelf = currentUser && userId === currentUser._id;

  const [user, setUser] = useState(null);
  const [connectionData, setConnectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/user/${userId}`, {
          withCredentials: true,
        });
        setUser(res?.data?.data);
        setConnectionData(res?.data?.connectionData || null);
      } catch (err) {
        setError(err?.response?.data || "Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4 animate-pulse">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
          <div className="card p-6 space-y-5">
            <div className="w-32 h-32 rounded-full bg-surface-2 mx-auto" />
            <div className="h-5 bg-surface-2 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-surface-2 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-surface-2 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-surface-2 rounded w-1/2 mx-auto" />
          </div>
          <div className="space-y-4">
            <div className="h-24 bg-surface-2 rounded card" />
            <div className="h-24 bg-surface-2 rounded card" />
            <div className="h-24 bg-surface-2 rounded card" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="card p-8 text-center">
          <p className="text-fg-muted text-sm">{error}</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to previous page
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="card p-8 text-center">
          <p className="text-fg-muted text-sm">User not found.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to previous page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-5 px-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-270"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="square"
            stroke-width="2"
            d="M17.5 10.5L12 5l-5.5 5.5M12 6.25v13"
          />
        </svg>
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
        <UserProfileSidebar
          user={user}
          isSelf={isSelf}
          connectionData={connectionData}
          currentUserId={currentUser?._id}
        />
        <UserProfileAbout user={user} />
      </div>
    </div>
  );
}

export default UserProfile;
