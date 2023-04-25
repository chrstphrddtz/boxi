import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import { StyledLink } from "./StyledLink";
import Form from "./Form";

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

const NewStyledImage = styled(StyledImage)`
  border-radius: 50%;
`;

export default function OfferView({ user }: any) {
  function contactUser(event: any) {
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    console.log(userData);
  }

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
        <NewStyledImage src={user.image} width={200} height={200} alt="" />
      </TopContainer>
      <p>{user.description}</p>
      <Form onSubmit={contactUser} formName={"contact-user"} />
      {/* <StyledLink href={`users/${user._id}`}>Contact</StyledLink> */}
    </Article>
  );
}
