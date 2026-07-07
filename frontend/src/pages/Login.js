import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Username:", username);
      console.log("Password:", password);

      const res = await API.post("/super-admin/login", {
        username: username.trim(),
        password: password.trim(),
      });

      console.log("Response:", res.data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }

    } catch (err) {
      console.log("Full Error:", err);
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);

      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Super Admin Login</h2>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;