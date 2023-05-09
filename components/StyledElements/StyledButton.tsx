import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: inherit;
  padding: 0.2rem;
  margin: 10px auto;
  border-radius: 0.2rem;
  border: 2px solid var(--secondaryColor);
  background-color: inherit;
  color: var(--secondaryColor);
  /* box-shadow: 0px 2px 10px -2px var(--secondaryColor); */
  /* text-decoration: 2px underline; */
  /* text-underline-offset: 5px; */
  font-weight: bold;
  /* border: none; */
  font-size: 1.5rem;
  &:hover {
    text-decoration: 2px underline;
    /* box-shadow: 2px 5px 15px -2px; */
  };
  @media (max-width: 979px) {
    font-size: 2rem
  }
`;
