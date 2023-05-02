import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import ContactForm from "./ContactForm";

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

const Paragraph = styled.p`
  margin-top: 3rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3rem;
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
      <Paragraph>{user.description}</Paragraph>
      <FormContainer>
        <ContactForm
          onSubmit={contactUser}
          formName={"contact-user"}
          defaultData={user}
        />
      </FormContainer>
    </Article>
  );
}
