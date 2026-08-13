import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/slices/userSlice";

function Login() {
  const [searchParams] = useSearchParams();
  const showSignUp = searchParams.get("signup") === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignUpForm, setIsSignUpForm] = useState(showSignUp);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleGithubLogin(code);
    }
  }, [searchParams]);

  const handleGithubLogin = async (code) => {
    setBusy(true);
    try {
      const res = await axios.post(`${BASE_URL}/github`, { code }, { withCredentials: true });
      dispatch(addUser(res.data));
      if (res.data.isNewUser) {
        navigate("/profile/edit?flow=signup");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data || "GitHub login failed!");
      console.error(err);
      setBusy(false);
      navigate("/login", { replace: true });
    }
  };

  const initiateGithubLogin = () => {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || "MY_GITHUB_CLIENT_ID";

    const authorizationParams = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: "user:email",
    });
    window.location.href = `https://github.com/login/oauth/authorize?${authorizationParams}`;
  };

  const handleLogin = async () => {
    setBusy(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleSignUp = async () => {
    setBusy(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile/edit?flow=signup");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    isSignUpForm ? handleSignUp() : handleLogin();
  };

  const switchMode = () => {
    setError("");
    setIsSignUpForm((p) => !p);
  };

  return (
    <div className="flex justify-center px-4 pt-16">
      <form onSubmit={handleSubmit} className="w-90 card p-6 space-y-4 animate-fade-in" noValidate>
        <div>
          <h1 className="text-[22px] font-bold text-fg tracking-tight">
            {isSignUpForm ? "Sign Up" : "Sign In"}
          </h1>
          <p className="text-sm text-fg-muted mt-1">
            {isSignUpForm
              ? "Create your DevForge profile."
              : "Welcome back. Sign in to keep connecting."}
          </p>
        </div>

        {isSignUpForm && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="input"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div>
              <label className="label" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="input"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="input"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignUpForm ? "new-password" : "current-password"}
          />
        </div>

        {/* reserved-height row so the form contents doesn't move when an error appears */}
        <p
          aria-live="polite"
          className={`text-sm h-5 ${error ? "text-rose-500" : "text-transparent"}`}
        >
          {error || "·"}
        </p>

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy
            ? isSignUpForm
              ? "Creating account…"
              : "Signing in…"
            : isSignUpForm
              ? "Sign Up"
              : "Sign In"}
        </button>

        <button
          type="button"
          onClick={switchMode}
          className="block w-full text-center text-sm text-primary hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          {isSignUpForm ? "Already have an account? Sign In" : "New to DevForge? Sign up"}
        </button>

        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-surface px-2 text-fg-muted">Or</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <button
            type="button"
            onClick={initiateGithubLogin}
            className="btn-ghost w-full flex items-center justify-center gap-2 border border-border"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Sign In with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
