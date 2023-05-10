import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: inherit;
  padding: 0.3rem;
  margin: 10px auto;
  border-radius: 0.2rem;
  border: 2px solid var(--secondaryColor);
  background-color: inherit;
  color: var(--secondaryColor);
  font-weight: bold;
  font-size: 1.5rem;
  &:hover {
    text-decoration: 2px underline;
    
    /* box-shadow: 2px 5px 15px -2px; */
  };
  @media (max-width: 979px) {
    font-size: 2rem
  }
`;
