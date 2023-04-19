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
  width: 95%;
  margin: 10px 10px;
  padding: 10px;
  position: fixed;
  top: 0px;
`

const StyledLink = styled(Link) `
  font-size: 1.5rem;

`

export default function Navbar() {
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