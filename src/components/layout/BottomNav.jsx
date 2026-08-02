import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { Icon } from "../others/Icons";

function Badge({ count }) {
  if (!count) return null;
  const text = count > 9 ? "9+" : String(count);
  return (
    <span
      aria-label={`${count} pending`}
      className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 bg-accent text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center"
    >
      {text}
    </span>
  );
}

function BottomNav() {
  const user = useSelector((s) => s.user);
  const connectionsCount = useSelector((s) => s.connections?.length ?? 0);
  const requestsCount = useSelector((s) => s.requests?.length ?? 0);

  // Only show for authenticated users — logged-out visitors see the
  // Landing page, not the app shell.
  if (!user) return null;

  const items = [
    { to: "/", label: "Feed", icon: "feed", end: true },
    {
      to: "/connections",
      label: "Connections",
      icon: "connections",
      count: connectionsCount,
      end: true,
    },
    {
      to: "/requests",
      label: "Requests",
      icon: "inbox",
      count: requestsCount,
      end: true,
    },
    { to: `/user/${user._id}`, label: "Profile", icon: "user" },
  ];

  return (
    <nav
      aria-label="Primary mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4 max-w-lg mx-auto">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  isActive ? "text-primary" : "text-fg-muted hover:text-fg"
                }`
              }
            >
              <span className="relative inline-flex">
                <Icon name={item.icon} />
                <Badge count={item.count} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
