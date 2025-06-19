import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "Flight Bookings",
    description: "Book flights to destinations worldwide with the best airlines and flexible options.",
    icon: "✈️",
    color: "#4ea8de",
    route: "/flights"
  },
  {
    id: 2,
    title: "Hotel Reservations",
    description: "Find and reserve top-rated hotels, resorts, and unique stays for every budget.",
    icon: "🏨",
    color: "#4361ee",
    route: "/hotels"
  },
  {
    id: 3,
    title: "Guided Tours",
    description: "Explore cities and attractions with expert guides for a memorable experience.",
    icon: "🗺️",
    color: "#20b2aa",
    route: "/tours"
  },
  {
    id: 4,
    title: "Visa Assistance",
    description: "Get help with visa applications and travel documentation for a smooth journey.",
    icon: "🛂",
    color: "#e75480",
    route: "/visa"
  }
];

const About = () => {
  const navigate = useNavigate();

  const handleServiceClick = (route) => {
    navigate(route);
  };

  const handleKeyDown = (e, route) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(route);
    }
  };

  return (
    <section 
      aria-labelledby="services-heading"
      style={{
        margin: '4rem auto 0',
        padding: '2.5rem 1.25rem',
        maxWidth: '75rem',
        background: '#f8fafc',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}
    >
      <h2 
        id="services-heading"
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '0.5rem'
        }}
      >
        Our Services
      </h2>
      <p style={{
        color: '#64748b',
        fontSize: '1rem',
        marginBottom: '2.25rem',
        maxWidth: '43.75rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.6
      }}>
        Discover our wide range of travel services designed to make your journey effortless and enjoyable.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        justifyContent: 'center',
        padding: '0 1rem'
      }}>
        {services.map(service => (
          <article
            key={service.id}
            onClick={() => handleServiceClick(service.route)}
            onKeyDown={(e) => handleKeyDown(e, service.route)}
            style={{
              background: '#fff',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              outline: 'none',
              border: '1px solid #e2e8f0'
            }}
            tabIndex={0}
            aria-label={`${service.title} - ${service.description}`}
            role="button"
          >
            <div style={{
              height: '5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '2.5rem'
            }}>
              {service.icon}
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              color: '#1e293b',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              {service.title}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              lineHeight: 1.5,
              marginBottom: '1rem',
              minHeight: '3.5rem'
            }}>
              {service.description}
            </p>
            <div style={{
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;