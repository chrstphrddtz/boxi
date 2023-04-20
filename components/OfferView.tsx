import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import { StyledButton } from "./StyledButton";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function OfferView({ user }: any) {

  if (user === "") {
    return (
      <Article>

      </Article>
    )
  }
  
  return (
    <Article>
      <TopContainer>
        <h2>Offer from {user.firstName}</h2>
        <StyledImage src={user.image} width={200} height={200} alt="" />
      </TopContainer>
      <h3>{user.price} €</h3>
      <p>{user.description}</p>
      <StyledButton>Contact</StyledButton>
    </Article>
  );
}
