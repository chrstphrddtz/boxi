import styled from "styled-components";

const Article = styled.article`
  background-color: #f3e8d7;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 2.5rem;
  align-items: end;
  justify-items: end;
  padding: 5px;
  &:hover {
    /* background-color: rgba(226, 172, 85, 80%); */
    background-color: #0f0e0e;
    color: #e2ac55;
  }
`;

const UserName = styled.p`
  font-size: 1.5rem;
  margin: 0.1rem 0;
  font-weight: 600;
`;

const DateTime = styled.p`
  font-size: 0.9rem;
  margin: 0.1rem 0;
  font-style: italic;
`;

export default function MessageCard({
  name,
  date,
  time,
  id,
  handleClick,
}: any) {
  return (
    <Article onClick={() => handleClick(id)}>
      <UserName>{name}</UserName>
      <DateTime>
        {date} - {time}
      </DateTime>
    </Article>
  );
}
