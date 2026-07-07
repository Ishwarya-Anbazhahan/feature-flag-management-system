import { useEffect, useState } from "react";
import API from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [role, setRole] = useState("ORG_ADMIN");

  useEffect(() => {
    fetchUsers();
    fetchOrganizations();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/organizations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrganizations(res.data.organizations);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/users/register",
        {
          name,
          email,
          password,
          organization_id: organizationId,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Added Successfully");

      setName("");
      setEmail("");
      setPassword("");
      setOrganizationId("");
      setRole("ORG_ADMIN");

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to Add User");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (err) {
      alert("Unable to Delete User");
    }
  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-header">
        <h4>User Management</h4>
      </div>

      <div className="card-body">

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <select
          className="form-select mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ORG_ADMIN">Organization Admin</option>
          <option value="END_USER">End User</option>
        </select>

        <select
          className="form-select mb-3"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
        >
          <option value="">Select Organization</option>

          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary mb-4"
          onClick={addUser}
        >
          Add User
        </button>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.organization}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default UserManagement;