function UserCard({ user, className = "" }) {
  const { firstName, lastName, about, gender, age, skills, photoUrl } = user;

  return (
    <div className={"card bg-base-200 shadow-sm w-96" + className}>
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="user photo" className="rounded-lg" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        <div className="flex flex-col gap-1 *:font-medium">
          <div>
            {age && <span>{age + ", "}</span>}
            {gender && (
              <span>
                {gender.charAt(0).toUpperCase() + gender.slice(1) + ", "}
              </span>
            )}
            {skills && <span>{"Skills: " + skills.join(", ")}</span>}
          </div>
          <p>{about}</p>
        </div>

        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Send Request</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
