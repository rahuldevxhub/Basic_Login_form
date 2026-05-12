import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl =import.meta.env.VITE_API_URL

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
         `${baseUrl}/api/v1/user/register`,
        { name, email, password },
      );
      console.log(name, email, password);

      navigate("/login");
      toast.success("Registred Successfully");
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="main">
      <div className="card">
        <h3>Register</h3>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="John Doe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="John Doe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="user">
            Already a user?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>

          <button className="lr-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
