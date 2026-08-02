import { Link } from "react-router";

/*
  404 page. Lives inside <Body>'s <Outlet>, so the NavBar (and on mobile the
  BottomNav) are still available to navigate away.
*/
function NotFound() {
  return (
    <main className="animate-fade-in">
      <section className="pt-16 md:pt-24 pb-12 px-4 text-center">
        <p className="inline-block mb-4 text-xs font-mono font-medium px-2 py-1 rounded-sm bg-primary/12 text-indigo-600 dark:text-indigo-300">
          error · 404
        </p>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-fg leading-none font-mono">
          404
        </h1>
        <h2 className="mt-4 text-xl md:text-2xl font-semibold text-fg">
          Page not found
        </h2>
        <p className="mt-3 text-sm md:text-base text-fg-muted max-w-md mx-auto leading-relaxed">
          The page you're looking for moved, was renamed, or never existed. The
          link might be stale.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to feed
          </Link>
          <Link to="/login" className="btn-ghost">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
