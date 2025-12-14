import { useState } from "react";
import { login, setAuthToken } from "../service/ApiSweet.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      const token = res.data.token;
      setAuthToken(token);
      const role = res.data.role;
      if (role) localStorage.setItem("role", role);
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
        height: "22rem",
      }}
    >
      <center>
        <h3>LOGIN</h3>
      </center>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {/* <div className="w-sm-100"> */}
        {/* <center> */}
        <button className="btn btn-primary bg-black" style={{ width: "25rem" }}>
          Login
        </button>
        {/* </center> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default Login;
