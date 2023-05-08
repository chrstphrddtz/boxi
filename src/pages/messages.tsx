import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import styled from "styled-components";
import MessageList from "../../components/Chat/MessageList";
import ConversationDisplay from "../../components/Chat/MessageDisplay";

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
  grid-template-columns: 1fr 6fr;
  position: fixed;
  /* @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  } */
`;

const ListContainer = styled.div`
  margin: -0.9rem auto;
  overflow-x: hidden;
  background-color: #f3e8d7;
  min-width: 12rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MessageContainer = styled.div`
  background-color: #E2AC55;
  margin-bottom: 1rem;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  };
  @media (max-width: 844px) {
    z-index: 10;
    width: 80%
    height: 100%;
    margin: auto;
    padding: 0 5rem;
  }
`;

export default function Messages() {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(5);
  const { user, error, isLoading } = useUser();
  const [message, setMessage] = useState("");

  const {
    data: messages,
    isLoading: swrIsLoading,
    error: swrError,
  } = useSWR(`/api/messages`, { fallbackData: [] });

  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (user === undefined) {
      if (redirectSeconds === 0) {
        push("/api/auth/signup");
        return;
      }
      setTimeout(() => {
        console.log(redirectSeconds);
        setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
      }, 1000);
    }
  }, [user, push, redirectSeconds]);

  if (isLoading) return <div>Getting User Data...</div>;
  if (user === undefined)
    return (
      <RedirectDiv>
        <RedirectTitle>
          You don&apos;t have a profile yet. You will be redirected to the
          Signup page in {redirectSeconds} seconds ...
        </RedirectTitle>
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
          unfilteredMessages={messages}
          filteredMessages={filterMessagesByLoggedInUser(messages)}
        />
      </MessageContainer>
    </MainContainer>
  );
}
