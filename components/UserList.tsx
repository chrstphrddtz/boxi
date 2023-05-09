import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";

const StyledList = styled.ul`
  background-color: inherit;
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

const RedirectTitle = styled.h3`
  font-size: 1rem;
  margin-top: 2rem;
`;

export default function UserList({ data, handleClick }: any) {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    if (!data || data.length === 0) {
      if (redirectSeconds === 0) {
        router.push("/");
        return;
      }
      setTimeout(() => {
        console.log(redirectSeconds);
        setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
      }, 1000);
    }
  }, [data, router, redirectSeconds]);

  if (!data || data.length === 0) {
    return (
      <RedirectTitle>
        Na matching user found ... Go back to search in {redirectSeconds}
      </RedirectTitle>
    );
  }

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
