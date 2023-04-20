import Card from "./Card"
import styled from "styled-components"

import { useRouter } from "next/router";
import useSWR from 'swr';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`

const ListItem = styled.li`
  position: relative;
  width: 100%;
  margin: auto;
`


export default function List() {
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR('api/users', {fallbackData: []})

  if (!isReady || isLoading || error) return <h2>Loading...</h2>


  return(
    <>
      <StyledList>
        {data?.map((user:any) => {
          return (
            <ListItem key={user._id}>
              <Card
                name={user.name}
                image={user.image}
                location={user.location}
                price={user.price}
                description={user.description}
                id={user._id}
              />
            </ListItem>
          )
        })}
      </StyledList>
    </>
  )
}