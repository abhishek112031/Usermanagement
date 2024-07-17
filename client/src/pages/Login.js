
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function saveTokenToLocalStorage(token){
    localStorage.setItem("token",token);
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:  ", formData);
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        formData
      );

      console.log("response: ", response.status);

      

      if(response.status === 200) {
        await saveTokenToLocalStorage(response.data.token)
        navigate("/home");
      }else{
        alert('Login unsuccessful!');

      }

    
      
    } catch (error) {
      alert(error.response.data.message);
  
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-header text-center">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control bg-secondary text-white"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control bg-secondary text-white"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3 btn-block">
                  Login
                </button>
              </form>
              {/* {message && <p className="mt-3 text-center">{message}</p>} */}
              <div className="mt-3 text-center">
                <p>Don't have an account? <Link to="/registration" className="text-primary">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

