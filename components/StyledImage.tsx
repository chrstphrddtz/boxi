import Image from "next/image.js";
import styled from "styled-components";

export const StyledImage = styled(Image)`
  object-fit: cover;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
