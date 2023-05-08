import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

import SearchForm from "../../components/SearchForm";

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

const H3 = styled.h3`
  text-align: center;
  font-size: 2rem;
`;

const H4 = styled.h4`
  text-align: center;
  font-size: 1.4rem;
  margin: 0.5rem auto;
  text-decoration: 2px underline;
`

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

const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px solid #0f0e0e;
  padding-top: 1rem;
  color: #e2ac55;
  background-color: #0F0E0E;
`;

const FooterParagraph = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 0.2rem auto;
  &:hover{
    text-decoration: underline;
  }
`

export default function Home() {
  const { user } = useUser();

  const router = useRouter();
  const { isReady } = router;
  const { isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function handleSearch(element: any) {
    let location = element.target.location.value;
    let startDate = element.target.date1.value;
    let endDate = element.target.date2.value;
    let minPrice = element.target.price1.value;
    let maxPrice = element.target.price2.value;

    router.push(
      `/results?location=${location}&startDate=${startDate}&endDate=${endDate}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      // `/results?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }

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
        {user ? (
          <>
            <Container>
              <H1>BOXI</H1>
            </Container>
            <Container>
              <H3>Search</H3>
              <SearchForm onSubmit={handleSearch} formName={"SearchForm"} />
            </Container>
          </>
        ) : (
          <>
            <Container>
              <H1>Welcome to BOXI ...</H1>
              <H2>...the right place to help you move your stuff!!</H2>
            </Container>
            <SignUpLink href={"/api/auth/signup"}>Signup</SignUpLink>

            <Container>
              <H2>FAQ</H2>
            </Container>
          </>
        )}
      </MainContainer>

      <Footer>
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
      </Footer>
    </>
  );
}
