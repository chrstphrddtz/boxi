import styled from "styled-components";
import Link from "next/link";

import { Container } from "./StyledElements/StyledContainer";
import { H4 } from "./StyledElements/StyledHeadlines";

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 1rem;
  color: var(--primaryColor);
  background-color: var(--secondaryColor);
`;

const FooterParagraph = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 0.2rem auto;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        <H4>Learn More</H4>
        <FooterParagraph>
          <Link href={"#"}>FAQ</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>... ...</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>... ...</Link>
        </FooterParagraph>
      </Container>
      <Container>
        <H4>About Us</H4>
        <FooterParagraph>
          <Link href={"#"}>... ...</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>... ...</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>Jobs</Link>
        </FooterParagraph>
      </Container>
      <Container>
        <H4>Find Us On</H4>
        <FooterParagraph>
          <Link href={"#"}>Instagram</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>Facebook</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>Twitter</Link>
        </FooterParagraph>
        <FooterParagraph>
          <Link href={"#"}>LinkedIn</Link>
        </FooterParagraph>
      </Container>
    </StyledFooter>
  );
}
