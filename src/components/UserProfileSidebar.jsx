import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { Icon } from "./Icons";
import ConfirmModal from "./ConfirmModal";
function UserProfileSidebar({
  user,
  connectionData = null,
  currentUserId = null,
  isSelf = false,
}) {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    photoUrl,
    specialization,
    experience,
    company,
    city,
    country,
    gender,
    age,
    contactEmail,
    socialLinks = [],
    _id,
  } = user;

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  const initial = (firstName || "?").charAt(0).toUpperCase();

  const [localConnectionData, setLocalConnectionData] =
    useState(connectionData);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    confirmColor: "btn-primary",
    onConfirm: () => {},
  });

  useEffect(() => {
    setLocalConnectionData(connectionData);
  }, [connectionData]);

  // open modal function
  const openModal = (
    title,
    message,
    onConfirm,
    confirmColor = "btn-primary",
  ) => {
    setModalState({
      isOpen: true,
      title,
      message,
      confirmText: "Confirm",
      confirmColor,
      onConfirm,
    });
  };

  // close modal function
  const closeModal = () =>
    setModalState((prev) => ({ ...prev, isOpen: false }));

  const handleRemoveConnection = async () => {
    try {
      await axios.post(
        `${BASE_URL}/request/remove/user/${_id}`,
        {},
        { withCredentials: true },
      );
      setLocalConnectionData(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleReview = async (status, reqId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        { withCredentials: true },
      );
      setLocalConnectionData({ ...localConnectionData, status });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSendRequest = async (status) => {
    if (!_id) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      const newReq = res.data.data;
      setLocalConnectionData({
        _id: newReq._id,
        status: newReq.status,
        senderId: newReq.fromUserId,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const status = localConnectionData?.status;
  const isSender = localConnectionData?.senderId === currentUserId;
  const reqId = localConnectionData?._id;

  let actionUI = null;

  if (isSelf) {
    actionUI = (
      <button
        onClick={() => navigate("/profile/edit")}
        className="btn-primary w-full flex items-center justify-center"
      >
        Edit Profile
      </button>
    );
  } else if (status === "accepted") {
    actionUI = (
      <button
        onClick={() =>
          openModal(
            "Remove Connection",
            "Are you sure you want to remove this connection?",
            handleRemoveConnection,
            "danger",
          )
        }
        className="btn-primary w-full"
      >
        Connected
      </button>
    );
  } else if (status === "ignored" && isSender) {
    actionUI = (
      <button
        onClick={() =>
          openModal(
            "Unignore User",
            "Are you sure you want to unignore this user?",
            handleRemoveConnection,
            "btn-primary",
          )
        }
        className="btn-primary w-full"
      >
        Ignored
      </button>
    );
  } else if (status === "interested" && isSender) {
    actionUI = (
      <button
        onClick={() =>
          openModal(
            "Cancel Request",
            "Are you sure you want to cancel your connection request?",
            handleRemoveConnection,
            "danger",
          )
        }
        className="btn-primary w-full"
      >
        Request Sent
      </button>
    );
  } else if (status === "interested" && !isSender) {
    actionUI = (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-fg-muted -mt-2">
          Sent you a request
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleReview("rejected", reqId)}
            className="btn-ghost flex-1"
          >
            Reject
          </button>
          <button
            onClick={() => handleReview("accepted", reqId)}
            className="btn-primary flex-1"
          >
            Accept
          </button>
        </div>
      </div>
    );
  } else if (status === "rejected" && !isSender) {
    actionUI = (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-fg-muted -mt-2">
          You rejected this user
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleSendRequest("ignored")}
            className="btn-ghost flex-1"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested")}
            className="btn-primary flex-1"
          >
            Connect
          </button>
        </div>
      </div>
    );
  } else {
    // Stranger or ignored by them (we shouldn't know they ignored us)
    actionUI = (
      <div className="flex gap-2">
        <button
          onClick={() => handleSendRequest("ignored")}
          className="btn-ghost flex-1"
        >
          Ignore
        </button>
        <button
          onClick={() => handleSendRequest("interested")}
          className="btn-primary flex-1"
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        confirmColor={modalState.confirmColor}
        onConfirm={modalState.onConfirm}
      />
      <div className="card p-0 overflow-hidden">
        {/* Profile photo */}
        <div className="relative size-80 w-full overflow-hidden bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${fullName}'s photo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bold text-8xl text-white/80 select-none">
                {initial}
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <h1 className="text-xl font-bold text-fg">{fullName}</h1>

          {/* Connection buttons (or Edit Profile for self) */}
          {actionUI}

          <div className="space-y-3 mt-6 mb-5 text-sm text-fg">
            {/* Role + Experience */}
            {(specialization || experience != null) && (
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>
                  {specialization && (
                    <span className="capitalize">{specialization}</span>
                  )}
                  {specialization && experience != null && ", "}
                  {experience != null && <span>{experience} y.o.exp.</span>}
                </span>
              </div>
            )}

            {/* Company */}
            {company && (
              <div className="flex items-center gap-2">
                <span>🏢</span>
                <span className="capitalize">{company}</span>
              </div>
            )}

            {/* Gender + Age */}
            {(age != null || gender) && (
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>
                  {gender && <span className="capitalize">{gender}</span>}
                  {gender && age != null && ", "}
                  {age != null && <span>{age} y.o.</span>}
                </span>
              </div>
            )}

            {/* Location */}
            {(city || country) && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{[city, country].filter(Boolean).join(", ")}</span>
              </div>
            )}
          </div>

          {/* Contact Email (before social links) */}
          {contactEmail && (
            <div className="pt-5 mb-3 border-t border-surface-2">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2.5 text-sm text-fg hover:text-primary transition-colors group"
              >
                <span className="text-fg-muted group-hover:text-primary transition-colors">
                  <Icon name="email" className="w-4 h-4" />
                </span>
                <span className="truncate hover:underline">{contactEmail}</span>
              </a>
            </div>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div
              className={contactEmail ? "" : "pt-5 border-t border-surface-2"}
            >
              <ul className="space-y-3">
                {socialLinks.map((link, idx) => {
                  return (
                    <li key={idx}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-fg hover:text-primary hover:underline transition-colors group"
                      >
                        <span className="text-fg-muted group-hover:text-primary transition-colors">
                          <Icon name={(link.title || "").toLowerCase().trim()} className="w-4 h-4" />
                        </span>
                        <span className="truncate">{link.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfileSidebar;
