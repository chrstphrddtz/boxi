import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";

import styled from "styled-components";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

const MainContainer = styled.article`
  height: 95vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 0.5rem;
  /* grid-template-columns: 2fr 3fr; */
  @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 3rem;
`;

const H1 = styled.h1`
  margin-top: 5rem;
  margin-bottom: 0;
  font-size: 3rem;
  letter-spacing: 0.1rem;
`;

const H2 = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  font-style: italic;
`;

const SignUpLink = styled.a`
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  padding: 0.8rem;
  border: 2px solid #0f0e0e;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 10px -2px;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  }
  &:active {
    text-decoration: underline;
    /* box-shadow: 0px 8px 30px -8px */
  }
`;

const StyledLink = styled.a`
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer``;

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Boxi</title>
        <meta
          name="description"
          content="Spiced Academy graduation Project from Christoph Raddatz"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Container>
          <H1>Welcome to BOXI ...</H1>
          <H2>...the right place to help you move your stuff!!</H2>
        </Container>

        <Container>
          {user ? (
            <StyledLink href={"/search"}>Go to Search!!</StyledLink>
          ) : (
            <SignUpLink href={"/api/auth/signup"}>Signup</SignUpLink>
          )}
        </Container>

        <Container></Container>

        <Container>
          <H2>FAQ</H2>
        </Container>
      </MainContainer>

      <Footer>
        <h2>Footer</h2>
        <h2>Footer</h2>
        <h2>Footer</h2>
        <h2>Footer</h2>
      </Footer>
    </>
  );
}
