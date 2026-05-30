import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user, className = "" }) {
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

  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error(err.message);
    }
  };

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
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
