import { useState } from "react";
import { register } from "../service/ApiSweet.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password, role });
      toast.success("Registered. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        padding: "3rem",
        maxWidth: "31rem",
        border: "2px solid black",
        borderRadius: "1rem",
        height: "27rem",
      }}
    >
      <center><h3>REGISTER</h3></center><br />
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <select
          className="form-select mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select><br />
        <button className="btn btn-primary bg-black" style={{ width: "25rem" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
