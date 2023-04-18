import Head from "next/head";
import Navbar from "./Navbar";
import styled from "styled-components";

const Main = styled.main`
  display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
`



export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <title>Boxi</title>
      </Head>
      <Navbar/>

      <Main>{children}</Main>
    </>
  )
}
