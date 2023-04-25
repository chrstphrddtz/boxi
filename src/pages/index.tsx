import Head from 'next/head'
import styled from 'styled-components'
import { Figtree } from 'next/font/google'
import Link from 'next/link'

const figtree = Figtree({ subsets: ['latin'] })

const MainContainer = styled.div`
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

const StyledLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Boxi</title>
        <meta name="description" content="Spiced Academy graduation Project from Christoph Raddatz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
       <h1>Welcome to BOXI ...</h1>
       <h2><StyledLink href={"/search"} >Go to Search!!</StyledLink></h2>
      </MainContainer>
    </>
  )
}
