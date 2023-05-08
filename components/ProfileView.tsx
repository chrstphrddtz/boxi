import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import Link from "next/link";
import { StyledLink } from "./StyledLink";
import ContactForm from "./ContactForm";

const Article = styled.article`
  padding: 1rem;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 1rem;
`;

const UserDataContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 2fr;
  /* gap: 1rem; */
  padding: 1rem;
  border: 1px solid #0f0e0e;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  min-height: 60%;
  max-width: 80%;
  box-shadow: 0px 2px 10px -2px;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  }
`;

const UserData = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const OfferContainer = styled.div`
  margin: 0 1rem;
`;

const HelperSettings = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 2fr;
  padding: 1rem;
  border: 1px solid #0f0e0e;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  min-height: 10rem;
  box-shadow: 0px 2px 10px -2px;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  }
`;

const OfferTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const OfferDescription = styled.p`
  font-size: 1.2rem;
`;

const H2 = styled.h2`
  letter-spacing: 0.2rem;
  text-decoration: underline;
  grid-column: 1 / span 2;
`;

const Divider = styled.div`
  border-bottom: 2px solid #0f0e0e;
  margin: 3rem 1rem;
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
  box-shadow: 0px 2px 10px -2px;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  }
`;

const NewStyledLink = styled(StyledLink)`
  position: absolute;
  margin: 1rem;
`;

export default function ProfileView({ user }: any) {
  if (user === undefined) {
    return (
      <EmptyArticle>
        <h1>...getting User Data</h1>
      </EmptyArticle>
    );
  }

  // Date created at:
  const createdAt = new Date(user.createdAt);
  const createdAtDay = createdAt.getDate();
  const createdAtMonth = createdAt.getMonth() + 1;
  const createdAtYear = createdAt.getFullYear();
  const userCreatedAt = `${createdAtYear}.${createdAtMonth}.${createdAtDay}`;

  // Availability Start Date
  const availabilityStart = new Date(user.availability.start);
  const startDay = availabilityStart.getDate();
  const startMonth = availabilityStart.getMonth() + 1;
  const startYear = availabilityStart.getFullYear();
  const startDate = `${startYear}.${startMonth}.${startDay}`;

  // Availability End Date
  const availabilityEnd = new Date(user.availability.end);
  const endDay = availabilityEnd.getDate();
  const endMonth = availabilityEnd.getMonth() + 1;
  const endYear = availabilityEnd.getFullYear();
  const endDate = `${endYear}.${endMonth}.${endDay}`;

  return (
    <Article>
      <UserContainer>
        <UserDataContainer>
          <UserData>User Since:</UserData>
          <UserData>{userCreatedAt}</UserData>
          <UserData>Name:</UserData>
          <UserData>
            {user.firstName} {user.lastName}
          </UserData>
          <UserData>Email:</UserData>
          <UserData>{user.email}</UserData>
          <UserData>Address:</UserData>
          <UserData>{user.location}</UserData>
        </UserDataContainer>
        <NewStyledImage src={user.image} width={300} height={300} alt="" />
      </UserContainer>
      <Divider />
      <OfferContainer>
        {/* <H2>Helper Settings</H2> */}
        <HelperSettings>
          <H2>Helper Settings</H2>
          <OfferTitle>Active:</OfferTitle>
          <OfferDescription>{user.active ? "✅" : "❌"}</OfferDescription>
          <OfferTitle>Offer Price:</OfferTitle>
          <OfferDescription>{user.price} €</OfferDescription>
          <OfferTitle>Your Availability:</OfferTitle>
          <OfferDescription>
            {startDate} - {endDate}
          </OfferDescription>
          <OfferTitle>Description:</OfferTitle>
          <OfferDescription>{user.description}</OfferDescription>
        </HelperSettings>
      </OfferContainer>
      <Link href={`/users/${user._id}/edit`} passHref legacyBehavior>
        <NewStyledLink>Edit Profile</NewStyledLink>
      </Link>
    </Article>
  );
}
