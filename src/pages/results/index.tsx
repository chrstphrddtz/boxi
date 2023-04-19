import styled from "styled-components";
import List from "../../../components/List";
import OfferView from "../../../components/OfferView";


const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`

const ListContainer = styled.div`
  position: relative;
  border: 2px solid black;
  border-radius: 10px;
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
`

const OfferContainer = styled.div`
  position: relative;
  height: 70%;
  border: 2px solid black;
  border-radius: 10px;
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