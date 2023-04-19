import Card from "../../../components/Card"
import styled from "styled-components"
import useSWR from 'swr';

import List from "../../../components/List";

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

export default function ResultView() {

  return ( 
    <List/>
  )






  // const { data } = useSWR('api/users', {fallbackData: []})
  // console.log("Data from ResultView: ", data);


  // return(
  //   <>
  //     <h1>Results</h1>
  //     <StyledList>
  //       {data?.map((user:any) => {
  //         return (
  //           <ListItem key={user._id}>
  //             <Card
  //               name={user.name}
  //               image={user.image}
  //               location={user.location}
  //               price={user.price}
  //               description={user.description}
  //               id={user._id}
  //             />
  //           </ListItem>
  //         )
  //       })}
  //     </StyledList>
  //   </>
  // )

}