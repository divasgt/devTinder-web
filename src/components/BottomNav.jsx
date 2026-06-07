import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

// Inline icons — Lucide-style strokes. No icon-library dep added.
function Icon({ name }) {
  switch (name) {
    case "feed":
      return (
        <svg {...ICON_PROPS}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "connections":
      return (
        <svg {...ICON_PROPS}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...ICON_PROPS}>
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "user":
      return (
        <svg {...ICON_PROPS}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
}

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
    { to: "/profile", label: "Profile", icon: "user" },
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
