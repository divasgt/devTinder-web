import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("divasverma18@gmail.com");
  const [password, setPassword] = useState("Divas@123");
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
      console.error(err);
    }
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend text-2xl text-center">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </>
  );
}

export default Login;
