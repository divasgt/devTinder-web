import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mr-5">
            <div className="flex justify-center items-center gap-3">
              <div>Welcome, {user.firstName}</div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User photo" src={user?.photoUrl || null} />
                </div>
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
