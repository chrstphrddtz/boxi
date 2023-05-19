import { useRouter } from "next/router.js";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import useWindowSize, { Size } from "../../../../lib/Hooks/useMediaQuery";

import ContactForm from "../../../../components/Forms/ContactForm";
import styled from "styled-components";

import { StyledImage } from "../../../../components/StyledElements/StyledImage";
import { StyledButton } from "../../../../components/StyledElements/StyledButton";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  /* gap: 2rem; */
  padding: 1rem;
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--secondaryColor);
  padding-bottom: 2rem;
  width: 90%;
  margin: auto;
  @media (max-width: 480px) {
    padding-bottom: 0.5rem;
    /* justify-content: center; */
  }
`;

const NewStyledImage = styled(StyledImage)`
  border-radius: 50%;
  width: 10%;
  height: 10%;
  @media (max-width: 480px) {
    display: none;
  }
`;

const ListContainer = styled.div`
  overflow-x: hidden;
  margin-top: 2rem;
  ::-webkit-scrollbar {
    display: none; */
  }
  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 80%;
  margin: auto;
  @media (max-width: 979px) {
  }
  @media (max-width: 480px) {
    width: auto;
  }
`;

const ListItem = styled.li`
  width: 100%;
  margin: 0.5rem auto;
`;

const MessageContainer = styled.div`
  min-height: 2rem;
  border: 1px solid var(--secondaryColor);
  border-radius: 0.2rem;
  padding: 1rem;
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  @media (max-width: 480px) {
  }
`;

const ReceivedMessage = styled.p`
  margin: 0;
  margin-right: 10rem;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid var(--secondaryColor);
  @media (max-width: 768px) {
    margin-right: 5rem;
    line-break: auto;
  }
  @media (max-width: 480px) {
    margin-right: auto;
    padding: 0.5rem;
  }
`;

const SentMessage = styled.p`
  margin: 0;
  margin-left: 10rem;
  padding: 1rem;
  text-align: right;
  border-bottom: 2px solid var(--secondaryColor);
  @media (max-width: 768px) {
    margin-left: 5rem;
    line-break: auto;
  }
  @media (max-width: 480px) {
    margin-left: auto;
    padding: 0.5rem;
  }
`;

const DateDisplay = styled.p`
  margin: 0;
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
  font-style: italic;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const MessageFrom = styled.p`
  margin: 0;
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 90%;
  text-align: center;
  margin: auto;
  flex-direction: row;
  justify-content: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 2px solid var(--secondaryColor);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: auto;
  border-top: 2px solid var(--secondaryColor);
  padding-top: 1rem;
  margin-top: 10rem;
  @media (max-width: 979px) {
  }
`;

const NewStyledButton = styled(StyledButton)`
  margin: 0.5rem 0;
`;

const EmptyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
`;

export default withPageAuthRequired(function ConversationDisplay() {
  const router = useRouter();
  const { push } = router;
  const { id } = router.query;
  const { user, isLoading: userIsLoading }: any = useUser();
  const { data: allMessages, isLoading: allMessagesIsLoading } =
    useSWR("/api/messages");
  const { data: message, isLoading: messageIsLoading } = useSWR(
    `/api/messages/${id}`
  );
  const { data: users } = useSWR("/api/users", { fallbackData: [] });

  const size: Size = useWindowSize();

  if (userIsLoading || messageIsLoading || allMessagesIsLoading)
    return <div>Getting User Data...</div>;

  const me = user.sub;
  const them = message.sender === me ? message.receiver : message.sender;

  function conversationFilter(allData: any) {
    if (!message) return "";
    const filteredMessages = allData.filter((messageData: any) => {
      const involesMe =
        messageData.sender === me || messageData.receiver === me;
      const involvesThem =
        messageData.sender === them || messageData.receiver === them;

      return involesMe && involvesThem;
    });
    return filteredMessages;
  }

  if (message === "") {
    return (
      <EmptyArticle>
        <h1>Select a message</h1>
      </EmptyArticle>
    );
  }

  function returnBigScreen() {
    // return push("/messages");
  }

  function returnSmallScreen() {
    return (
      <Article>
        <TopContainer>
          <div>
            <h2 onClick={() => push(`users/${id}`)}>{message.name}</h2>
          </div>
          <NewStyledButton
            onClick={() => {
              router.back();
            }}
          >
            Back
          </NewStyledButton>
        </TopContainer>
        <ListContainer>
          <StyledList>
            {conversationFilter(allMessages) &&
              conversationFilter(allMessages)?.map((message: any) => {
                const timeStamp = new Date(message.timestamp);
                const timeStampDay = timeStamp.getDate();
                const timeStampMonth = timeStamp.getMonth() + 1;
                const timeStampYear = timeStamp.getFullYear();
                const timeStampHous = timeStamp.getHours();
                const timeStampMinutes = timeStamp.getMinutes();
                const contactedDate = `${timeStampYear}.${timeStampMonth}.${timeStampDay}`;
                const contactedTime = `${timeStampHous}:${timeStampMinutes}`;

                return (
                  <ListItem key={message._id}>
                    {user.sub === message.sender ? (
                      <MessageContainer>
                        <SentMessage>{message.message}</SentMessage>
                        <Container>
                          <DateDisplay>
                            {contactedDate} - {contactedTime}
                          </DateDisplay>
                          <MessageFrom>{message.name}</MessageFrom>
                        </Container>
                      </MessageContainer>
                    ) : (
                      <MessageContainer>
                        <ReceivedMessage>{message.message}</ReceivedMessage>
                        <Container>
                          <MessageFrom>{message.name}</MessageFrom>
                          <DateDisplay>
                            {contactedDate} - {contactedTime}
                          </DateDisplay>
                        </Container>
                      </MessageContainer>
                    )}
                  </ListItem>
                );
              })}
          </StyledList>
        </ListContainer>
        <FormContainer>
          <ContactForm
            formName={"contact-user"}
            filteredUser={message}
            data={users}
          />
        </FormContainer>
      </Article>
    );
  }

  return (
    <>
      {/* {size.width && size.width > 979 && returnBigScreen()} */}
      {/* {size.width && size.width <= 979 && returnSmallScreen()} */}
      {returnSmallScreen()}
    </>
  );
});
