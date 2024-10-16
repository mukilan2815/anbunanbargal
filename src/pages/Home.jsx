import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaUsers,
  FaTrophy,
  FaChevronDown,
  FaCalendarAlt,
  FaLaptop,
} from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore configuration

const HomeContainer = styled.div`
  padding-top: 1px;
`;

const Hero = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CarouselImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ScrollDownIcon = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: var(--white);
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: var(--background-color);
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: 15px;
  padding: 2rem;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
`;

const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.3rem;
  text-align: center;
  margin: 4rem auto;
  padding: 2rem;
  background-color: var(--background-color);
  border-left: 5px solid var(--primary-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const EventsSection = styled.section`
  padding: 4rem 0;
  background-color: var(--white);
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const EventCard = styled(motion.div)`
  background-color: var(--background-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 2px solid var(--primary-color);
`;

const EventContent = styled.div`
  padding: 1rem;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const EventDate = styled.p`
  font-size: 0.85rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const EventDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-color);
  line-height: 1.4;
`;

const carouselImages = [
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://watermark.lovepik.com/photo/20211202/large/lovepik-college-student-library-reading-picture_501428058.jpg",
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch events from Firestore
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventData = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomeContainer>
        <Hero>
          <AnimatePresence initial={false}>
            <CarouselImage
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${carouselImages[currentImageIndex]})`,
              }}
            />
          </AnimatePresence>
          <DarkOverlay />
          <HeroContent>
            <Title
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              நண்பர்கள் அன்பு நூலகம்
            </Title>
            <Subtitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              அறிவின் கதவுகளைத் திறக்கும் உங்கள் சொந்த நூலகம் - புத்தகங்கள்,
              டிஜிட்டல் வளங்கள், மற்றும் சமூக நிகழ்வுகளுடன்
            </Subtitle>
            <CTAButton
              href="#features"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
            >
              மேலும் அறிய
            </CTAButton>
          </HeroContent>
          <ScrollDownIcon
            onClick={scrollToFeatures}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaChevronDown />
          </ScrollDownIcon>
        </Hero>
        <FeaturesSection id="features">
          <div className="container">
            <SectionTitle>எங்கள் சிறப்பம்சங்கள்</SectionTitle>
            <FeaturesList>
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FeatureIcon>
                  <FaBook />
                </FeatureIcon>
                <FeatureTitle>பல்வேறு நூல்கள்</FeatureTitle>
                <FeatureDescription>
                  1,00,000+ புத்தகங்கள் - நாவல்கள், வரலாற்று நூல்கள், அறிவியல்
                  நூல்கள் மற்றும் பலவற்றின் தொகுப்பு
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FeatureIcon>
                  <FaUsers />
                </FeatureIcon>
                <FeatureTitle>சமூக சேவை</FeatureTitle>
                <FeatureDescription>
                  ஏழை மாணவர்களுக்கு கல்வி உதவி, இலவச பயிற்சி வகுப்புகள், மற்றும்
                  சமூக மேம்பாட்டு திட்டங்கள்
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FeatureIcon>
                  <FaTrophy />
                </FeatureIcon>
                <FeatureTitle>போட்டிகள்</FeatureTitle>
                <FeatureDescription>
                  மாணவர்களுக்கான பேச்சு, பாட்டு, கட்டுரை, மற்றும் அறிவியல்
                  போட்டிகள் - திறமைகளை வளர்க்க உதவும்
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FeatureIcon>
                  <FaLaptop />
                </FeatureIcon>
                <FeatureTitle>டிஜிட்டல் வளங்கள்</FeatureTitle>
                <FeatureDescription>
                  இ-புத்தகங்கள், ஆன்லைன் கற்றல் தளங்கள், மற்றும் டிஜிட்டல் ஆவணக்
                  காப்பகம் - எங்கிருந்தும் அணுகலாம்
                </FeatureDescription>
              </FeatureCard>
            </FeaturesList>
          </div>
        </FeaturesSection>
        <EventsSection>
          <div className="container">
            <h2>வரவிருக்கும் நிகழ்வுகள்</h2>
            <EventGrid>
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard key={event.id} whileHover={{ scale: 1.03 }}>
                    <EventImage src={event.image} alt={event.title} />
                    <EventContent>
                      <EventTitle>{event.title}</EventTitle>
                      <EventDate>
                        <FaCalendarAlt style={{ marginRight: "0.3rem" }} />
                        {event.date}
                      </EventDate>
                      <EventDescription>
                        {event.description.length > 60
                          ? event.description.substring(0, 60) + "..."
                          : event.description}
                      </EventDescription>
                    </EventContent>
                  </EventCard>
                ))
              ) : (
                <p>வரவிருக்கும் நிகழ்வுகள் எதுவும் இல்லை...</p>
              )}
            </EventGrid>
          </div>
        </EventsSection>

        <Quote>
          "துன்பத்தை வெல்லும் கல்வி கற்றிட வேணும்
          <br />
          சோம்பலைக் கொல்லும் திறன் பெற்றிட வேணும்"
          <br />- பட்டுக்கோட்டை கல்யாண சுந்தரம்
        </Quote>
      </HomeContainer>
    </motion.div>
  );
}
