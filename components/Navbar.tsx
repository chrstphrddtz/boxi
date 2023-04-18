import Link from "next/link";
import styled from "styled-components";

const Nav = styled.ul `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  border: 2px solid black;
  border-radius: 10px;
  height: 50px;
  /* margin: 5px 20px; */
  padding: 10px;
  position: fixed;
  width: 100%;
  top: 0;
`

const StyledLink = styled(Link) `
`

export default function Navbar() {
  return (
    <Nav>
      <li>
        <StyledLink href="/">Boxi</StyledLink>
      </li>
      <li>
        <StyledLink href="#">Links</StyledLink>
      </li>

    </Nav>
  )
}