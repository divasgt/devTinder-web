/*
Square avatar with sharp corners, 1px border, and a gradient initials fallback. Pass user (used everywhere in this app) or a name+src pair.
 */
function Avatar({ user, name, src, className = "" }) {
  const displayName = name ?? user?.firstName ?? "";
  const photoUrl = src ?? user?.photoUrl;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`relative overflow-hidden border border-border bg-gradient-to-br from-primary to-accent text-white flex-shrink-0 ${className}`}
      aria-hidden={!displayName}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={displayName || "avatar"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-semibold">
          {initial}
        </div>
      )}
    </div>
  );
}

export default Avatar;
