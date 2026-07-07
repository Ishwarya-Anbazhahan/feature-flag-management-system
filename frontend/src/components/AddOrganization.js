import { useState } from "react";
import API from "../services/api";

function AddOrganization() {

  const [name, setName] = useState("");

  const addOrganization = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/organizations",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Organization Added Successfully");

      setName("");

      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }

  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-header">
        <h4>Add Organization</h4>
      </div>

      <div className="card-body">

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={addOrganization}
        >
          Add Organization
        </button>

      </div>
    </div>
  );
}

export default AddOrganization;