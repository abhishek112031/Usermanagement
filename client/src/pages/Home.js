
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch users data from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/all-users",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleEdit = (userId) => {
    console.log("Edit user with id:", userId);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/user/delete-user/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update the user list after delete:
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-info mr-2"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

