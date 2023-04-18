import Head from "next/head";
import Navbar from "./Navbar";
import styled from "styled-components";

const Main = styled.main`

`



export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <title>Boxi</title>
      </Head>
      <Navbar/>

      <Main>
        {children}
      </Main>

    </>
  )
}
