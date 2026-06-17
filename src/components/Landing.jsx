import { Link } from "react-router";
import { Icon } from "./Icons";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-20 md:pb-32 px-4 border-b border-border/40">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs font-medium text-fg-muted mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>DevForge v2 is live</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-fg leading-tight animate-fade-in">
            Where developers <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              connect & build.
            </span>
          </h1>

          <p
            className="mt-6 text-lg text-fg-muted max-w-xl leading-relaxed animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Forge connections. Build projects. DevForge is the premier network to showcase yourself,
            discover like-minded engineers, and collaborate on your next great idea.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              to="/login"
              className="h-12 px-8 inline-flex items-center justify-center bg-primary text-white font-semibold text-base rounded-lg transition-all hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Create Your Profile
            </Link>
            <Link
              to="/login"
              className="h-12 px-8 inline-flex items-center justify-center bg-surface-2 text-fg font-semibold text-base rounded-lg border border-border transition-all hover:bg-surface hover:border-fg-muted w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right: Visual Mockup Container */}
        <div
          className="relative hidden lg:flex justify-center items-center animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          {/* Backdrop glow for the card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl rotate-3 blur-2xl scale-95" />

          {/* Mockup Card */}
          <div className="relative bg-surface/80 backdrop-blur-xl border border-border/60 rounded-3xl shadow-2xl p-8 w-full max-w-md rotate-[-2deg] transition-transform hover:rotate-0 hover:scale-105 duration-500">
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="size-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
                JD
              </div>
              <div>
                <h3 className="text-2xl font-bold text-fg">Jane Doe</h3>
                <p className="text-sm text-primary font-medium mt-1">Senior Full-Stack</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-fg-muted">
                <Icon name="portfolio" size={18} /> <span>10 y.o. exp.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-fg-muted">
                <span className="px-0.5">📍</span> <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["React", "Node.js", "PostgreSQL", "TypeScript"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-surface-2 border border-border/50 rounded-lg text-xs font-semibold text-fg"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <div className="flex-1 h-12 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors flex items-center justify-center text-fg-muted font-medium cursor-default">
                Ignore
              </div>
              <div className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover transition-colors text-white flex items-center justify-center font-medium shadow-md shadow-primary/30 cursor-default">
                Connect
              </div>
            </div>
          </div>

          {/* Floating Element */}
          <div className="absolute -right-8 bottom-12 bg-surface/90 backdrop-blur-md border border-border shadow-xl rounded-2xl p-4 flex items-center gap-3 animate-bounce">
            <div className="size-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
              <Icon name="connections" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-fg">New Connection!</p>
              <p className="text-[10px] text-fg-muted">Alex accepted your request</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPoint() {
  return (
    <section className="px-4 py-20 md:py-32 relative border-b border-border/40 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-fg mb-4 tracking-tight">
            The old way of finding teammates is <span className="text-accent">broken.</span>
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Stop spamming random Discord servers or Reddit threads with{" "}
            <em>"Hey, I'm looking for a React dev..."</em> It's noisy, inefficient, and rarely
            works.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* The Problem */}
          <div
            className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
            <h3 className="text-sm font-bold text-fg-muted mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              The Noise (Other Platforms)
            </h3>
            <div className="space-y-4">
              <div className="bg-bg rounded-2xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs">
                    D
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-fg leading-none">dev_guy99</span>
                    <span className="text-[10px] text-fg-muted mt-1">Today at 2:14 PM</span>
                  </div>
                </div>
                <p className="text-sm text-fg-muted mt-2">
                  Hey everyone, I'm looking for a backend dev to help me with a side project. Anyone
                  interested?
                </p>
              </div>
              <div className="bg-bg rounded-2xl p-4 border border-border opacity-70">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-fg leading-none">react_ninja</span>
                    <span className="text-[10px] text-fg-muted mt-1">Today at 3:00 PM</span>
                  </div>
                </div>
                <p className="text-sm text-fg-muted mt-2">
                  I have an idea of this AI startup, and I'm looking for...
                </p>
              </div>
              <div className="bg-bg rounded-2xl p-4 border border-border opacity-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs">
                    C
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-fg leading-none">coder_xyz</span>
                    <span className="text-[10px] text-fg-muted mt-1">Yesterday at 9:41 PM</span>
                  </div>
                </div>
                <p className="text-sm text-fg-muted mt-2">
                  Looking for co-founder. Please DM me...
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div
            className="bg-surface border border-primary/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-primary/10 relative overflow-hidden animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 pointer-events-none" />
            <h3 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The Solution (DevForge)
            </h3>

            <div className="bg-bg rounded-2xl p-5 border border-border flex items-center justify-between mb-5 relative z-10 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0">
                  AS
                </div>
                <div>
                  <h4 className="text-base font-bold text-fg flex items-center gap-2">
                    Alex Smith
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase font-bold tracking-wider">
                      Match
                    </span>
                  </h4>
                  <p className="text-xs text-fg-muted mt-1">Looking for an AI hackathon partner</p>
                </div>
              </div>
              <div className="hidden sm:flex h-10 px-4 bg-primary text-white text-sm font-bold rounded-xl items-center shadow-md shadow-primary/20">
                Connect
              </div>
            </div>

            <div className="bg-bg rounded-2xl p-5 border border-border relative z-10">
              <div className="flex items-start gap-3 mb-4">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs shrink-0 mt-1">
                  AS
                </div>
                <div className="bg-surface-2 border border-border rounded-2xl rounded-tl-sm p-3.5 text-sm text-fg shadow-sm">
                  Hey! I see we both know gen AI. Want to team up for an AI hackathon this weekend?
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-primary text-white rounded-2xl rounded-tr-sm p-3.5 text-sm shadow-md shadow-primary/20">
                  Absolutely! I'm interested!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "user",
    title: "Showcase Your Profile",
    body: "Build a comprehensive developer profile. Highlight your experience, core skills, and past projects to stand out from the noise.",
  },
  {
    icon: "portfolio",
    title: "Discover Talent",
    body: "Filter and find developers based on exactly what you are looking for. Find your perfect match.",
  },
  {
    icon: "chat",
    title: "Connect Instantly",
    body: "Send connection requests to developers you admire. If the interest is mutual, chat here itself to team up and build.",
  },
  {
    icon: "hammer",
    title: "Build Together",
    body: "Turn connections into actual side-projects, startups, or hackathon wins. Stop networking, start building.",
  },
];

function Features() {
  return (
    <section className="px-4 py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-fg mb-4 tracking-tight">
            Everything you need to <span className="text-primary">find your team</span>
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Stop searching blindly. DevForge provides purpose-built tools for developers to match
            and work together effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group p-8 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${100 * (i + 1)}ms` }}
            >
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon name={f.icon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-fg mb-3">{f.title}</h3>
              <p className="text-base text-fg-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 py-12 pb-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 text-center p-12 md:p-20 border border-border bg-gradient-to-b from-surface to-surface-2 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl pointer-events-none" />

        <h2 className="text-3xl md:text-5xl font-bold text-fg mb-6 tracking-tight relative z-10">
          Ready to build something great?
        </h2>
        <p className="text-lg md:text-xl text-fg-muted mb-10 max-w-2xl mx-auto relative z-10">
          Join thousands of developers who are already forging connections and shipping amazing
          projects.
        </p>
        <Link
          to="/login"
          className="relative z-10 h-14 px-10 inline-flex items-center justify-center bg-fg text-bg font-bold text-lg rounded-xl transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-fg/20"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <main className="w-full">
      <Hero />
      <PainPoint />
      <Features />
      <CallToAction />
    </main>
  );
}

export default Landing;
