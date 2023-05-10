import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question = styled.p`
  font-size: 1.3rem;
  text-decoration: underline;
  text-underline-offset: 0.5rem;
`;

const Answer = styled.p`
  font-size: 1rem;
  margin: 0 auto;
  /* text-align: left; */
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--secondaryColor);
`;

export default function Faq({question, answer}: any) {
  const [showOfferInfo, setShowOfferInfo] = useState(false);

  function handleOfferClick() {
    setShowOfferInfo((current) => !current);
  }

  return (
    <Container>
      <Question onClick={handleOfferClick}>{question}</Question>
      {showOfferInfo && 
      <Answer>{answer}</Answer> }
    </Container>
  );
}
