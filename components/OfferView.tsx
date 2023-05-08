import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import styled from "styled-components";
import { StyledImage } from "./StyledImage";
import ContactForm from "./ContactForm";

import Map from "./Map";

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

export default function OfferView({ filteredUser, data }: any) {
  const { user } = useUser();
  const messages = useSWR("/api/messages");

  const findCurrentUser = data.find((userInDB: any) => {
    return userInDB.email === user?.email;
  });

  async function handleContactUser(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    const messagetoStore = {
      ...messageData,
      sender: findCurrentUser.user_id,
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

  if (filteredUser === "") {
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
          <h2>Offer from {filteredUser.firstName}</h2>
          <h3>{filteredUser.price} €</h3>
        </div>
        <NewStyledImage
          src={filteredUser.image}
          width={200}
          height={200}
          alt=""
        />
      </TopContainer>
      <Paragraph>{filteredUser.description}</Paragraph>
      <Map />
      <FormContainer>
        {user ? (
          <ContactForm
            onSubmit={handleContactUser}
            formName={"contact-user"}
            defaultData={user}
            // data={data}
            // filteredUser={filteredUser}
          />
        ) : (
          <div>
            <a href={"/api/auth/signup"}>Sign Up</a> or{" "}
            <a href={"/api/auth/login"}>Log In</a> to Contact User
          </div>
        )}
      </FormContainer>
    </Article>
  );
}
