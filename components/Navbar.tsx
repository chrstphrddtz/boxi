import DropDown from "./Dropdown";
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
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  border-bottom: 2px solid black;
  background-color: #0F0E0E;
  color: #e2ac55;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
`;

export default function Navbar() {
  return (
    <Nav className={figtree.className}>
      <li>
        <Title href="/">Boxi</Title>
      </li>
      <li>
        <DropDown/>
        {/* <StyledLink href="#">Links</StyledLink> */}
      </li>
    </Nav>
  );
}
