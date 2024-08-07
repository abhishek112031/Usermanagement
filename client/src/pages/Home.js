import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    navigate(`/edit/${userId}`); // Use navigate to redirect to edit page
  };

  const handleDelete = async (userId) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this user?");
      if (!confirmation) return;
      const resp=await axios.delete(
        `http://localhost:8080/api/user/delete-user/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (resp.status === 200) {
         // Update the user list after delete:
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        alert(resp.data.message);

      }
      

     
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout=async ()=>{
    localStorage.removeItem('token');

    navigate('/login');

  }


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mb-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2 className="text-center mb-4 text-white">User List</h2>
      <table className="table table-dark table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.profession}</td>
              <td>
                <button
                  className="btn btn-info mx-3"
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
