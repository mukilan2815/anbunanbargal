import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ContactContainer = styled.div`
  padding: 5rem 0;
  background-color: var(--background-color);
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ContactCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-right: 1rem;
`;

const ContactDetails = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ContactForm = styled.form`
  flex: 1;
  min-width: 300px;
  background-color: var(--white);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
`;

const Contact = () => {
  const handleSubmit = () => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  const mapCenter = { lat: 11.0168, lng: 76.9558 }; // Coordinates for Coimbatore

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContactContainer>
        <SectionTitle>தொடர்பு கொள்ள</SectionTitle>
        <ContactWrapper>
          <ContactInfo>
            <ContactCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactDetails>
                <h3>முகவரி</h3>
                <p>
                  நண்பர்கள் அன்பு நூலகம், மாச்சம்பாளையம், சுந்தராபுரம் அஞ்சல்,
                  கோவை -641024
                </p>
              </ContactDetails>
            </ContactCard>
            <ContactCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactDetails>
                <h3>தொலைபேசி</h3>
                <p>0422-6580495</p>
                <p>9486035260</p>
              </ContactDetails>
            </ContactCard>
            <ContactCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactDetails>
                <h3>மின்னஞ்சல்</h3>
                <p>info@anbunanbargal.com</p>
                <p>anbunanbargal@gmail.com</p>
              </ContactDetails>
            </ContactCard>
            <MapContainer>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapCenter}
                  zoom={14}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </LoadScript>
            </MapContainer>
          </ContactInfo>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">பெயர்</Label>
              <Input type="text" id="name" name="name" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">மின்னஞ்சல்</Label>
              <Input type="email" id="email" name="email" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">செய்தி</Label>
              <TextArea
                id="message"
                name="message"
                rows={5}
                required
              ></TextArea>
            </FormGroup>
            <SubmitButton type="submit">அனுப்பு</SubmitButton>
          </ContactForm>
        </ContactWrapper>
      </ContactContainer>
    </motion.div>
  );
};

export default Contact;
