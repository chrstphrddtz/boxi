import { StyledImage } from "./StyledElements/StyledImage";
import styled from "styled-components";

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  border-bottom: 1px solid var(--secondaryColor);
  margin-bottom: 0.25rem;
  padding: 0 0.5rem;
  &:hover {
    box-shadow: 1px 5px 10px -2px;
    background-color: var(--secondaryColor);
    color: var(--primaryColor);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const UserLocation = styled.p`
  font-size: 1.1rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
`;

const UserPrice = styled.p`
  font-size: 1.1rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
`;

const Availability = styled.p`
  font-size: 0.9rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
  margin-top: 1rem;
  /* border-bottom: 1px solid var(--secondaryColor); */
  @media (max-width: 844px) {
    width: 7rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
  margin-top: 0.5rem;
`;

export default function Card({
  name,
  image,
  location,
  price,
  description,
  id,
  handleClick,
  availability,
}: any) {
  const descriptionShort = description.slice(0, 80);

  return (
    <Article onClick={() => handleClick(id)}>
      <StyledImage src={image} width={200} height={200} alt="" />
      <TextContainer>
        <UserName>{name}</UserName>
        <UserLocation>{location}</UserLocation>
        <UserPrice>{price} €</UserPrice>
        <Availability>
          {availability.start} - {availability.end}
        </Availability>
        <Description>{descriptionShort}...</Description>
      </TextContainer>
    </Article>
  );
}
