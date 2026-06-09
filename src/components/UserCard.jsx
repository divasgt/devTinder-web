import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { Link } from "react-router";

/*
  User card used in the feed, profile page, and edit profile preview.
  When 'showActions' is true and the user has an '_id', show Ignore and Connect buttons.
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
    gender,
    age,
    skills,
    photoUrl,
    specialization,
    experience,
    company,
    city,
    country,
  } = user;
  const dispatch = useDispatch();

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Anonymous";
  const initial = (firstName || "?").charAt(0).toUpperCase();

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
      className={`w-full max-w-100 mx-auto ${animate ? "animate-fade-in" : ""} ${className}`}
    >
      <div className="card relative p-0 overflow-hidden aspect-[3/4] shadow-xl">
        {/* photo area — background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-rose-500/20">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${fullName}'s photo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bold text-7xl text-white/80 select-none">
                {initial}
              </span>
            </div>
          )}
        </div>

        {/* gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-0"
        />

        {/* clickable link covering entire photo and text */}
        {_id && (
          <Link
            to={`/user/${_id}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${fullName}'s profile`}
          />
        )}

        {/* info section overlaid at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 pt-12 space-y-3 z-20 pointer-events-none">
          {/* Name */}
          <div className="pointer-events-auto inline-flex">
            {_id ? (
              <Link to={`/user/${_id}`}>
                <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md hover:underline">
                  {fullName}
                </h2>
              </Link>
            ) : (
              <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md hover:underline">
                {fullName}
              </h2>
            )}
          </div>

          {/* Meta info */}
          <div className="space-y-1.5 text-sm text-white/90 drop-shadow-sm">
            {specialization && (
              <div className="flex items-center gap-1.5">
                <span>💼</span>
                <span>
                  <span className="capitalize">{specialization}</span>
                  {experience !== "" && experience != null && ", "}
                  {experience !== "" && experience != null && (
                    <span>{experience} y.o.exp.</span>
                  )}
                </span>
              </div>
            )}
            {company && (
              <div className="flex items-center gap-1.5">
                <span>🏢</span>
                <span className="capitalize">{company}</span>
              </div>
            )}
            {(age != 0 || gender) && (
              <div className="flex items-center gap-1.5">
                <span>👤</span>
                <span>
                  {gender && <span className="capitalize">{gender}</span>}
                  {gender && age != 0 && ", "}
                  {age != 0 && <span>{age} y.o.</span>}
                </span>
              </div>
            )}
            {(city || country) && (
              <div className="flex items-center gap-1.5">
                <span>📍</span>
                <span>
                  {city && <span className="capitalize">{city}</span>}
                  {country && city && ", "}
                  {country && <span className="capitalize">{country}</span>}
                </span>
              </div>
            )}
          </div>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="px-2.5 py-0.5 capitalize text-xs font-medium bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-sm text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showActions && _id && (
        <div className="flex gap-4 mt-5">
          <button
            type="button"
            className="btn-ghost flex-1 bg-surface hover:bg-surface-2 border border-border py-3 shadow-sm"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignore
          </button>
          <button
            type="button"
            className="btn-primary flex-1 py-3 shadow-md"
            onClick={() => handleSendRequest("interested")}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCard;
