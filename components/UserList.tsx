import Card from "./Card";
import styled from "styled-components";

const StyledList = styled.ul`
  /* background-color: #E2AC55; */
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  margin: auto;
`;

export default function UserList({ data, handleClick }: any) {
  return (
    <>
      <StyledList>
        {data?.map((user: any) => {
          return (
            <ListItem key={user._id}>
              <Card
                name={user.firstName}
                image={user.image}
                location={user.location}
                price={user.price}
                description={user.description}
                id={user._id}
                handleClick={handleClick}
              />
            </ListItem>
          );
        })}
      </StyledList>
    </>
  );
}
