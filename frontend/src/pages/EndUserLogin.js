import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function EndUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/users/end-user/login", {
        email,
        password,
      });

      localStorage.setItem("endToken", res.data.token);

      alert("Login Successful");

      navigate("/end-dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">End User Login</h3>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndUserLogin;