import ContactForm from "../Forms/ContactForm";
import styled from "styled-components";
import { StyledImage } from "../StyledElements/StyledImage";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const TopContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  /* align-items: flex-start; */
  justify-content: space-between;
`;

const ListContainer = styled.div`
  /* margin: -0.9rem auto; */
  overflow-x: hidden;
  /* background-color: #f3e8d7; */
  ::-webkit-scrollbar {
    display: none; */
  }
`;

const StyledList = styled.ul`
  /* background-color: #f3e8d7; */
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* align-items: center; */
  gap: 0.5rem;
  padding: 0.5rem;
`;

const ListItem = styled.li`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  min-width: 15rem;

  /* width: 100%; */
  /* margin: auto 0;  */
`;

const Received = styled.p`
  background-color: #f3e8d7;
  padding: 0.5rem;
  margin: 0;
  min-height: 2rem;
`;

const Sent = styled.p`
  background-color: red;
  padding: 0.5rem;
  margin: 0;
  min-height: 2rem;
`;

const DateDisplay = styled.p`
  margin: 0;
  margin-bottom: 1.5rem;
  text-align: right;
  font-size: 0.9rem;
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
                    <Sent>{message.message}</Sent>
                  ) : (
                    <Received>{message.message}</Received>
                  )}
                  <DateDisplay>
                    {contactedDate} - {contactedTime}
                  </DateDisplay>
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
