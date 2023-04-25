import { useRouter } from "next/router";
import Card from "./Card";
import styled from "styled-components";

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

export default function UserList({ data, handleClick }: any) {
  const router = useRouter();
  if (!data) {
    router.push("/search");
  }

  return (
    <>
      <StyledList>
        {data &&
          data?.map((user: any) => {
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
