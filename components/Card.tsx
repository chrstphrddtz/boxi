import Link from "next/link";
import { StyledImage } from "./StyledImage";
import styled from "styled-components";

const Article = styled.article`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 0.7rem;
  padding: 5px;
  margin: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; 
  border-radius: 5px; */
`;

const UserInfo = styled.p`
  font-size: 1.3rem;
  padding: 0.1rem;
  margin: 0.1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  padding: 0.1rem;
  margin: 0.1rem;
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
        <UserInfo>{name}</UserInfo>
        <UserInfo>{location}</UserInfo>
        <UserInfo>{price} €</UserInfo>
        <Description>{descriptionShort}...</Description>
      </TextContainer>
    </Article>
  );
}
