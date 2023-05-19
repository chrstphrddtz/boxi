import { useUser } from "@auth0/nextjs-auth0/client";

import ContactForm from "./Forms/ContactForm";

import styled from "styled-components";
import { StyledImage } from "./StyledElements/StyledImage";

// import Map from "./Map";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 2rem;
  padding: 2rem;
  @media (max-width: 1600px) {
    margin: auto 1rem;
  }
  @media (max-width: 979px) {
  }
`;

const OfferContainer = styled.div`
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
  }
`;

const OfferInfoContainer = styled.div``;

const AvailabilityContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  @media (max-width: 979px) {
    gap: 2rem;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    /* border-bottom: 1px solid var(--secondaryColor); */
  }
`;

const Paragraph = styled.p`
  @media (max-width: 979px) {
    margin-top: 1rem;
  }
`;

const H2 = styled.h2`
  margin: 1rem auto;
  font-size: 1.5rem;
  border-bottom: 2px solid var(--secondaryColor);
  padding-bottom: 0.25rem;
  @media (max-width: 979px) {
    margin-top: 2rem;
  }
`;

const H3 = styled.h3`
  margin-top: 3rem;
  margin-bottom: 0;
  font-size: 1.2rem;
  @media (max-width: 979px) {
    margin-top: 1rem;
    /* border-bottom: 1px solid var(--secondaryColor); */
  }
`;

const H4 = styled.h4`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 1.2rem;
  @media (max-width: 979px) {
    /* margin-top: 0; */
  }
`;

const H5 = styled.h5`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2rem;
  @media (max-width: 979px) {
    margin-top: 0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5rem;
  @media (max-width: 979px) {
    margin-top: 1rem;
  }
  @media (max-width: 500px) {
    position: fixed;
    margin-top: 1rem;
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

const NewStyledImage = styled(StyledImage)`
  border-radius: 50%;
  @media (max-width: 979px) {
    display: none;
  }
`;

export default function OfferView({ filteredUser, data }: any) {
  const { user } = useUser();

  if (!filteredUser || filteredUser.length === 0) {
    return <EmptyArticle></EmptyArticle>;
  }

  return (
    <Article>
      <OfferContainer>
        <TopContainer>
          <OfferInfoContainer>
            <H2>Offer from {filteredUser.firstName}</H2>
            <H4>📍 {filteredUser.location}</H4>
            <AvailabilityContainer>
              <H4>Availability</H4>
              <H5>
                {filteredUser.availability.start} -{" "}
                {filteredUser.availability.end}
              </H5>
            </AvailabilityContainer>
            <H4>{filteredUser.price} € / h</H4>
          </OfferInfoContainer>
          <NewStyledImage
            src={filteredUser.image}
            width={200}
            height={200}
            alt=""
          />
        </TopContainer>
        <div>
          <H3>Description</H3>
          <Paragraph>{filteredUser.description}</Paragraph>
        </div>
      </OfferContainer>
      <FormContainer>
        {user ? (
          <ContactForm
            formName={"contact-user"}
            defaultData={user}
            data={data}
            filteredUser={filteredUser}
          />
        ) : (
          <div>
            <a href={"/api/auth/signup"}>Sign Up</a> or{" "}
            <a href={"/api/auth/login"}>Log In</a> to Contact User
          </div>
        )}
      </FormContainer>
      {/* <Map /> */}
    </Article>
  );
}
