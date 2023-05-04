import { StyledImage } from "./StyledImage";
import styled from "styled-components";

const Article = styled.article`
  background-color: #f3e8d7;
  /* display: flex;
  flex-direction: row; */
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1rem;
  /* border-bottom: 2px solid black; */
  /* border-radius: 0.7rem; */
  /* padding: 5px; */
  /* margin: 10px; */
  &:hover {
    /* background-color: rgba(226, 172, 85, 80%); */
    background-color: #0f0e0e;
    color: #e2ac55;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 1.3rem;
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
