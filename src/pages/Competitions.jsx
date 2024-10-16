import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrophy, FaCalendarAlt, FaClock } from 'react-icons/fa';

const CompetitionsContainer = styled.div`
  padding: 5rem 0;
  background-color: var(--white);
`;

const CompetitionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CompetitionCard = styled(motion.div)`
  background-color: var(--background-color);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CompetitionImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
`;

const CompetitionContent = styled.div`
  padding: 1.5rem;
`;

const CompetitionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const CompetitionDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CompetitionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-color);
`;

const CompetitionDetail = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const competitionsCollection = collection(db, 'competitions');
      const competitionsSnapshot = await getDocs(competitionsCollection);
      const competitionsList = competitionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompetitions(competitionsList);
    };

    fetchCompetitions();
  }, []);

  const defaultCompetitions = [
    {
      id: '1',
      title: 'பேச்சுப் போட்டி',
      description: 'நடுநிலைக்கான போட்டி: சிறு சேமிப்பின் முக்கியத்துவம் பற்றி (5 நிமிடம்)',
      image: 'https://source.unsplash.com/random/400x300/?speech',
      date: '2023-06-15',
      time: '10:00 AM'
    },
    {
      id: '2',
      title: 'பாட்டுப் போட்டி',
      description: 'உயர்நிலைக்கான போட்டி: பட்டுக்கோட்டை கல்யாணசுந்தரம் அவர்களின் தத்துவப்பாடல் ஒன்று',
      image: 'https://source.unsplash.com/random/400x300/?singing',
      date: '2023-06-22',
      time: '2:00 PM'
    },
    {
      id: '3',
      title: 'கட்டுரைப் போட்டி',
      description: 'மேல்நிலைக்கான போட்டி: புவி வெப்பமயமாதலால் ஏற்படும் விளைவுகள் (5 நிமிடம்)',
      image: 'https://source.unsplash.com/random/400x300/?writing',
      date: '2023-06-29',
      time: '11:00 AM'
    }
  ];

  const displayCompetitions = competitions.length > 0 ? competitions : defaultCompetitions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CompetitionsContainer className="container">
        <h2 className="section-title">போட்டிகள்</h2>
        <CompetitionsList>
          <AnimatePresence>
            {displayCompetitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
              >
                <CompetitionImage src={competition.image} />
                <CompetitionContent>
                  <CompetitionTitle>{competition.title}</CompetitionTitle>
                  <CompetitionDescription>{competition.description}</CompetitionDescription>
                  <CompetitionDetails>
                    <CompetitionDetail>
                      <FaCalendarAlt />
                      {competition.date}
                    </CompetitionDetail>
                    <CompetitionDetail>
                      <FaClock />
                      {competition.time}
                    </CompetitionDetail>
                    <CompetitionDetail>
                      <FaTrophy />
                      பரிசுகள் உண்டு
                    </CompetitionDetail>
                  </CompetitionDetails>
                </CompetitionContent>
              </CompetitionCard>
            ))}
          </AnimatePresence>
        </CompetitionsList>
      </CompetitionsContainer>
    </motion.div>
  );
};

export default Competitions;