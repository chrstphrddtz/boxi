import Link from "next/link";
import styled from "styled-components";
import { Figtree } from 'next/font/google'

const figtree = Figtree({ 
  weight: ['400', '600', '800'],
  style: ['italic', 'normal'],
  subsets: ['latin'] 
})


const Nav = styled.ul`
  position: fixed;
  top: 0px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  border-bottom: 2px solid black;
  background-color: #e2ac55;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  font-size: 2rem;
`;

export default function Navbar() {
  return (
    <Nav className={figtree.className}>
      <li>
        <StyledLink href="/">Boxi</StyledLink>
      </li>
      <li>
        <StyledLink href="#">Links</StyledLink>
      </li>
    </Nav>
  );
}
