import { useState } from "react";
import { Link } from "react-router";
import { registerUser } from "../services/auth.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }
    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      console.log("Registration successful:", data);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  }

  return (
    <div>
      <h1>Create your account</h1>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Create a new password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Enter your new password again"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
