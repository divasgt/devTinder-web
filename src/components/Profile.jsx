import { useSelector } from "react-redux";
import { Link } from "react-router";
import UserCard from "./UserCard";

function Profile() {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <p className="mt-10 text-sm text-center text-fg-muted">
        Loading profile…
      </p>
    );
  }

  return (
    <div className="max-w-100 mx-auto mt-12 px-4 space-y-4">
      <UserCard user={user} showActions={false} />
      <div className="flex justify-center">
        <Link to="/profile/edit" className="btn-primary">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;
