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
  if (!data || data.length === 0) {
    router.push("/search");
  }

  console.log(data);

  return (
    <>
      <StyledList>
        {data &&
          data
            ?.sort((a: any, b: any) => {
              const dateA = new Date(a.availability.start) as any;
              const dateB = new Date(b.availability.start) as any;
              return dateB - dateA;
            })
            .map((user: any) => {
              return (
                <ListItem key={user._id}>
                  <Card
                    name={user.firstName}
                    image={user.image}
                    location={user.location}
                    price={user.price}
                    description={user.description}
                    id={user._id}
                    availability={user.availability}
                    handleClick={handleClick}
                  />
                </ListItem>
              );
            })}
      </StyledList>
    </>
  );
}
