import { useEffect, useState } from "react";
import API from "../services/api";

function FeatureFlagList() {
  const [featureFlags, setFeatureFlags] = useState([]);
  const [featureKey, setFeatureKey] = useState("");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    fetchFeatureFlags();
  }, []);

  const fetchFeatureFlags = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/feature-flags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeatureFlags(res.data.featureFlags);
    } catch (err) {
      console.log(err);
    }
  };

  const addFeature = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/feature-flags",
        {
          feature_key: featureKey,
          is_enabled: enabled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feature Added Successfully");

      setFeatureKey("");
      setEnabled(true);

      fetchFeatureFlags();
    } catch (err) {
      console.log(err);
      alert("Unable to add feature");
    }
  };

  const toggleFeature = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/feature-flags/${id}`,
        {
          is_enabled: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFeatureFlags();
    } catch (err) {
      console.log(err);
      alert("Unable to update feature");
    }
  };

  const deleteFeature = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/feature-flags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Feature Deleted Successfully");

      fetchFeatureFlags();
    } catch (err) {
      console.log(err);
      alert("Unable to delete feature");
    }
  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-header">
        <h4>🚩 Feature Flags</h4>
      </div>

      <div className="card-body">
        <input
          className="form-control mb-3"
          placeholder="Feature Key"
          value={featureKey}
          onChange={(e) => setFeatureKey(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={enabled}
          onChange={(e) => setEnabled(e.target.value === "true")}
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>

        <button
          className="btn btn-success mb-4"
          onClick={addFeature}
        >
          Add Feature
        </button>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Feature Key</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {featureFlags.length > 0 ? (
              featureFlags.map((flag) => (
                <tr key={flag.id}>
                  <td>{flag.id}</td>

                  <td>{flag.feature_key}</td>

                  <td>
                    {flag.is_enabled ? (
                      <span className="badge bg-success">
                        Enabled
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Disabled
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className={
                        flag.is_enabled
                          ? "btn btn-warning btn-sm me-2"
                          : "btn btn-success btn-sm me-2"
                      }
                      onClick={() =>
                        toggleFeature(flag.id, flag.is_enabled)
                      }
                    >
                      {flag.is_enabled ? "Disable" : "Enable"}
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFeature(flag.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Feature Flags Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeatureFlagList;