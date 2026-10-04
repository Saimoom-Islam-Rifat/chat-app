import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { loginUser } from "../services/auth.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/messenger");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />

        {error && <p>{error}</p>}

        <button type="submit">Log In</button>
      </form>
      <a href="">Forgotten password?</a> {/* Add password recovery */}
    </div>
  );
}
