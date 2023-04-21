import styled from "styled-components";
import { useState } from "react";

const DropDownContainer = styled("div")`
  width: 6rem;
  margin: 0 auto;
  /* position: fixed;
  top: 0.5rem;
  right: 10px; */
`;

const DropDownHeader = styled("div")`
  font-size: 2rem;
  
`;

const DropDownListContainer = styled("div")`
  position: fixed;
  display: none;
  
`;

const DropDownList = styled("ul")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f3e8d7;
  padding: 0;
  margin: auto;
  &:first-child {
    padding-top: 1rem;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  padding: 0.2rem;
`;

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>Menu</DropDownHeader>
      {/* {isOpen && ( */}
        <DropDownListContainer className={isOpen ? "showing" : ""}>
          <DropDownList>
            <ListItem>Account</ListItem>
            <ListItem>My Profile</ListItem>
            <ListItem>Favourites</ListItem>
            <ListItem>Settings</ListItem>
            <ListItem>SignOut</ListItem>
          </DropDownList>
        </DropDownListContainer>
      {/* )} */}
    </DropDownContainer>
  );
}
