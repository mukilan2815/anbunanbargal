import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaTshirt, FaGraduationCap, FaMedal } from 'react-icons/fa';

const ServicesContainer = styled.div`
  padding: 5rem 0;
  background-color: var(--background-color);
`;

const ServicesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
`;

const Services = () => {
  const services = [
    {
      icon: <FaBook />,
      title: 'இலவச பாட நூல்கள்',
      description: 'ஏழை மாணவர்களுக்கு இலவச பாட நூல்கள் மற்றும் குறிப்பேடுகள் வழங்குதல்',
    },
    {
      icon: <FaTshirt />,
      title: 'இலவச சீருடைகள்',
      description: 'தேவைப்படும் மாணவர்களுக்கு இலவச சீருடைகள் வழங்குதல்',
    },
    {
      icon: <FaGraduationCap />,
      title: 'கல்வி உதவி',
      description: 'மேற்படிப்புக்கான கல்வி உதவி மற்றும் வழிகாட்டுதல்',
    },
    {
      icon: <FaMedal />,
      title: 'திறன் மேம்பாடு',
      description: 'பேச்சு, பாட்டு, கட்டுரை போட்டிகள் மூலம் மாணவர்களின் திறன் மேம்பாடு',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ServicesContainer>
        <div className="container">
          <h2 className="section-title">எங்கள் சேவைகள்</h2>
          <ServicesList>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesList>
        </div>
      </ServicesContainer>
    </motion.div>
  );
};

export default Services;