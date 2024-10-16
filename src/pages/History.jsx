import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HistoryContainer = styled.div`
  padding: 5rem 0;
  background-color: var(--white);
`;

const TimelineWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background-color: var(--primary-color);
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${(props) => (props.isLeft ? "flex-end" : "flex-start")};
  padding-left: ${(props) => (props.isLeft ? "0" : "50%")};
  padding-right: ${(props) => (props.isLeft ? "50%" : "0")};
  position: relative;
  margin-bottom: 4rem;
  width: 100%;
`;

const TimelineContent = styled.div`
  background-color: var(--background-color);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    ${(props) =>
      props.isLeft
        ? "right: -10px; border-left: 10px solid var(--background-color);"
        : "left: -10px; border-right: 10px solid var(--background-color);"}
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: var(--secondary-color);
  border: 4px solid var(--primary-color);
  border-radius: 50%;
  transform: translateX(-50%);
`;

const TimelineYear = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
`;

const History = () => {
  const timelineItems = [
    {
      year: 1976,
      content: 'நூலகம் "அன்படாகம்" என்ற பெயரில் துவக்கப்பட்டது.',
    },
    {
      year: 1980,
      content: "மாணவர்களுக்கான போட்டிகள் துவங்கப்பட்டன.",
    },
    {
      year: 1984,
      content: '"நண்பர்கள் நாலரும்" என்ற பெயரில் புதிய நூலகம் துவங்கப்பட்டது.',
    },
    {
      year: 1991,
      content:
        '"நண்பர்கள் அன்படநாலகம்" என்ற பெயரில் இரண்டு நூலகங்களும் இணைக்கப்பட்டன.',
    },
    {
      year: "தற்போது",
      content: "தொடர்ந்து சமூக சேவையும், கல்வி உதவியும் வழங்கப்படுகிறது.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HistoryContainer>
        <div className="container">
          <SectionTitle>நூலக வரலாறு</SectionTitle>
          <TimelineWrapper>
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <TimelineItem
                  key={index}
                  isLeft={isLeft}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <TimelineContent isLeft={isLeft}>
                    <TimelineYear>{item.year}</TimelineYear>
                    <p>{item.content}</p>
                  </TimelineContent>
                  <TimelineDot />
                </TimelineItem>
              );
            })}
          </TimelineWrapper>
        </div>
      </HistoryContainer>
    </motion.div>
  );
};

export default History;
