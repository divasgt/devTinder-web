import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }, // If we don't write this, browser will not store cookies and will not send the cookie (for auth) with other API requests.
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isSignUpForm ? handleSignUp() : handleLogin();
  };

  return (
    <>
      <form
        className="fieldset mt-20 bg-base-200 border-base-300 rounded-box w-xs border p-4 pb-5 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <legend className="fieldset-legend text-2xl text-center mx-auto py-3 mb-2">
          {isSignUpForm ? "Sign Up" : "Log In"}
        </legend>

        {isSignUpForm && (
          <>
            <label className="label mt-3">First Name</label>
            <input
              type="text"
              required
              className="input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label mt-3">Last Name</label>
            <input
              type="text"
              required
              className="input"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label mt-3">Email</label>
        <input
          type="email"
          required
          className="input"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label mt-3">Password</label>
        <input
          type="password"
          required
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className={`text-red-500 h-4`}>{error || " "}</p>

        <button
          className="btn btn-neutral my-3 disabled:opacity-70"
          type="submit"
        >
          {isSignUpForm ? "Sign Up" : "Log In"}
        </button>

        <div
          className="text-blue-500 cursor-pointer hover:opacity-80 font-medium"
          onClick={() => setIsSignUpForm((prev) => !prev)}
        >
          {isSignUpForm
            ? "Already have an account? Log In"
            : "New to DevTinder? Sign up"}
        </div>
      </form>
    </>
  );
}

export default Login;
