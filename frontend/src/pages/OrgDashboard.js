function OrgDashboard() {
    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome Organization Admin 👋</h2>

                <button
                    className="btn btn-danger"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/org-login";
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h4>🏢 Organization</h4>
                        <p>Manage your organization details.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h4>👨‍💼 Users</h4>
                        <p>Manage organization users.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h4>🚩 Feature Flags</h4>
                        <p>View enabled feature flags.</p>
                    </div>
                </div>

            </div>

            <div className="card mt-4 shadow p-4">
                <h4>Dashboard Summary</h4>

                <ul>
                    <li>✔ Organization Login Successful</li>
                    <li>✔ Feature Flags Available</li>
                    <li>✔ User Management Enabled</li>
                    <li>✔ Secure JWT Authentication</li>
                </ul>
            </div>

        </div>
    );
}

export default OrgDashboard;