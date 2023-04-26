import Head from "next/head";
import styled from "styled-components";
import { Figtree } from "next/font/google";

import UserProfile from "../../components/UserProfile";

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
`;

const H1 = styled.h1`
  margin: 5rem;
  font-size: 3rem;
`;

const H2 = styled.h2`
  font-size: 2rem;
`;

const StyledLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export default function Home() {
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
        <H1>Welcome to BOXI ...</H1>
        <H2>
          <StyledLink href={"/search"}>Go to Search!!</StyledLink>
        </H2>

        <Container>
          <H2>Log In</H2>
          <a href={"/api/auth/signup"}>Signup</a>
          <a href={"/api/auth/login"}>Login</a>
          <a href={"/api/auth/logout"}>Logout</a>
        </Container>

        <Container>
          <UserProfile />
          {/* <H2>FAQ</H2> */}
        </Container>
      </MainContainer>
    </>
  );
}
