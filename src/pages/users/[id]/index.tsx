import { useRouter } from "next/router.js";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import styled from "styled-components";
import { StyledButton } from "../../../../components/StyledElements/StyledButton";
import ContactForm from "../../../../components/Forms/ContactForm";

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  border-top: 2px solid var(--secondaryColor);
  padding-top: 1rem;
  margin-top: 10rem;
  @media (max-width: 979px) {
  }
`;

const OfferContainer = styled.div`
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContactContainer = styled.div`
  @media (max-width: 979px) {
    margin-top: 5rem;
  }
`;

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
    margin-top: 1rem;
  }
`;

export default function ContactUser() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { user }: any = useUser();
  const messages = useSWR("/api/messages");
  const { data: filteredUser, isLoading, error } = useSWR(`/api/users/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function handleContactUser(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    const messagetoStore = {
      ...messageData,
      name: user.nickname,
      sender: user.sub,
      receiver: filteredUser.user_id,
      timestamp: Date(),
      isRead: false,
    };

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagetoStore),
    });

    if (response.ok) {
      messages.mutate();
      event.target.reset();
    } else {
      console.error(response.status);
    }
  }

  return (
    <Article>
      <OfferContainer>
        <H2>Offer from {filteredUser.firstName}</H2>
        <TopContainer>
          <H4>📍 {filteredUser.location}</H4>
          <AvailabilityContainer>
            <H4>Availability</H4>
            <H5>
              {filteredUser.availability.start} -{" "}
              {filteredUser.availability.end}
            </H5>
          </AvailabilityContainer>
          <H4>{filteredUser.price} € / h</H4>
        </TopContainer>
        <H3>Description</H3>
        <Paragraph>{filteredUser.description}</Paragraph>
      </OfferContainer>

      <ContactContainer>
        <FormContainer>
          <ContactForm
            onSubmit={handleContactUser}
            formName={"contact-user"}
            defaultData={user}
          />
        </FormContainer>
      </ContactContainer>

      <ButtonContainer>
        <StyledButton
          onClick={() => {
            router.back();
          }}
        >
          Back
        </StyledButton>
      </ButtonContainer>
    </Article>
  );
}
