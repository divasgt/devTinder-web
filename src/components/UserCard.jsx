import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { Link } from "react-router";

/*
  User card used in the feed, profile page, and edit profile preview. When 'showActions' is true and the user has an '_id', show Pass and Connect buttons that work.
*/
function UserCard({
  user,
  showActions = true,
  className = "",
  animate = true,
}) {
  const {
    _id,
    firstName,
    lastName,
    about,
    gender = null,
    age = null,
    skills = null,
    photoUrl,
  } = user;
  const dispatch = useDispatch();

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Anonymous";
  const initial = (firstName || "?").charAt(0).toUpperCase();
  const meta = [gender].filter(Boolean).join(" · ");

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className={`card max-w-100 mx-auto p-0 overflow-hidden ${animate ? "animate-fade-in" : ""} ${className}`}
    >
      {/* photo area */}
      <div className="relative h-[220px] w-full overflow-hidden bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-rose-500/20">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${fullName}'s photo`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-7xl text-white/80 select-none">
              {initial}
            </span>
          </div>
        )}
        {_id && (
          <Link to={`/user/${_id}`} className="absolute inset-0 z-10" aria-label={`View ${fullName}'s profile`} />
        )}
        {/* a subtle bottom-to-top fade */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent pointer-events-none"
        />
      </div>

      {/* info section */}
      <div className="p-5 space-y-3">
        <div>
          <h2 className="text-lg font-bold text-fg leading-tight">
            {_id ? (
              <Link to={`/user/${_id}`} className="hover:underline">
                {fullName}
              </Link>
            ) : (
              fullName
            )}
            {age != null && age !== "" && (
              <span className="text-fg-muted font-normal text-base ml-1.5">
                {age}
              </span>
            )}
          </h2>
          {meta && (
            <p className="text-xs text-fg-muted mt-0.5 capitalize">{meta}</p>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={`${s}-${i}`} className="skill">
                {s}
              </span>
            ))}
          </div>
        )}

        {about && (
          <p className="text-sm text-fg-muted leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {showActions && _id && (
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              className="btn-ghost flex-1"
              onClick={() => handleSendRequest("ignored")}
            >
              Ignore
            </button>
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={() => handleSendRequest("interested")}
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
