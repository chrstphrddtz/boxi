import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px solid #0f0e0e;
  padding-top: 1rem;
  color: #e2ac55;
  background-color: #0F0E0E;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 3rem;
`;

const FooterParagraph = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 0.2rem auto;
  &:hover{
    text-decoration: underline;
  }
`

const H4 = styled.h4`
  text-align: center;
  font-size: 1.4rem;
  margin: 0.5rem auto;
  text-decoration: 2px underline;
`

export default function Footer() {

  return (
    <StyledFooter>
        <Container>
          <H4>Learn More</H4>
          <FooterParagraph><Link href={"#"}>FAQ</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>... ...</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>... ...</Link></FooterParagraph>
        </Container>
        <Container>
          <H4>About Us</H4>
          <FooterParagraph><Link href={"#"}>... ...</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>... ...</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>Jobs</Link></FooterParagraph>
        </Container>
        <Container>
          <H4>Find Us On</H4>
          <FooterParagraph><Link href={"#"}>Instagram</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>Facebook</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>Twitter</Link></FooterParagraph>
          <FooterParagraph><Link href={"#"}>LinkedIn</Link></FooterParagraph>
        </Container>
      </StyledFooter>
  )


}