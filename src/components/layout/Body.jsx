import { Outlet, useLocation, useNavigate, Link } from "react-router";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import { Spinner } from "../others/States";

function Body() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // If we already have a user in the store, skip the loading gate so the
  // nav bar and feed don't flash a spinner on every page load.
  const [authChecked, setAuthChecked] = useState(!!user);

  const fetchUser = async () => {
    if (user) return;

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        // The landing page lives at "/" — only bounce to /login from
        // protected routes so a logged-out visitor can see the marketing
        // page first.
        if (location.pathname !== "/") {
          navigate("/login");
        }
      }
      console.error(err);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const isIncompleteProfile = user && (!user.skills || user.skills.length === 0);
  const showBanner = isIncompleteProfile && location.pathname !== "/profile/edit";

  return (
    <>
      {showBanner && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center gap-3 z-50 sticky top-0 md:relative">
          <svg
            className="w-5 h-5 text-primary shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link
            to="/profile/edit?flow=signup"
            className="text-xs font-medium text-primary hover:underline whitespace-nowrap"
          >
            Your profile is incomplete. Add some skills to help developers find you!
          </Link>
        </div>
      )}
      <div className="pb-16 md:pb-40 min-h-screen">
        {(user || location.pathname !== "/") && <NavBar />}
        <Outlet />
        <BottomNav />
      </div>

      <Footer />
    </>
  );
}

export default Body;
