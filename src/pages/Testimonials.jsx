import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TestimonialsContainer = styled.div`
  padding: 5rem 0;
  background-color: var(--background-color);
`;

const TestimonialsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TestimonialContent = styled.div`
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const QuoteIcon = styled.span`
  position: absolute;
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 0.1;
  z-index: 0;
`;

const LeftQuote = styled(QuoteIcon)`
  top: -20px;
  left: -10px;
`;

const RightQuote = styled(QuoteIcon)`
  bottom: -20px;
  right: -10px;
`;

const TestimonialAuthor = styled.p`
  font-weight: bold;
  text-align: right;
  color: var(--primary-color);
`;

const Testimonials = () => {
  const testimonials = [
    {
      content: 'நூலகம் என்பது பொது அமைப்புகள், நிறுவனங்கள் அல்லது தனி நபர்களால் உருவாக்கப்பட்டுப் பேணப் படுகிற தகவல் மூலங்களின் அல்லது சேவைகளின் சேமிப்பு மரபு வழியான நோக்கில் இது நூல் களின் சேமிப்பு எனலாம். மாச்சம்பாளையம் என்ற கிராமத்தில் அமைந்துள்ள இந்த அன்பு நூலகம் எத்தனையோ குழந்தைகளின் வாழ்வில் ஒளியேற்றி இருக்கிறது.',
      author: 'தலைமையாசிரியர், V.S.S.M உயர்நிலைப்பள்ளி, சுந்தராபுரம், கோவை -24'
    },
    {
      content: 'உலக மக்களின் வாழ்வியல் விழுமியங்களை நெறிப்படுத்துவது நூல்கள். நூல்களின் கருத்துக்களை தனது அகத்தில் கொண்டு நடப்பவன் வாழ்வில் பண்பாட்டு ஞானியாகின்றான். கோவை மாவட்டத்தில் உள்ள குறிச்சி என்ற சிற்றூரில் உள்ள சின்னஞ்சிறு கிராமமான மாச்சம்பாளையம் இன்று தமிழகம் அறிந்த ஊராக, அங்குள்ள குடும்பங்கள் அனைத்திலும் ஒருவராவது ஆசிரியராக, மருத்துவராக, பொறியாளராக, வழக்கறிஞராக இவை அனைத்திற்கும் மேலான பண்பட்ட மனிதர்களாக இதற்கு உதவியது அன்பு நூலகம்.',
      author: 'முனைவர் ப தமிழாசி, தமிழ்துறைத் தலைவர், கற்பகம் பல்கலைகழகம், கோவை -21'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TestimonialsContainer className="container">
        <h2 className="section-title">கருத்துகள்</h2>
        <TestimonialsList>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialContent>
                <LeftQuote>
                  <FaQuoteLeft />
                </LeftQuote>
                {testimonial.content}
                <RightQuote>
                  <FaQuoteRight />
                </RightQuote>
              </TestimonialContent>
              <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsList>
      </TestimonialsContainer>
    </motion.div>
  );
};

export default Testimonials;