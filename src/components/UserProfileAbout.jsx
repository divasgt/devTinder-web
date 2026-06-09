function UserProfileAbout({ user }) {
  const { about, skills = [], lookingFor } = user;

  // const titleCase = (str) => {
  //   return str
  //     .toLowerCase()
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };

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
                  className="capitalize text-sm text-fg px-3 py-1.5 rounded-sm bg-surface-2 border border-primary/15"
                  // className="skill px-2 py-1 text-sm rounded-md bg-surface border border-primary/30"
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
