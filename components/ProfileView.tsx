import styled from "styled-components";
import { StyledImage } from "./StyledElements/StyledImage";
import Link from "next/link";
import { StyledLink } from "./StyledElements/StyledLink";

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.1fr 1fr;
  padding: 1rem;
  /* justify-items: center; */
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
  }
`;

const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-weight: 600;
  text-decoration: underline;
  grid-area: 1 / 1;
  margin: 1rem;
  @media (max-width: 979px) {
    text-decoration: none;
    border-bottom: 2px solid var(--secondaryColor);
  }
`;

const OfferContainer = styled.div`
  grid-area: 2 / 1;
  padding: 1rem;
`;

const HelperSettings = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 2fr;
  min-height: 10rem;
  padding-bottom: 5rem;
  border-bottom: 2px solid var(--secondaryColor);
  @media (max-width: 480px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const OfferTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  @media (max-width: 480px) {
    margin: 0;
  }
`;

const OfferDescription = styled.p`
  font-size: 1.2rem;
  @media (max-width: 480px) {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;

const UserContainer = styled.div`
  grid-area: 2 / 2;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  border-left: 2px solid var(--secondaryColor);
  padding: 1rem;
  @media (max-width: 1600px) {
    flex-direction: column;
    justify-content: center;
  }
  @media (max-width: 979px) {
    border-left: none;
    border-bottom: 2px solid var(--secondaryColor);
    grid-template-rows: 1fr 1fr;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const UserSettings = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 1rem;
  @media (max-width: 979px) {
    margin: 0;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const UserSince = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  grid-column: 1 / span 2;
  margin: 0;
  margin-bottom: 1rem;
`;

const UserName = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  grid-area: 2 / 1;
`;

const UserEmail = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  grid-area: 3 / 1;
`;

const UserLocation = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  grid-area: 4 / 1;
`;

const NewStyledImage = styled(StyledImage)`
  @media (max-width: 979px) {
    margin: 0;
  }
  @media (max-width: 768px) {
    height: 100%;
  }
  @media (max-width: 480px) {
  }
`;

const EmptyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
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
      <H2>Helper Settings</H2>

      <UserContainer>
        <NewStyledImage src={user.image} width={300} height={300} alt="" />

        <UserSettings>
          <UserSince>User Since - {userCreatedAt}</UserSince>
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>
          <UserEmail>{user.email}</UserEmail>
          <UserLocation>📍 {user.location}</UserLocation>
        </UserSettings>
      </UserContainer>

      <OfferContainer>
        <HelperSettings>
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
        <ButtonContainer>
          <Link href={`/users/${user._id}/edit`} passHref legacyBehavior>
            <StyledLink>Edit Profile</StyledLink>
          </Link>
        </ButtonContainer>
      </OfferContainer>
    </Article>
  );
}
