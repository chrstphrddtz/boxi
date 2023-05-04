import styled from "styled-components";
import MessageCard from "./MessageCard";

const StyledList = styled.ul`
  background-color: #f3e8d7;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  /* padding-top: 0.5rem; */
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  margin: auto;
`;

export default function MessageList({ messages, handleClick }: any) {
  console.log("message from MessageList after filter", messages);

  return (
    <>
      <StyledList>
        {messages &&
          messages?.map((message: any) => {
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
                <MessageCard
                  name={message.name}
                  date={contactedDate}
                  time={contactedTime}
                  id={message._id}
                  handleClick={handleClick}
                />
              </ListItem>
            );
          })}
      </StyledList>
    </>
  );
}
