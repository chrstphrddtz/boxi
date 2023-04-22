import { StyledImage } from "./StyledImage";
import styled from "styled-components";

const Article = styled.article`
  background-color: #F3E8D7;
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
    /* border: 2px solid black; */
    background-color: rgba(226, 172, 85, 80%);
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

const Description = styled.p`
  font-size: 0.9rem;
  padding: 0.1rem 0;
  margin: 0.1rem 0;
  margin-top: 1rem;
`;

export default function Card({
  name,
  image,
  location,
  price,
  description,
  id,
  handleClick,
}: any) {
  const descriptionShort = description.slice(0, 80);

  return (
    <Article onClick={() => handleClick(id)}>
      <StyledImage src={image} width={200} height={200} alt="" />
      <TextContainer>
        <UserName>{name}</UserName>
        <UserLocation>{location}</UserLocation>
        <UserPrice>{price} €</UserPrice>
        <Description>{descriptionShort}...</Description>
      </TextContainer>
    </Article>
  );
}
