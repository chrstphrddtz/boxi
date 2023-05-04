import styled from "styled-components";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  margin-top: 3rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3rem;
`;

const EmptyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 5rem;
`;

export default function MessageDisplay({ message }: any) {

  console.log("messages from MessageDisplay", message);
  
  return <></>;
}
