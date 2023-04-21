import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  background-color: #f3e8d7;
  color: black;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: #f3e8d7;
  color: black;
  font-size: 1rem;
`;

export default function Form({ onSubmit, formName }: any) {
  const router = useRouter();
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        // defaultValue={}
      />

      <Label htmlFor="message">Message</Label>
      <TextArea
        id="message"
        name="message"
        // cols={30}
        rows={5}
        // defaultValue={}
      ></TextArea>

      <StyledButton type="submit" onClick={() => router.push("/")}>
        Submit
      </StyledButton>
    </FormContainer>
  );
}
