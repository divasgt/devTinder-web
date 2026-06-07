import { Link } from "react-router";

const FEATURES = [
  {
    title: "Discover developers",
    body: "Browse engineers by stack, experience, and what they're building. Skip the noise, see the profile.",
  },
  {
    title: "Match on shared stack",
    body: "If you both write Rust and ship on the weekend, you'll know before you connect. No more small talk.",
  },
  {
    title: "Build, not just chat",
    body: "Connections lead to side projects, pair sessions, and the occasional hackathon. The work is the point.",
  },
];

function Hero() {
  return (
    <section className="pt-12 md:pt-20 pb-12 md:pb-16 px-4 text-center">
      <p className="inline-block mb-4 text-xs font-mono font-medium px-2 py-1 rounded-sm bg-primary/12 text-indigo-600 dark:text-indigo-300">
        for developers, by developers
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fg leading-[1.05]">
        Find your next
        <br />
        <span className="text-primary">dev co-founder</span>
      </h1>
      <p className="mt-5 text-base md:text-lg text-fg-muted max-w-xl mx-auto">
        DevTinder is a swipe-based network for engineers. Match by tech stack,
        collaborate on side projects, and meet the person you'd actually want to
        pair with.
      </p>
      <div className="mt-7 flex items-center justify-center gap-3">
        <Link to="/login" className="btn-primary">
          Get started
        </Link>
        <Link to="/login" className="btn-ghost">
          Sign in
        </Link>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-4 pb-16 md:pb-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <div key={f.title} className="card">
            <span
              className="font-mono text-[11px] font-medium text-fg-muted mb-3"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold text-fg">{f.title}</h3>
            <p className="text-sm text-fg-muted mt-1.5 leading-relaxed">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Landing() {
  return (
    <main className="animate-fade-in">
      <Hero />
      <Features />
    </main>
  );
}

export default Landing;
