import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("divasverma18@gmail.com");
  const [password, setPassword] = useState("Divas@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email: email,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin();
  };

  return (
    <>
      <form
        className="fieldset mt-20 bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <legend className="fieldset-legend text-2xl text-center">Login</legend>

        <label className="label mt-3">Email</label>
        <input
          type="email"
          required
          className="input"
          placeholder="Email"
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
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
