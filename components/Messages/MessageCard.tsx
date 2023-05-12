import { useRouter } from "next/router";
import useWindowSize, { Size } from "../../lib/Hooks/useMediaQuery";

import styled from "styled-components";

const Article = styled.article`
  /* background-color: #f3e8d7; */
  display: flex;
  /* grid-template-columns: 2fr 3fr; */
  gap: 2.5rem;
  align-items: end;
  justify-items: end;
  padding: 5px;
  &:hover {
    background-color: var(--secondaryColor);
    color: var(--primaryColor);
  }
`;

const UserName = styled.p`
  font-size: 1.5rem;
  margin: 0.1rem 0;
  font-weight: 600;
`;

// const DateTime = styled.p`
//   font-size: 0.9rem;
//   margin: 0.1rem 0;
//   font-style: italic;
// `;

export default function MessageCard({ name, id, handleClick }: any) {
  const router = useRouter();
  const { push } = router;
  const size: Size = useWindowSize();

  function returnBigScreen() {
    return (
      <Article onClick={() => handleClick(id)}>
        <UserName>{name}</UserName>
      </Article>
    );
  }

  function returnSmallScreen() {
    return (
      <Article onClick={() => {
        handleClick(id);
        push(`messages/${id}`)
        }}>
        <UserName>{name}</UserName>
      </Article>
    )
  }

  return (
    <>
      {size.width && size.width > 979 && returnBigScreen()}
      {size.width && size.width <= 979 && returnSmallScreen()}
    </>
  );
}
