import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

import SearchForm from "../../components/Forms/SearchForm";
import Faq from "../../components/FAQ/FAQ";

import styled from "styled-components";

const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: auto 1rem;
  margin: auto 2rem;
  border-bottom: 2px solid var(--secondaryColor);
  @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const FaqContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin: 5rem auto;
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
`;

const SignUpLink = styled.a`
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  padding: 0.8rem;
  border: 2px solid var(--secondaryColor);
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
  padding-top: 1rem;
  color: var(--primaryColor);
  background-color: #0f0e0e;
`;

const FooterParagraph = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 0.2rem auto;
  &:hover {
    text-decoration: underline;
  }
`;

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
          </>
        )}
      </MainContainer>

      <FaqContainer>
        <H2>FAQ</H2>
        <Faq
          question="Q: What is your platform about?"
          answer="A: Our platform is designed to connect users who need help moving their things with other users who are willing to offer their services."
        />
        <Faq
          onClick
          question="Q: How does your platform work?"
          answer="A: To use our platform, simply sign up and create a listing for the items you need help moving. Other users in your area who are willing to offer their services will be able to see your listing and contact you to arrange a move."
        />
        <Faq
          question="Q: How do I find a helper?"
          answer="A: Once you've created a listing, other users in your area who are willing to offer their services will be able to see it and contact you to arrange a move."
        />
        <Faq
          question="Q: How do I know if a helper is trustworthy?"
          answer="A: We strongly recommend that you take the time to read through a helper's profile and reviews from other users before accepting their offer to help you move. You can also message with them in the app to get a better sense of who they are and how they can help you."
        />
        <Faq
          question="Q: How much does it cost to use your platform?"
          answer="A: Our platform is free to use. However, you will need to negotiate a price directly with the helper you choose to work with."
        />
        <Faq
          question="Q: What if something gets damaged during the move?"
          answer="A: While we can't guarantee that nothing will get damaged during a move, we encourage all users to take care when handling each other's items. If something does get damaged, please contact us and we'll do our best to help resolve the issue."
        />
        <Faq
          question="Q: How do I leave feedback for a helper?"
          answer="A: After your move is complete, you'll have the opportunity to leave feedback for the helper you worked with. This helps other users on our platform make informed decisions about who they want to work with."
        />
      </FaqContainer>
      <Footer>
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
      </Footer>
    </>
  );
}
