import { createGlobalStyle } from "styled-components";
// import { Figtree } from "next/font/google";

// const figtree = Figtree({ subsets: ["latin"] });

export default createGlobalStyle`
  :root {
  /* --max-width: 1100px; */
  --border-radius: 12px;
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
  /* height: 100%; */
  width: auto;
  /* overflow: hidden; */
}

body, 
textarea, 
input {
  background-color: #e2ac55;
  color: #0F0E0E;
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
