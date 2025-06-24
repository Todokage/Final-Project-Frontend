import React, { useState } from "react";
import { motion } from "framer-motion";

const AuthPage = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate authentication
    if (isLogin) {
      // Login logic
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: "Test User" // In a real app, this would come from your backend
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      onClose();
    } else {
      // Signup logic
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      onClose();
    }
  };

  return (
    <div style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "8px", maxWidth: "400px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "white" }}>{isLogin ? "Login" : "Sign Up"}</h2>
        <button 
          onClick={onClose}
          style={{ 
            background: "transparent", 
            border: "none", 
            color: "white", 
            fontSize: "1.5rem",
            cursor: "pointer" 
          }}
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "#aaa", marginBottom: "0.5rem" }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#333",
                border: "none",
                borderRadius: "4px",
                color: "white"
              }}
            />
          </div>
        )}
        
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", color: "#aaa", marginBottom: "0.5rem" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#333",
              border: "none",
              borderRadius: "4px",
              color: "white"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", color: "#aaa", marginBottom: "0.5rem" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#333",
              border: "none",
              borderRadius: "4px",
              color: "white"
            }}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "linear-gradient(90deg,#4ea8de,#4361ee)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.button>
      </form>
      
      <p style={{ color: "#aaa", textAlign: "center" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "transparent",
            border: "none",
            color: "#4ea8de",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;