import FeatureFlagList from "../components/FeatureFlagList";
import AddOrganization from "../components/AddOrganization";
import OrganizationList from "../components/OrganizationList";
import UserManagement from "../components/UserManagement";
function Dashboard() {
  return (
    <div className="container-fluid">

      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">
            🚩 Feature Flag Management System
          </span>

          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">

        <h2>Welcome Super Admin 👋</h2>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h3>🏢 Organizations</h3>
              <p>Manage Organizations</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h3>👨‍💼 Users</h3>
              <p>Manage Organization Admins</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h3>🚩 Feature Flags</h3>
              <p>Create & Manage Feature Flags</p>
            </div>
          </div>

        </div>

      </div>
      <AddOrganization />
      <OrganizationList />
      <FeatureFlagList />
      <UserManagement />
    </div>
  );
}

export default Dashboard;