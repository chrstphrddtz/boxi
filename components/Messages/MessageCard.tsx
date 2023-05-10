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
  return (
    <Article onClick={() => handleClick(id)}>
      <UserName>{name}</UserName>
    </Article>
  );
}
