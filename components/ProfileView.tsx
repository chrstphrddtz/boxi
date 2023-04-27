import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import Link from "next/link";
import { StyledLink } from "./StyledLink";
import ContactForm from "./ContactForm";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
`;

const OfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin: 1rem;
`;

const UserData = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

const Paragraph = styled.p`
  margin-top: 3rem;
`;

const Divider = styled.div`
  border-bottom: 2px solid black;
  margin: 3rem 1rem; 
`

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

export default function ProfileView({ user }: any) {
  // function contactUser(event: any) {
  //   const formData = new FormData(event.target);
  //   const userData = Object.fromEntries(formData);
  //   console.log(userData);
  // }

  if (user === undefined) {
    return (
      <EmptyArticle>
        <h1>...getting User Data</h1>
      </EmptyArticle>
    );
  }

  return (
    <Article>
      <UserContainer>
        <div>
          <UserData>{user.firstName}</UserData>
          <UserData>{user.lastName}</UserData>
        </div>
        <NewStyledImage src={user.image} width={300} height={300} alt="" />
      </UserContainer>
      <Divider/>
      <OfferContainer>
        <h2>Your Offer</h2>
        <Paragraph>{user.description}</Paragraph>
      </OfferContainer>
        <Link href={`/profile/${user._id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
    </Article>
  );
}
