import ContactForm from "../Forms/ContactForm";
import styled from "styled-components";
import { StyledImage } from "../StyledElements/StyledImage";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  /* gap: 2rem; */
  padding: 1rem;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--secondaryColor);
  padding-bottom: 2rem;
`;

const NewStyledImage = styled(StyledImage)`
  border-radius: 50%;
  width: 10%;
  height: 10%;
`;

const ListContainer = styled.div`
  overflow-x: hidden;
  margin-top: 2rem;
  ::-webkit-scrollbar {
    display: none; */
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 80%;
  margin: auto;
  @media (max-width: 979px) {
  }
`;

const ListItem = styled.li`
  min-width: 30rem;
  @media (max-width: 979px) {
  }
`;

const MessageContainer = styled.div`
  min-height: 2rem;
  border: 1px solid var(--secondaryColor);
  border-radius: 0.2rem;
  padding: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReceivedMessage = styled.p`
  margin: 0;
  margin-right: 10rem;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid var(--secondaryColor);
`;

const SentMessage = styled.p`
  margin: 0;
  margin-left: 10rem;
  padding: 1rem;
  text-align: right;
  border-bottom: 2px solid var(--secondaryColor);
`;

const DateDisplay = styled.p`
  margin: 0;
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
  font-style: italic;
`;

const MessageFrom = styled.p`
  margin: 0;
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  margin: auto;
  flex-direction: row;
  justify-content: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 2px solid var(--secondaryColor);
`;

const EmptyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
`;

export default function ConversationDisplay({
  currentUser,
  message,
  filteredMessages,
}: any) {
  const me = currentUser.sub;
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

  // -----------------------------------------------
  const { user } = useUser();
  const messages = useSWR("/api/messages");

  async function handleContactUser(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    const messagetoStore = {
      ...messageData,
      name: currentUser.nickname,
      sender: currentUser.sub,
      receiver: message.sender,
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

  if (message === "") {
    return (
      <EmptyArticle>
        <h1>Select a message</h1>
      </EmptyArticle>
    );
  }

  return (
    <Article>
      <TopContainer>
        <div>
          <h2>{message.name}</h2>
        </div>
        <NewStyledImage
          src={currentUser.picture}
          width={200}
          height={200}
          alt=""
        />
      </TopContainer>
      <ListContainer>
        <StyledList>
          {conversationFilter(filteredMessages) &&
            conversationFilter(filteredMessages)?.map((message: any) => {
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
                  {currentUser.sub === message.sender ? (
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
          onSubmit={handleContactUser}
          formName={"contact-user"}
          defaultData={user}
          // data={data}
          // filteredUser={filteredUser}
        />
      </FormContainer>
    </Article>
  );
}
