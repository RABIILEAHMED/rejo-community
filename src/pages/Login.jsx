import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/videos");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
