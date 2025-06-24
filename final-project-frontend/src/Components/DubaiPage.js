import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Dubai-themed color theme
const theme = {
  primary: "#0d4b6e", // Deep blue
  secondary: "#d4a762", // Sand gold
  accent: "#d4af37", // Gold
  accent2: "#e6e6fa", // Lavender
  bg: "#f8f8ff", // Ghost white background
  card: "#ffffff", // White cards
  border: "#e0e0e0", // Light gray border
  shadow: "rgba(0,0,0,0.15)",
  text: "#333", // Dark text
  lightText: "#888", // Light text
};

const AED_TO_KES = 30; // UAE  to KSH conversion

const hotels = [
  {
    id: 1,
    name: "Burj Al Arab Jumeirah",
    description:
      "Iconic sail-shaped luxury hotel with private butler service and panoramic views",
    price: 5000 * AED_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719471386-8b8c0a9f0b1a?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["7-Star", "Luxury", "Beachfront"],
  },
  {
    id: 2,
    name: "Atlantis The Palm",
    description: "Aquatic-themed resort with waterpark and underwater suites",
    price: 2500 * AED_TO_KES,
    images: [
      "https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Resort", "Waterpark", "Family"],
  },
];

const slides = [
  {
    id: 1,
    title: "Burj Khalifa",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    description: "The world's tallest building at 828 meters in Downtown Dubai",
  },
  {
    id: 2,
    title: "The Dubai Fountain",
    image:
      "https://images.unsplash.com/photo-1582719471386-8b8c0a9f0b1a?auto=format&fit=crop&w=1200&q=80",
    description:
      "World's largest choreographed fountain system set on the 30-acre Burj Khalifa Lake",
  },
];

const DubaiPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalHotel, setModalHotel] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    phone: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [stkStatus, setStkStatus] = useState(null);
  const navbarRef = useRef(null);
  const [showHomeBtn, setShowHomeBtn] = useState(false);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
      setShowHomeBtn(navbarBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel effects
  useEffect(() => {
    let imgInterval;
    if (modalHotel) {
      imgInterval = setInterval(() => {
        setModalImageIdx((prev) => (prev + 1) % modalHotel.images.length);
      }, 3500);
    }
    return () => {
      if (imgInterval) clearInterval(imgInterval);
    };
  }, [modalHotel]);

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    if (!modalHotel) return;
    setModalImageIdx(
      (prev) => (prev - 1 + modalHotel.images.length) % modalHotel.images.length
    );
  };

  const handleNextImage = () => {
    if (!modalHotel) return;
    setModalImageIdx((prev) => (prev + 1) % modalHotel.images.length);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = modalHotel
    ? modalHotel.price * (parseInt(bookingForm.guests, 10) || 1)
    : 0;

  const simulateSTKPush = () => {
    setStkStatus("pending");
    setTimeout(() => {
      setStkStatus("success");
      setBookingSuccess(true);
    }, 2000);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    simulateSTKPush();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: theme.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Luxurious Hero Section with Dubai aesthetic */}
      <div
        ref={navbarRef}
        style={{
          width: "100%",
          minHeight: "80vh",
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
          marginBottom: "-10vh",
        }}
      >
        <img
          src={slides[currentSlide]?.image}
          alt={slides[currentSlide]?.title || "Dubai"}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
            filter: "brightness(0.8) contrast(120%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 20px",
            maxWidth: "1200px",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              color: theme.accent,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              textShadow: "3px 3px 0 rgba(0,0,0,0.3)",
            }}
          >
            DUBAI
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#fff",
              letterSpacing: "0.1em",
            }}
          >
            {slides[currentSlide]?.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {slides[currentSlide]?.description}
          </motion.p>
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
            zIndex: 10,
          }}
        >
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: "12px",
                height: "12px",
                background:
                  idx === currentSlide ? theme.accent : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: idx === currentSlide ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Home Button */}
      {showHomeBtn && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            top: "24px",
            left: "24px",
            background: theme.accent,
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 100,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span style={{ fontSize: "1.2rem" }}>←</span> HOME
        </motion.button>
      )}

      {/* Hotel Cards Section */}
      <section
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "80px auto 120px",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: theme.primary,
            textAlign: "center",
            marginBottom: "60px",
            fontSize: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Luxury Accommodations
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
            }}
          ></span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "40px",
            padding: "0 20px",
          }}
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              style={{
                background: theme.card,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "220px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "12px 20px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {hotel.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: theme.accent,
                          color: "#fff",
                          padding: "4px 12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: theme.primary,
                  }}
                >
                  {hotel.name}
                </h3>

                <p
                  style={{
                    color: theme.text,
                    marginBottom: "20px",
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {hotel.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: theme.accent,
                    }}
                  >
                    KSH {hotel.price.toLocaleString()}
                    <span
                      style={{
                        fontSize: "1rem",
                        color: theme.lightText,
                        fontWeight: 400,
                      }}
                    >
                      /night
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setModalHotel(hotel);
                      setModalImageIdx(0);
                      setShowBooking(false);
                      setBookingSuccess(false);
                    }}
                    style={{
                      background: theme.primary,
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>BOOK NOW</span>
                    <span style={{ fontSize: "1.2rem" }}>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hotel Booking Modal */}
      {modalHotel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{
              background: theme.card,
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              boxShadow: `0 0 0 2px ${theme.accent}`,
            }}
          >
            <button
              onClick={() => setModalHotel(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: theme.accent,
                color: "#fff",
                border: "none",
                width: "40px",
                height: "40px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close modal"
            >
              ×
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                padding: "40px",
              }}
            >
              {/* Image Gallery */}
              <div
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={modalHotel.images[modalImageIdx]}
                  alt={modalHotel.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <button
                  onClick={handlePrevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Previous image"
                >
                  ←
                </button>

                <button
                  onClick={handleNextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Next image"
                >
                  →
                </button>

                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {modalHotel.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalImageIdx(i)}
                      style={{
                        width: "10px",
                        height: "10px",
                        background:
                          i === modalImageIdx
                            ? theme.accent
                            : "rgba(255,255,255,0.5)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    marginBottom: "16px",
                    color: theme.primary,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {modalHotel.name}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "60px",
                      height: "4px",
                      background: theme.accent,
                    }}
                  ></span>
                </h2>

                <p
                  style={{
                    color: theme.text,
                    marginBottom: "24px",
                    lineHeight: 1.6,
                  }}
                >
                  {modalHotel.description}
                </p>

                <div
                  style={{
                    background: "#f8f8f8",
                    padding: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Price per night:</span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: theme.accent,
                      }}
                    >
                      KSH {modalHotel.price.toLocaleString()}
                    </span>
                  </div>

                  {!showBooking && !bookingSuccess && (
                    <button
                      onClick={() => setShowBooking(true)}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: theme.primary,
                        color: "#fff",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                      }}
                    >
                      RESERVE NOW
                    </button>
                  )}
                </div>

                {/* Booking Form */}
                {showBooking && !bookingSuccess && (
                  <form onSubmit={handleBookingSubmit}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "24px",
                      }}
                    >
                      <div>
                        <label
                          htmlFor="name"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={bookingForm.name}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>
                      
                      <div>
                        <label
                          htmlFor="email"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={bookingForm.email}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>


                      <div>
                        <label
                          htmlFor="phone"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={bookingForm.phone}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="checkIn"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Check-in
                        </label>
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={bookingForm.checkIn}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="checkOut"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Check-out
                        </label>
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={bookingForm.checkOut}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guests"
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          Guests
                        </label>
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          min="1"
                          max="10"
                          value={bookingForm.guests}
                          onChange={handleBookingChange}
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `1px solid ${theme.border}`,
                            fontSize: "1rem",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#f8f8f8",
                        padding: "20px",
                        marginBottom: "24px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          marginBottom: "12px",
                        }}
                      >
                        TOTAL: KSH {totalPrice.toLocaleString()}
                      </div>

                      <button
                        type="submit"
                        disabled={stkStatus === "pending"}
                        style={{
                          width: "100%",
                          padding: "16px",
                          background:
                            stkStatus === "pending" ? "#ccc" : theme.accent,
                          color: "#fff",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: "1rem",
                        }}
                      >
                        {stkStatus === "pending"
                          ? "PROCESSING PAYMENT..."
                          : "CONFIRM & PAY"}
                      </button>

                      {stkStatus === "pending" && (
                        <div
                          style={{
                            marginTop: "16px",
                            color: theme.accent,
                            fontWeight: 600,
                          }}
                        >
                          Please check your phone to complete payment
                        </div>
                      )}
                    </div>
                  </form>
                )}

                {/* Success Message */}
                {bookingSuccess && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "3rem",
                        marginBottom: "20px",
                        color: "#4CAF50",
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        marginBottom: "16px",
                        color: theme.primary,
                      }}
                    >
                      Booking Confirmed!
                    </h3>
                    <p
                      style={{
                        marginBottom: "24px",
                        lineHeight: 1.6,
                      }}
                    >
                      Your reservation at {modalHotel.name} has been confirmed.
                      A receipt has been sent to {bookingForm.email}. 
                    </p>
                    <button
                      onClick={() => setModalHotel(null)}
                      style={{
                        padding: "16px 32px",
                        background: theme.primary,
                        color: "#fff",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                      }}
                    >
                      CLOSE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DubaiPage;