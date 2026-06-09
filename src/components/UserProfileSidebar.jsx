import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function UserProfileSidebar({ user, connectionStatus = null }) {
  const {
    firstName,
    lastName,
    photoUrl,
    specialization,
    experience,
    city,
    country,
    gender,
    age,
    socialLinks = [],
    _id,
  } = user;

  const navigate = useNavigate();
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Anonymous";
  const initial = (firstName || "?").charAt(0).toUpperCase();

  const handleConnectionAction = async (status) => {
    if (!_id) return;
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSocialIcon = (title) => {
    const t = (title || "").toLowerCase().trim();

    if (t === "github") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    }

    if (t === "linkedin") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    }

    if (t === "x" || t === "twitter") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }

    if (t === "instagram") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    }

    if (t === "medium") {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82 6.8 6.8 0 01-6.77-6.82 6.8 6.8 0 016.77-6.82 6.8 6.8 0 016.77 6.82zM20.98 12c0 3.75-2.11 6.82-4.72 6.82-2.6 0-4.72-3.07-4.72-6.82s2.12-6.82 4.72-6.82c2.61 0 4.72 3.07 4.72 6.82zM24 12c0 3.75-.85 6.82-1.9 6.82s-1.9-3.07-1.9-6.82.85-6.82 1.9-6.82 1.9 3.07 1.9 6.82z" />
        </svg>
      );
    }

    if (t === "portfolio") {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }

    if (t === "blog") {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    );
  };

  return (
    <div className="card p-0 overflow-hidden">
      {/* Profile photo - bigger square */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30">
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

        {/* Connection buttons - right below name */}
        {_id && connectionStatus === "connected" ? (
          <div>
            <p className="text-sm text-emerald-600 font-medium">✓ Connected</p>
          </div>
        ) : _id && connectionStatus === "ignored" ? (
          <div>
            <p className="text-sm text-fg-muted font-medium">Ignored</p>
          </div>
        ) : _id && connectionStatus === "pending" ? (
          <div>
            <p className="text-sm text-amber-600 font-medium">Request sent</p>
          </div>
        ) : _id ? (
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-ghost flex-1"
              onClick={() => handleConnectionAction("ignored")}
            >
              Ignore
            </button>
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={() => handleConnectionAction("interested")}
            >
              Connect
            </button>
          </div>
        ) : null}

        {/* Meta info - all with icons, consistent style */}
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
                {experience != null && <span>{experience} y.o.e.</span>}
              </span>
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

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="pt-5 border-t border-surface-2">
            <ul className="space-y-3">
              {socialLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-fg hover:text-primary hover:underline transition-colors group"
                  >
                    <span className="text-fg-muted group-hover:text-primary">
                      {getSocialIcon(link.title)}
                    </span>
                    <span className="truncate">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileSidebar;
