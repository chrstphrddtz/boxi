import styled from "styled-components";

const Container = styled.div`
  

`

export default function OfferView({user}: any) {
  // var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search
  // console.log("data from Offerview: ", user);

  


  return (
    <Container>
      {user.name}
      {user.price}
    </Container>
  )

}