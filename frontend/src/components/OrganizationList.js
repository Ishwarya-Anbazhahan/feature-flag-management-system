import { useEffect, useState } from "react";
import API from "../services/api";

function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

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

  const editOrganization = async (org) => {

  const newName = prompt("Enter New Organization Name", org.name);

  if (!newName) return;

  try {

    const token = localStorage.getItem("token");

    await API.put(
      `/organizations/${org.id}`,
      {
        name: newName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Organization Updated Successfully");

    fetchOrganizations();

  } catch (err) {
    alert(err.response?.data?.message || "Update Failed");
  }

};
  // Delete Organization
  const deleteOrganization = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/organizations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Organization Deleted Successfully");

      fetchOrganizations();
    } catch (err) {
  console.log(err.response);
  console.log(err.response?.data);

  alert(err.response?.data?.message || err.response?.data?.error || "Delete Failed");
}
  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-header">
        <h4>Organizations</h4>
      </div>

      <div className="card-body">
        <table className="table table-bordered">
         <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Actions</th>
  </tr>
</thead>

          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td>{org.id}</td>
                <td>{org.name}</td>
              <td>
  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => editOrganization(org)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteOrganization(org.id)}
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

export default OrganizationList;