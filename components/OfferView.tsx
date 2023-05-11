import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import { useState } from "react";

import useWindowSize, { Size } from "../lib/Hooks/useMediaQuery";

import styled from "styled-components";
import { StyledImage } from "./StyledElements/StyledImage";
import { StyledButton } from "./StyledElements/StyledButton";
import ContactForm from "./Forms/ContactForm";

import Map from "./Map";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 2rem;
  padding: 0.5rem;
  @media (max-width: 1600px) {
    margin: auto 1rem;
  }
  @media (max-width: 979px) {
  }
  /* @media (max-width: 979px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  } */
`;

const ButtonContainer = styled.div`
  position: absolute;
`;

const OfferContainer = styled.div`
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
    border-top: 2px solid var(--secondaryColor);
  }
`;

const ContactContainer = styled.div``;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 979px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Paragraph = styled.p`
  @media (max-width: 979px) {
    margin-top: 1rem;
  }
`;

const H2 = styled.h2`
  margin-top: 3rem;
  margin-bottom: 0;
  font-size: 1.2rem;
  @media (max-width: 979px) {
    margin-top: 0;
  }
`;

const H3 = styled.h3`
  margin-top: 3rem;
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
  const messages = useSWR("/api/messages");
  const { user } = useUser();

  const [showOfferInfo, setShowOfferInfo] = useState(true);
  const size: Size = useWindowSize();

  function handleOfferClick() {
    setShowOfferInfo((current) => !current);
  }

  const findCurrentUser = data.find((userInDB: any) => {
    return userInDB.email === user?.email;
  });

  async function handleContactUser(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    const messagetoStore = {
      ...messageData,
      name: findCurrentUser.firstName,
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

  // if (filteredUser === "") {
  //   return (
  //     <EmptyArticle>
  //       <h1>Select a profile</h1>
  //     </EmptyArticle>
  //   );
  // }

  if (!filteredUser || filteredUser.length === 0) {
    return <EmptyArticle></EmptyArticle>;
  }

  function returnBigScreen() {
    return (
      <Article>
        <OfferContainer>
          <TopContainer>
            <div>
              <h2>Offer from {filteredUser.firstName}</h2>
              <h3>{filteredUser.price} € / h</h3>
            </div>
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
              onSubmit={handleContactUser}
              formName={"contact-user"}
              defaultData={user}
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

  // function returnMediumScreen() {
  //   return (
  //     <Article>
  //       <OfferContainer>
  //         <TopContainer>
  //           <div>
  //             <h2>Offer from {filteredUser.firstName}</h2>
  //             <h3>{filteredUser.price} €</h3>
  //           </div>
  //           <NewStyledImage
  //             src={filteredUser.image}
  //             width={200}
  //             height={200}
  //             alt=""
  //           />
  //         </TopContainer>
  //         <div>
  //           <H3>Description</H3>
  //           <Paragraph>{filteredUser.description}</Paragraph>
  //         </div>
  //       </OfferContainer>
  //       <FormContainer>
  //         {user ? (
  //           <ContactForm
  //             onSubmit={handleContactUser}
  //             formName={"contact-user"}
  //             defaultData={user}
  //           />
  //         ) : (
  //           <div>
  //             <a href={"/api/auth/signup"}>Sign Up</a> or{" "}
  //             <a href={"/api/auth/login"}>Log In</a> to Contact User
  //           </div>
  //         )}
  //       </FormContainer>
  //       {/* <Map /> */}
  //     </Article>
  //   );
  // }

  function returnSmallScreen() {
    return (
      <Article>
        <ButtonContainer>
          <StyledButton onClick={handleOfferClick}>
            {showOfferInfo ? "Contact User" : "Show Offer"}
          </StyledButton>
        </ButtonContainer>
        {showOfferInfo ? (
          <OfferContainer>
            <TopContainer>
              <h2>Offer from {filteredUser.firstName}</h2>
              <h3>Price - {filteredUser.price} € / h</h3>
              <NewStyledImage
                src={filteredUser.image}
                width={200}
                height={200}
                alt=""
              />
            </TopContainer>
            <H2>Description</H2>
            <Paragraph>{filteredUser.description}</Paragraph>
          </OfferContainer>
        ) : (
          <ContactContainer>
            <FormContainer>
              {user ? (
                <ContactForm
                  onSubmit={handleContactUser}
                  formName={"contact-user"}
                  defaultData={user}
                />
              ) : (
                <div>
                  <a href={"/api/auth/signup"}>Sign Up</a> or{" "}
                  <a href={"/api/auth/login"}>Log In</a> to Contact User
                </div>
              )}
            </FormContainer>
          </ContactContainer>
        )}
        {/* <Map /> */}
      </Article>
    );
  }

  return (
    <>
      {size.width && size.width > 979 && returnBigScreen()}
      {/* {size.width && size.width > 589 && returnMediumScreen()} */}
      {size.width && size.width <= 979 && returnSmallScreen()}
    </>
  );
}
