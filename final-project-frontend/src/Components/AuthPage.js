import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      const response = await AuthAPI(isLogin, formData);
      
      if (response.success) {
        setUser(response.user);
        onClose();
        toast.success(`Welcome ${response.user.name}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred during authentication');
    }
  };

  //  authentication function
  const AuthAPI = (isLogin, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isLogin) {
          // Login logic
          if (data.email === 'user@example.com' && data.password === 'password') {
            resolve({
              success: true,
              user: {
                name: 'Demo User',
                email: data.email,
                token: 'jwt-token'
              }
            });
          } else {
            resolve({
              success: false,
              message: 'Invalid credentials'
            });
          }
        } else {
          // Signup logic
          if (data.email && data.password && data.name) {
            resolve({
              success: true,
              user: {
                name: data.name,
                email: data.email,
                token: 'jwt-token'
              }
            });
          } else {
            resolve({
              success: false,
              message: 'Please fill all fields'
            });
          }
        }
      }, 1000);
    });
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      position: 'relative' 
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#666',
          padding: '0.25rem',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          ':hover': {
            background: '#f0f0f0',
            color: '#333'
          }
        }}
        aria-label="Close authentication modal"
      >
        &times;
      </button>
      
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
          </div>
        )}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
            minLength="6"
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(90deg,#4ea8de,#4361ee)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4361ee',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;