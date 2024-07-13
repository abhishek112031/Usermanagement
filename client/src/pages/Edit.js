
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${id}`,
          {
            headers: {
              Authorization: token,
            }
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/user/update/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
          }
        }
      );

      navigate("/home");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning">
              <h3 className="text-center">Edit User</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profession">Profession</label>
                  <input
                    type="text"
                    className="form-control"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success mt-2 mr-3 btn-block">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-block mt-2"
                  onClick={() => navigate("/home")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

