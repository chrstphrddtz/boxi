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

const EmptyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
`;

export default function OfferView({ user }: any) {
  if (user === "") {
    return (
      <EmptyArticle>
        <h1>Select a profile</h1>
      </EmptyArticle>
    );
  }

  return (
    <Article>
      <TopContainer>
        <div>
          <h2>Offer from {user.firstName}</h2>
          <h3>{user.price} €</h3>
        </div>
        <StyledImage src={user.image} width={200} height={200} alt="" />
      </TopContainer>
      <p>{user.description}</p>
      <StyledButton>Contact</StyledButton>
    </Article>
  );
}
