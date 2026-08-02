import { Link } from "react-router";
import { Icon } from "../others/Icons";

const LINKS = [
  { to: "#", label: "About" },
  { to: "#", label: "Terms" },
  { to: "#", label: "Privacy" },
  { to: "#", label: "Contact" },
];

function Footer() {
  return (
    <footer className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-0 font-extrabold text-lg text-fg tracking-tight"
            >
              <span>Dev</span>
              <span className="text-primary px-0.5">·</span>
              <span>Forge</span>
            </Link>
            <p className="text-sm text-fg-muted mt-1.5 max-w-64 leading-relaxed">
              Forge connections. Build projects.
            </p>
          </div>

          {/* Links & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <nav aria-label="Footer">
              <ul className="flex items-center gap-6">
                {LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-fg-muted hover:text-fg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4 text-fg-muted">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors p-0.5"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors p-0.5"
                aria-label="X (formerly Twitter)"
              >
                <Icon name="x" size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors p-0.5"
                aria-label="GitHub"
              >
                <Icon name="github" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs text-fg-muted/60">
          {new Date().getFullYear()} DevForge. Built by developers, for developers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
