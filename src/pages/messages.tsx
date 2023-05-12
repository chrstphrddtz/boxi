import { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import styled from "styled-components";
import MessageList from "../../components/Messages/MessageList";
import ConversationDisplay from "../../components/Messages/MessageDisplay";

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
    grid-template-columns: 0.75fr 3fr
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 3fr
  }
  @media (max-width: 979px) {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1.75fr;

  }
`;

const ListContainer = styled.div`
  margin: -0.9rem 0.5rem;
  overflow-x: hidden;
  min-width: 12rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MessageContainer = styled.div`
  margin-bottom: 1rem;
  overflow-x: hidden;
  border-left: 2px solid var(--secondaryColor);
  ::-webkit-scrollbar {
    display: none;
  }
  /* @media (max-width: 844px) {
    z-index: 10;
    width: 80%
    height: 100%;
    margin: auto;
    padding: 0 5rem;
  } */
`;

export default withPageAuthRequired(function Messages() {
  const { user, error, isLoading } = useUser();
  const [message, setMessage] = useState("");

  const { data: messages } = useSWR(`/api/messages`, { fallbackData: [] });

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
        />
      </MessageContainer>
    </MainContainer>
  );
});
