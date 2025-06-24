import React, { useState } from "react";
import AuthPage from "./AuthPage";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showAuth, setShowAuthPage] = useState(false);

  const handleLoginClick = () => {
    setShowAuthPage(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeAuthPage = () => {
    setShowAuthPage(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            background: "linear-gradient(90deg,#4ea8de,#4361ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}
        >
          ToDo Travels
        </div>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          style={{
            background: "transparent",
            border: "2px solid transparent",
            backgroundImage: "linear-gradient(90deg,#4ea8de,#4361ee)",
            backgroundClip: "padding-box",
            padding: "0.5rem 1.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
            ":hover": {
              background: "#fff",
              color: "#000",
            },
          }}
        >
          Login
        </button>
      </div>

      {/* Auth Modal with Full View */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2000,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "2rem",
                position: "relative",
              }}
            >
              <AuthPage onClose={closeAuthPage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
