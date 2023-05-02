import Head from "next/head";
import Navbar from "./Navbar";
import styled from "styled-components";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  weight: ["400", "600", "800"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const Main = styled.main`
  margin-top: 3rem;
  /* padding: 0.5rem; */
  position: relative;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Boxi</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Main className={figtree.className}>{children}</Main>
    </>
  );
}
