import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
`;

const FooterLink = styled(Link)`
  display: block;
  color: var(--white);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--secondary-color);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: var(--white);
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--secondary-color);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterTitle>நண்பர்கள் அன்பு நூலகம்</FooterTitle>
            <p>மாச்சம்பாளையம், சுந்தராபுரம், கோவை-641024</p>
          </FooterSection>
          <FooterSection>
            <FooterTitle>பயனுள்ள இணைப்புகள்</FooterTitle>
            <FooterLink to="/">முகப்பு</FooterLink>
            <FooterLink to="/history">வரலாறு</FooterLink>
            <FooterLink to="/services">சேவைகள்</FooterLink>
            <FooterLink to="/competitions">போட்டிகள்</FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterTitle>தொடர்பு கொள்ள</FooterTitle>
            <p>தொலைபேசி: 0422-6580495</p>
            <p>மின்னஞ்சல்: info@anbunanbargal.com</p>
            <SocialIcons>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialIcon>
            </SocialIcons>
          </FooterSection>
        </FooterContent>
        <Copyright>
          &copy; {new Date().getFullYear()} நண்பர்கள் அன்பு நூலகம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. <FaHeart style={{ color: 'var(--secondary-color)' }} />
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer;