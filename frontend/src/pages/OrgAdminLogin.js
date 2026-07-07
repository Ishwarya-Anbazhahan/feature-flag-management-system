import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function OrgAdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await API.post("/users/login", {
                email,
                password,
            });

            localStorage.setItem("orgToken", res.data.token);

            alert("Organization Admin Login Successful");

            navigate("/org-dashboard");

        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-md-4 mx-auto">
                <div className="card shadow p-4">
                    <h3 className="text-center mb-4">Organization Admin Login</h3>

                    <input
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
                        className="btn btn-primary w-100"
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrgAdminLogin;