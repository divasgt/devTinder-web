function UserProfileAbout({ user }) {
  const { about, skills = [], lookingFor } = user;

  return (
    <div className="space-y-6">
      {/* About Me */}
      {about && (
        <div>
          <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-2">
            About Me
          </h2>
          <div className="card p-5">
            <p className="text-sm text-fg leading-relaxed whitespace-pre-wrap">
              {about}
            </p>
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-2">
            Skills
          </h2>
          <div className="p-2">
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="capitalize text-sm text-fg px-3 py-1.5 card"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Looking For */}
      {lookingFor && (
        <div>
          <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-2">
            Looking for
          </h2>
          <div className="card p-5">
            <p className="text-sm text-fg leading-relaxed whitespace-pre-wrap">
              {lookingFor}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileAbout;
