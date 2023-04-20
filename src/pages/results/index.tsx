import styled from "styled-components";
import List from "../../../components/List";
import OfferView from "../../../components/OfferView";


const MainContainer = styled.div`
  gap: 2rem;
  height: 90vh; 
  display: grid;
  grid-template-columns: 2fr 3fr;
  /* @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
  } */
`

const ListContainer = styled.div`
  /* border: 2px solid black; */
  border-radius: 0.7rem;
  /* height: 100%;   */
  overflow-x: hidden;
  ::-webkit-scrollbar {
  display: none;
}
`

const OfferContainer = styled.div`
  /* height: 100%; */
  border: 2px solid black;
  border-radius: 0.9rem;
`

export default function ResultView() {

  return ( 
    <MainContainer>
      <ListContainer>
        <List/>
      </ListContainer>
      <OfferContainer>
        <OfferView/>
      </OfferContainer>
    </MainContainer>
  )
}