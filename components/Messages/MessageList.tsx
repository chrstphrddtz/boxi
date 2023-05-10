import styled from "styled-components";
import MessageCard from "./MessageCard";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (max-width: 979px) {
  }
  @media (max-width: 480px) {
    width: 50%;
  }
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  margin: auto;
`;

export default function MessageList({ messages, handleClick }: any) {
  const filteredMessages = messages.reduce((accumulator: any, current: any) => {
    if (
      !accumulator.find((message: any) => message.sender === current.sender)
    ) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return (
    <>
      <StyledList>
        {filteredMessages &&
          filteredMessages
            ?.sort((a: any, b: any) => {
              const dateA = new Date(a.timestamp) as any;
              const dateB = new Date(b.timestamp) as any;
              return dateB - dateA;
            })
            .map((message: any) => {
              return (
                <ListItem key={message._id}>
                  <MessageCard
                    name={message.name}
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
