import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import useSWR from "swr";

import SearchForm from "../../components/Forms/SearchForm";
import Faq from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer";

import styled from "styled-components";
import { Container } from "../../components/StyledElements/StyledContainer";
import { H1, H2, H3 } from "../../components/StyledElements/StyledHeadlines";

const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: auto 1rem;
  @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: auto;
`;

const Divider = styled.div`
  width: 90%;
  border-bottom: 2px solid var(--secondaryColor);
`;

const FaqContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin: 5rem auto;
  width: 50%;
`;

const SignUpLink = styled.a`
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  padding: 0.8rem;
  margin: 10rem auto;
  border: 2px solid var(--secondaryColor);
  border-radius: 0.5rem;
  &:hover {
    box-shadow: 0px 8px 30px -8px;
  }
  &:active {
    text-decoration: underline;
  }
`;

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { isReady } = router;

  const { isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  if (!isReady || isLoading || error)
    return (
      <LoadingScreen>
        <h2>Loading...</h2>
      </LoadingScreen>
    );

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
            <Divider />
          </>
        ) : (
          <>
            <Container>
              <H1>Welcome to BOXI ...</H1>
              <H2>...the right place to find help, to you move your stuff!!</H2>
            </Container>
            <SignUpLink href={"/api/auth/signup"}>Signup</SignUpLink>
            <Divider />
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
      <Footer />
    </>
  );
}
