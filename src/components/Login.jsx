import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true },
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
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
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
      <form
        onSubmit={handleSubmit}
        className="w-90 card p-6 space-y-4 animate-fade-in"
        noValidate
      >
        <div>
          <h1 className="text-[22px] font-bold text-fg tracking-tight">
            {isSignUpForm ? "Sign Up" : "Log In"}
          </h1>
          <p className="text-sm text-fg-muted mt-1">
            {isSignUpForm
              ? "Create your DevTinder profile."
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
              : "Log In"}
        </button>

        <button
          type="button"
          onClick={switchMode}
          className="block w-full text-center text-sm text-primary hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          {isSignUpForm
            ? "Already have an account? Log In"
            : "New to DevTinder? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
