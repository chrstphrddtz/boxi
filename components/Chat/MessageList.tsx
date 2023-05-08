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
  /* min-width: 15rem; */
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
          filteredMessages?.map((message: any) => {
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
