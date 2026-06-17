import { Outlet, useLocation, useNavigate } from "react-router";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { Spinner } from "./States";
import Footer from "./Footer";

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

  return (
    <>
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
