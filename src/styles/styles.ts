import { createGlobalStyle } from "styled-components";
// import { Figtree } from "next/font/google";

// const figtree = Figtree({ subsets: ["latin"] });

const GlobalStyle = createGlobalStyle`
  :root {
    /* --max-width: 1100px; */
    --border-radius: 12px;
    --primaryColor: rgb(173, 182, 129);
    --secondaryColor: rgb(28, 30, 19);
    --accentColor: rgb(226, 172, 85)
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    width: auto;
  }

  body, 
  textarea, 
  input {
    background-color: var(--primaryColor);
    color: var(--secondaryColor);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  .showing {
    display: block !important;
  }

  /* For Navbar */

  .nav__menu-list.active{
    right: 0;
  }

  /* .center{
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

`;

export default GlobalStyle;
