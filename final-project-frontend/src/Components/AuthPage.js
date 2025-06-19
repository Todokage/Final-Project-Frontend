import React, { useState } from 'react';

const guidelines = [
  "Be respectful and courteous to all users.",
  "Share accurate and helpful information.",
  "No spam, advertising, or inappropriate content.",
  "Protect your personal information and respect others' privacy.",
  "Report any misuse or violations to moderators.",
  "Follow community rules to ensure a positive environment."
];

const AuthPage = ({ onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isSignUp) {
      if (!form.name || !form.email || !form.password) {
        setError('Please fill in all fields.');
        return;
      }
      setShowGuidelines(true);
    } else {
      if (!form.email || !form.password) {
        setError('Please enter email and password.');
        return;
      }
      if (onAuthSuccess) onAuthSuccess();
      if (onClose) onClose();
    }
  };

  const handleGoogleAuth = () => {
    // Implement Google Auth logic here
    if (onAuthSuccess) onAuthSuccess();
    if (onClose) onClose();
  };

  const handleAcceptGuidelines = () => {
    setShowGuidelines(false);
    if (onAuthSuccess) onAuthSuccess();
    if (onClose) onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: '#111',
        padding: '2rem',
        borderRadius: '0',
        border: '1px solid #333',
        maxWidth: '400px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
      }}>
        <button
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'color 0.3s',
            ':hover': {
              color: '#ff4757'
            }
          }}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {!showGuidelines ? (
          <>
            <h2 style={{ 
              textAlign: 'center', 
              color: '#fff', 
              marginBottom: '2rem',
              fontSize: '1.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              {isSignUp ? 'CREATE ACCOUNT' : 'LOGIN'}
            </h2>

            <button 
              onClick={handleGoogleAuth}
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1rem',
                backgroundColor: '#4285F4',
                color: '#fff',
                border: 'none',
                borderRadius: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#3367D6'
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.5rem 0',
              color: '#666'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }} />
              <span style={{ padding: '0 1rem' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  style={{
                    padding: '0.8rem',
                    backgroundColor: '#222',
                    border: '1px solid #333',
                    color: '#fff',
                    borderRadius: '0',
                    '::placeholder': {
                      color: '#666'
                    },
                    ':focus': {
                      outline: 'none',
                      borderColor: '#4285F4'
                    }
                  }}
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                style={{
                  padding: '0.8rem',
                  backgroundColor: '#222',
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: '0',
                  '::placeholder': {
                    color: '#666'
                  },
                  ':focus': {
                    outline: 'none',
                    borderColor: '#4285F4'
                  }
                }}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                style={{
                  padding: '0.8rem',
                  backgroundColor: '#222',
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: '0',
                  '::placeholder': {
                    color: '#666'
                  },
                  ':focus': {
                    outline: 'none',
                    borderColor: '#4285F4'
                  }
                }}
              />

              {error && <div style={{ color: '#ff4757', fontSize: '0.9rem' }}>{error}</div>}

              <button 
                type="submit" 
                style={{
                  padding: '0.8rem',
                  backgroundColor: '#4285F4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s',
                  ':hover': {
                    backgroundColor: '#3367D6'
                  }
                }}
              >
                {isSignUp ? 'SIGN UP' : 'LOGIN'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <span 
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ 
                  color: '#4285F4', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </span>
            </div>
          </>
        ) : (
          <div>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>COMMUNITY GUIDELINES</h3>
            <ul style={{ 
              color: '#ccc', 
              margin: '1.5rem 0', 
              paddingLeft: '1.5rem',
              lineHeight: '1.6'
            }}>
              {guidelines.map((g, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{g}</li>
              ))}
            </ul>
            <button 
              onClick={handleAcceptGuidelines}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#4285F4',
                color: '#fff',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#3367D6'
                }
              }}
            >
              ACCEPT & CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;