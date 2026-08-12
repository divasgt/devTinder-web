import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../store/slices/userSlice";
import Avatar from "../others/Avatar";
import ThemeToggle from "../others/ThemeToggle";
import { Icon } from "../others/Icons";
import { removeConnections } from "../../store/slices/connectionsSlice";
import { removeRequests } from "../../store/slices/requestsSlice";
import { removeIgnoredUsers } from "../../store/slices/ignoredUsersSlice";
import { clearFeed } from "../../store/slices/feedSlice";

function Brand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-0 font-extrabold text-base text-fg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
    >
      <span>Dev</span>
      <span className="text-primary px-0.5">·</span>
      <span>Forge</span>
    </Link>
  );
}

function PillNav() {
  const user = useSelector((store) => store.user);
  const connectionsCount = useSelector((s) => s.connections?.length ?? 0);
  const requestsCount = useSelector((s) => s.requests?.length ?? 0);

  const items = [
    { to: "/", label: "Feed", icon: "feed", end: true },
    {
      to: "/connections",
      label: "Connections",
      icon: "connections",
      count: connectionsCount,
    },
    {
      to: "/requests",
      label: "Requests",
      icon: "inbox",
      count: requestsCount,
    },
  ];

  if (!user) return null;

  return (
    <nav aria-label="Primary" className="flex items-center gap-0.5">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `relative inline-flex items-center gap-1.5 px-3.5 h-9 text-sm font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              isActive ? "text-primary" : "text-fg-muted/60 hover:text-fg"
            }`
          }
        >
          <Icon name={item.icon} size={18} />
          <span>{item.label}</span>
          {/* Item badge */}
          {item.count > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full bg-accent text-white"
              aria-label={`${item.count} pending`}
            >
              {item.count > 9 ? "9+" : item.count}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function UserMenu() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const handleLogout = async () => {
    setOpen(false);
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error(err.message);
    }
    dispatch(removeUser());
    dispatch(removeConnections());
    dispatch(removeIgnoredUsers());
    dispatch(removeRequests());
    dispatch(clearFeed());
    navigate("/");
  };

  const close = () => setOpen(false);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open user menu"
        className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded cursor-pointer"
      >
        <span className="hidden sm:block text-sm text-fg-muted">{user.firstName}</span>
        <Avatar
          user={user}
          className="size-8 rounded hover:ring-2 hover:ring-primary/40 transition-shadow"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-46 card p-1 z-50 animate-fade-in"
        >
          <Link
            to={`/user/${user._id}`}
            role="menuitem"
            onClick={close}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-2 transition-colors duration-150"
          >
            Profile
          </Link>
          <Link
            to="/profile/edit"
            role="menuitem"
            onClick={close}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-2 transition-colors duration-150"
          >
            Edit Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 cursor-pointer"
          >
            Logout
          </button>
          <div className="my-1 border-t border-border" />
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-60 h-14 bg-surface/60 backdrop-blur-xl relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        <Brand />
        {}
        <div className="hidden md:block">
          <PillNav />
        </div>
        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
