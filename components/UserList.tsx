import Card from "./Card";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
                name={user.name}
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
