import { Navigate, Routes, Route } from "react-router";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Messenger from "./pages/Messenger.jsx";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/messenger" /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/messenger" /> : <Register />}
      />
      <Route path="/messenger" element={<Messenger />} />
    </Routes>
  );
}
