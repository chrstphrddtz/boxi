import { useState } from "react";
import styled from "styled-components";

import { Container } from "../StyledElements/StyledContainer";

const NewContainer = styled(Container)`
  margin-bottom: 0;
`;

const Question = styled.p`
  font-size: 1.3rem;
  text-decoration: underline;
  text-underline-offset: 0.5rem;
`;

const Answer = styled.p`
  font-size: 1rem;
  margin: 0 auto;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--secondaryColor);
`;

export default function Faq({ question, answer }: any) {
  const [showOfferInfo, setShowOfferInfo] = useState(false);

  function handleOfferClick() {
    setShowOfferInfo((current) => !current);
  }

  return (
    <NewContainer>
      <Question onClick={handleOfferClick}>{question}</Question>
      {showOfferInfo && <Answer>{answer}</Answer>}
    </NewContainer>
  );
}
