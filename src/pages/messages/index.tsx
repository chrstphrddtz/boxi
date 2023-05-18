import { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import useWindowSize, { Size } from "../../../lib/Hooks/useMediaQuery";

import styled from "styled-components";
import MessageList from "../../../components/Messages/MessageList";
import ConversationDisplay from "../../../components/Messages/MessageDisplay";

const RedirectDiv = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  width: 60%;
  margin: auto;
`;

const RedirectTitle = styled.h2`
  font-size: 2rem;
  margin-top: 3rem;
`;

const MainContainer = styled.div`
  height: 95vh;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 0.5fr 3fr;
  @media (max-width: 1600px) {
    grid-template-columns: 0.75fr 3fr;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
`;

const ListContainer = styled.div`
  margin: -0.9rem 0.5rem;
  overflow-x: hidden;
  min-width: 12rem;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 979px) {
    padding: 2rem;
  }
`;

const MessageContainer = styled.div`
  margin-bottom: 1rem;
  overflow-x: hidden;
  border-left: 2px solid var(--secondaryColor);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-weight: 600;
  margin: 2rem 1rem;
  text-align: center;
  @media (max-width: 979px) {
    text-decoration: none;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondaryColor);
  }
`;

export default withPageAuthRequired(function Messages() {
  const { user, error, isLoading } = useUser();
  const [message, setMessage] = useState("");

  const { data: users} = useSWR("/api/users", { fallbackData: [] });
  const { data: messages } = useSWR(`/api/messages`, { fallbackData: [] });

  const size: Size = useWindowSize();

  if (isLoading) return <div>Getting User Data...</div>;
  if (user === undefined)
    return (
      <RedirectDiv>
        <RedirectTitle>You don&apos;t have a profile yet.</RedirectTitle>
      </RedirectDiv>
    );

  if (!messages)
    return (
      <RedirectDiv>
        <RedirectTitle>No Messages yet ...</RedirectTitle>
      </RedirectDiv>
    );
  if (error) return <div>{error.message}</div>;

  function filterMessagesByLoggedInUser(messagesData: any) {
    if (!user) return "";
    const filter = messagesData.filter(
      (element: any) =>
        element.receiver === user.sub || element.sender === user.sub
    );
    return filter;
  }

  function handleClick(messagesData: string) {
    const newMessage = messages.find(
      (element: any) => element._id === messagesData
    );
    setMessage(newMessage);
  }

  function returnBigScreen() {
    return (
      <MainContainer>
        <ListContainer>
          <MessageList
            messages={filterMessagesByLoggedInUser(messages)}
            handleClick={handleClick}
          />
        </ListContainer>
        <MessageContainer>
          <ConversationDisplay
            currentUser={user}
            message={message}
            filteredMessages={filterMessagesByLoggedInUser(messages)}
            userData={users}
          />
        </MessageContainer>
      </MainContainer>
    );
  }

  function returnSmallScreen() {
    return (
      <MainContainer>
        <H2>Messages</H2>
        <ListContainer>
          <MessageList
            messages={filterMessagesByLoggedInUser(messages)}
            handleClick={handleClick}
            userData={users}
          />
        </ListContainer>
      </MainContainer>
    );
  }

  return (
    <>
      {size.width && size.width > 979 && returnBigScreen()}
      {size.width && size.width <= 979 && returnSmallScreen()}
    </>
  );
});
