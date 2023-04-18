import Card from "../../../components/Card"
import styled from "styled-components"

import useSWR from 'swr';

const List = styled.ul`
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
`

export default function ResultView() {
  const { data } = useSWR('..api/users')
  console.log("Data from ResultView: ", data);
  

  return(
    <>
      <h1>Results</h1>
      <List>
        <ListItem>
          <Card />
        </ListItem>

      </List>
    </>
  )

}