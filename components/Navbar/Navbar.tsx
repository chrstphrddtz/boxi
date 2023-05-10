import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import Link from "next/link";
import styled from "styled-components";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  weight: ["400", "600", "800"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
  height: 50px;
  padding: 20px;
`;

const Title = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  &:hover {
    font-weight: 700;
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  cursor: pointer;
  /* @media (max-width: 844px) {
    display: none;
  } */
`;

const MenuBarDiv = styled.div`
  width: 40px;
  height: 4px;
  background-color: var(--secondaryColor);
  border-radius: 2px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 4rem;
  width: 13rem;
  row-gap: 2rem;
  right: -288px;
  padding: 24px 16px;
  transition: all 0.2s;
  min-height: calc(95vh - 4rem);
  background-color: var(--secondaryColor);
  color: var(--primaryColor);
  &:hover {
    /* background-color: var(--secondaryColor);
    color: var(--primaryColor); */
  }
  /* @media (max-width: 844px) {
    position: unset;
    flex-direction: row;
    min-height: fit-content;
    width: fit-content;
    column-gap: 24px;
    align-items: center;
  } */
`;

const NavLink = styled.a`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  position: relative;
  transition: all 0.2s;
  &:hover {
    font-weight: 700;
  }
  /* @media(max-width: 844px) {
    content: '';
    position: absolute;
    width: 0%;
    height: 6px;
    bottom: -16px;
    left: 0;
    background-color: black;
    transition: all 0.2s;
  } */
`;

export default function Navbar() {
  const [navActive, setNavActive] = useState(Boolean);
  const { user } = useUser();

  return (
    <Header className={figtree.className}>
      <Nav>
        <Title
          onClick={() => {
            setNavActive(false);
          }}
          href={"/"}
        >
          Boxi
        </Title>
        {/* <Title href={"/search"}>Search</Title> */}
        {/* Menu Icon */}
        <MenuBar onClick={() => setNavActive(!navActive)}>
          <MenuBarDiv></MenuBarDiv>
          <MenuBarDiv></MenuBarDiv>
          <MenuBarDiv></MenuBarDiv>
        </MenuBar>
        {/* ^^^ Menu Icon ^^^ */}

        <MenuList className={`${navActive ? "active" : ""} nav__menu-list`}>
          <NavLink
            onClick={() => {
              setNavActive(false);
            }}
            href={"/"}
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              onClick={() => {
                setNavActive(false);
              }}
              href={"/profile"}
            >
              Profile
            </NavLink>
          )}

          {user && (
            <NavLink
              onClick={() => {
                setNavActive(false);
              }}
              href={"/messages"}
            >
              Messages
            </NavLink>
          )}
          {user ? (
            user && (
              <NavLink
                onClick={() => {
                  setNavActive(false);
                }}
                href={"/api/auth/logout"}
              >
                Logout
              </NavLink>
            )
          ) : (
            <NavLink
              onClick={() => {
                setNavActive(false);
              }}
              href={"/api/auth/login"}
            >
              Login
            </NavLink>
          )}
        </MenuList>
      </Nav>
    </Header>
  );
}
