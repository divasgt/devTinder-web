# DevForge — Frontend

> A developer networking app — swipe through a feed of devs, send connection requests, and find your next collaborator or co-founder.

Built with **React 19, Redux Toolkit, React Router 7, Tailwind CSS v4, and Vite.**

## Features

- **Stacked card feed** — the first 3 users are rendered as a z-indexed deck; only the top card is actionable. Click to connect or pass.
- **Rich user profiles** — view any user's skills, social links, specialization, experience, and a "looking for" bio.
- **Context-aware action buttons** — the profile page dynamically shows 7+ button states depending on your exact relationship with that user (connected, pending outgoing, pending incoming, rejected, ignored, no relationship, or yourself), each with confirmation modals for destructive actions.
- **Live preview while editing your profile** — the edit page shows a real-time `UserCard` preview that updates as you type.
- **Incoming requests management** — accept or reject pending connection requests.
- **Connections & ignored users** — dedicated pages to manage your network.
- **Marketing landing page** — logged-out visitors see a full pitch page (hero, pain-point comparison, feature cards, CTA) rather than a hard login redirect.
- **Dark/light/system theme** — powered by `next-themes` with FOUC prevention and three-mode toggle.
- **Double navigation** — desktop `PillNav` with live badge counts + mobile `BottomNav` with safe-area-inset support.
- **Fully responsive** — mobile-first design with `md:` breakpoints.

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Framework | React 19                               |
| Routing   | React Router 7                         |
| State     | Redux Toolkit (5 slices)               |
| Styling   | Tailwind CSS v4 (with `@theme` tokens) |
| Build     | Vite                                   |
| HTTP      | Axios (with cookies)                   |
| Theme     | next-themes                            |
| Icons     | Custom inline SVGs (Lucide-inspired)   |

## Getting Started

```bash
# Clone
git clone https://github.com/your-username/DevForge-frontend.git
cd DevForge-frontend

# Install
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at `http://localhost:7777` (configurable in `src/utils/constants.js`).

### Commands

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start Vite dev server        |
| `npm run build`   | Production build             |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

## Routes

| Path                   | Component      | Description                                                   |
| ---------------------- | -------------- | ------------------------------------------------------------- |
| `/`                    | `Home`         | Logged in → `<Feed />`, logged out → `<Landing />`            |
| `/login`               | `Login`        | Supports `?signup=true` to show signup form                   |
| `/profile/edit`        | `EditProfile`  | Supports `?flow=signup` for a "Complete your profile" heading |
| `/user/:userId`        | `UserProfile`  | Public profile for any user + connection actions              |
| `/connections`         | `Connections`  | List of accepted connections                                  |
| `/connections/ignored` | `IgnoredUsers` | Users you've ignored                                          |
| `/requests`            | `Requests`     | Incoming connection requests                                  |
| `*`                    | `NotFound`     | 404 page (inside layout)                                      |

## State Management

Five Redux slices, all in `src/utils/`:

| Slice          | Initial State  | Key Actions                                  |
| -------------- | -------------- | -------------------------------------------- |
| `user`         | `null`         | `addUser`, `removeUser`                      |
| `feed`         | `null` (array) | `addFeed`, `removeUserFromFeed`, `clearFeed` |
| `connections`  | `[]`           | `addConnections`, `removeConnections`        |
| `requests`     | `[]`           | `addRequests`, `removeRequest`               |
| `ignoredUsers` | `[]`           | `addIgnoredUsers`, `removeIgnoredUsers`      |

The user is fetched once in `<Body>` on mount. Logout clears all five slices.

## Project Structure

```
src/
├── main.jsx                  # Entry point – React + ThemeProvider
├── App.jsx                   # BrowserRouter + route definitions
├── index.css                 # Tailwind imports, @theme tokens, component classes
├── utils/
│   ├── constants.js          # BASE_URL, API paths
│   ├── appStore.js           # Redux store configuration
│   ├── userSlice.js
│   ├── feedSlice.js
│   ├── connectionsSlice.js
│   ├── requestsSlice.js
│   └── ignoredUsersSlice.js
├── components/
│   ├── Body.jsx              # Layout wrapper, auth check on mount
│   ├── NavBar.jsx            # Sticky header + PillNav (desktop) + UserMenu
│   ├── BottomNav.jsx         # Mobile tab bar with badges
│   ├── Landing.jsx           # Marketing page (Hero, PainPoint, Features, CTA)
│   ├── Login.jsx             # Login/signup toggle form
│   ├── Feed.jsx              # Stacked card deck
│   ├── UserCard.jsx          # Profile card with photo, skills, actions
│   ├── UserProfile.jsx       # Public profile page (sidebar + about)
│   ├── UserProfileSidebar.jsx # Context-aware action buttons
│   ├── UserProfileAbout.jsx  # About, skills, looking-for sections
│   ├── EditProfile.jsx       # Edit form + live UserCard preview
│   ├── Requests.jsx          # Incoming requests with accept/reject
│   ├── Connections.jsx       # Connection list
│   ├── IgnoredUsers.jsx      # Ignored users list
│   ├── ConfirmModal.jsx      # Generic confirmation dialog
│   ├── ThemeToggle.jsx       # System/light/dark three-way toggle
│   ├── States.jsx            # Spinner, EmptyState, ErrorState, skeletons
│   ├── Avatar.jsx            # Square avatar with gradient initials fallback
│   ├── Icons.jsx             # All SVG icons (inline, Lucide-inspired)
│   └── Footer.jsx            # Brand footer with links
```

## Key Design Decisions

- **Stacked card feed** — Instead of a flat list, the feed renders cards as a z-indexed stack. Only the top card shows action buttons; the rest peek underneath. Cards advance by removing the top user from Redux state.
- **Live profile preview** — The edit form renders a real `UserCard` on the right column so you see exactly how others will see you, updating on every keystroke.
- **Cookie-based auth** — All API calls use `withCredentials: true`. No token stored in `localStorage` — the JWT is handled entirely by the backend's httpOnly cookie. The frontend just checks auth by calling `/profile/view` on mount.
- **No DaisyUI** — The project migrated from DaisyUI to hand-rolled `@layer components` (`.btn-primary`, `.card`, `.input`, etc.) for full design control with Tailwind CSS v4.
- **StrictMode intentionally off** — `<StrictMode>` is commented out in `main.jsx` to avoid double-mounting side effects (API calls in effects fire twice in development with StrictMode).
- **FOUC prevention** — An inline script in `index.html` reads `localStorage.theme` and sets the `class` attribute on `<html>` before React mounts, so the correct theme is applied on the very first paint.
- **Custom icon set** — No icon library dependency. All icons are hand-authored inline SVGs in `Icons.jsx`, including brand icons (GitHub, LinkedIn, X/Twitter, Instagram, Medium) with dynamic resolution based on social link titles.
