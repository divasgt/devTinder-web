import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

function Brand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-0 font-extrabold text-base text-fg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
    >
      <span>dev</span>
      <span className="text-primary px-0.5">·</span>
      <span>tinder</span>
    </Link>
  );
}

function PillNav() {
  const user = useSelector((store) => store.user);
  const connectionsCount = useSelector((s) => s.connections?.length ?? 0);
  const requestsCount = useSelector((s) => s.requests?.length ?? 0);

  const items = [
    { to: "/", label: "Feed", end: true },
    { to: "/connections", label: "Connections", count: connectionsCount },
    { to: "/requests", label: "Requests", count: requestsCount },
  ];

  if (!user) return null;

  return (
    <nav
      aria-label="Primary"
      className="inline-flex p-1 bg-surface-2 border border-border rounded"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `inline-flex items-center gap-1.5 px-3 h-8 text-sm font-medium rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              isActive ? "bg-primary text-white" : "text-fg-muted hover:text-fg"
            }`
          }
        >
          <span>{item.label}</span>
          {item.count > 0 && (
            <span
              className={`inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold rounded-full ${
                // when the parent is active, the badge needs a contrasting style
                "bg-accent text-white"
              }`}
              aria-label={`${item.count} pending`}
            >
              {item.count}
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
    navigate("/login");
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
        <span className="hidden sm:block text-sm text-fg-muted">
          {user.firstName}
        </span>
        <Avatar
          user={user}
          className="size-8 hover:ring-2 hover:ring-primary/40 transition-shadow"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-52 card p-1 z-50 animate-fade-in"
        >
          <Link
            to={`/user/${user._id}`}
            role="menuitem"
            onClick={close}
            className="block px-3 py-2 text-sm rounded hover:bg-surface-2 transition-colors duration-150"
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm rounded text-rose-500 hover:bg-rose-500/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 cursor-pointer"
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
    <header className="sticky top-0 z-50 h-14 bg-surface/80 backdrop-blur border-b border-border">
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
